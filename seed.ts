import { products } from './src/data';
import { createClient } from '@sanity/client';

const token = process.argv[2] || process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error('\x1b[31mError: Please provide a Sanity write token as an argument or set SANITY_WRITE_TOKEN in your environment.\x1b[0m');
  console.error('Usage: npx tsx seed.ts <SANITY_WRITE_TOKEN>');
  process.exit(1);
}

const client = createClient({
  projectId: 'cz2qth44',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-07-12',
  token: token,
});

async function uploadImageFromUrl(url: string, productName: string) {
  try {
    console.log(`Downloading image for ${productName}: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download image. Status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log(`Uploading image for ${productName} to Sanity...`);
    const asset = await client.assets.upload('image', buffer, {
      filename: `${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`,
    });
    console.log(`Successfully uploaded image asset: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`Error uploading image for ${productName}:`, error);
    return null;
  }
}

async function seed() {
  console.log(`Starting migration of ${products.length} products to Sanity...`);
  
  for (const product of products) {
    console.log(`\n--------------------------------------------`);
    console.log(`Processing product: ${product.name}`);
    
    let imageAssetRef = null;
    if (product.images && product.images.length > 0) {
      const assetId = await uploadImageFromUrl(product.images[0], product.name);
      if (assetId) {
        imageAssetRef = {
          _type: 'reference',
          _ref: assetId,
        };
      }
    }
    
    const doc = {
      _type: 'product',
      _id: product.id, // Preserve hardcoded ID to maintain local bestseller list and references
      name: product.name,
      price: product.price,
      description: product.description || product.shortDescription,
      category: product.category.toLowerCase(),
      sizes: product.sizes || [],
      colors: (product.colors || []).map(c => ({
        _key: c.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        label: c.label,
        hex: c.hex
      })),
      stock: product.stock !== undefined ? product.stock : (product.id === 'hb-3' ? 0 : 12),
      ...(imageAssetRef ? { image: { _type: 'image', asset: imageAssetRef } } : {}),
    };
    
    try {
      console.log(`Creating/replacing Sanity document for ${product.name}...`);
      await client.createOrReplace(doc);
      console.log(`Successfully migrated ${product.name} (ID: ${product.id})`);
    } catch (err) {
      console.error(`Failed to migrate product ${product.name}:`, err);
    }
  }
  
  console.log(`\n--------------------------------------------`);
  console.log('\x1b[32mSeeding completed successfully!\x1b[0m');
}

seed();
