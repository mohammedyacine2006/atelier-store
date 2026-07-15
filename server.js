import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'url';

dotenv.config();

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Sanity client for writing inventory updates
const sanityClient = createClient({
  projectId: 'cz2qth44',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2026-07-12',
});

const app = express();
const PORT = process.env.PORT || 4242;

// Enable CORS for frontend development server
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Stripe Webhook Endpoint (Must be defined BEFORE express.json() for raw body access)
app.post(['/webhook', '/api/webhook'], express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      try {
        // Retrieve line items with expanded product details to read metadata
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price.product'],
        });

        console.log(`[Webhook] Processing completed session ${session.id} with ${lineItems.data.length} items.`);

        for (const item of lineItems.data) {
          const product = item.price?.product;
          if (product && typeof product === 'object') {
            const productId = product.metadata?.productId;
            const quantityPurchased = parseInt(product.metadata?.quantity || item.quantity.toString(), 10);

            if (productId && !isNaN(quantityPurchased)) {
              console.log(`[Webhook] Decrementing stock for Sanity product ${productId} by ${quantityPurchased} units.`);

              // Dec stock level in Sanity Studio
              await sanityClient
                .patch(productId)
                .dec({ stock: quantityPurchased })
                .commit();

              console.log(`[Webhook] Successfully updated stock for product ${productId}.`);
            } else {
              console.warn('[Webhook] Product ID or valid quantity not found in line item metadata.', product.metadata);
            }
          } else {
            console.warn('[Webhook] Product object not expanded or is invalid in line item.', item.price);
          }
        }
      } catch (error) {
        console.error(`[Webhook] Error decrementing stock for session ${session.id}:`, error);
        // We still return 200 to Stripe to avoid retrying already processed sessions if Sanity is down
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
});

app.use(express.json());

// Endpoint to create a checkout session
app.post(['/create-checkout-session', '/api/create-checkout-session'], async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid.' });
    }

    // Map cart items to Stripe's line_items format
    const line_items = cart.map((item) => {
      // Stripe expects integer unit_amount in cents (e.g. $10.00 -> 1000)
      const unitAmountInCents = Math.round(item.price * 100);

      const productData = {
        name: item.name,
        description: `Color: ${item.chosenColor?.label || 'Standard'}, Size: ${item.chosenSize || 'Standard'}`,
        metadata: {
          productId: item.id,
          quantity: item.quantity.toString(),
        },
      };

      // Add product image if it starts with http/https
      if (item.image && (item.image.startsWith('http://') || item.image.startsWith('https://'))) {
        productData.images = [item.image];
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: unitAmountInCents,
        },
        quantity: item.quantity,
      };
    });

    // Create the session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'FR', 'DE', 'IT', 'ES', 'NL', 'SE'],
      },
      success_url: `${req.get('origin') || (req.get('referer') ? new URL(req.get('referer')).origin : 'http://localhost:3000')}/?page=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.get('origin') || (req.get('referer') ? new URL(req.get('referer')).origin : 'http://localhost:3000')}/?page=cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to retrieve session details for success page presentation
app.get(['/checkout-session/:sessionId', '/api/checkout-session/:sessionId'], async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Reconstruct customer name parts
    const fullName = session.customer_details?.name || 'Valued Customer';
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || 'Valued';
    const lastName = nameParts.slice(1).join(' ') || 'Customer';

    // Build shipping coordinates
    const addressObj = session.customer_details?.address;
    const streetAddress = addressObj?.line1 || 'Secure Stripe Address';
    const city = addressObj?.city || 'City';
    const zipCode = addressObj?.postal_code || 'Zip';

    // Format final order total
    const totalAmount = (session.amount_total || 0) / 100;

    res.json({
      email: session.customer_details?.email || '',
      firstName,
      lastName,
      address: streetAddress,
      city,
      zipCode,
      receiptId: 'ATL-' + session.id.slice(-8).toUpperCase(),
      total: totalAmount
    });
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Conditionally run app.listen() only for local development
const isMain = process.argv[1] && (
  fileURLToPath(import.meta.url) === process.argv[1] ||
  process.argv[1].endsWith('server.js')
);

if (isMain && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

export default app;