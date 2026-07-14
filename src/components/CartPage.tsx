import { useState, ChangeEvent, FormEvent } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ShieldCheck, ArrowLeft, CreditCard, Mail, User, MapPin } from 'lucide-react';
import { CartItem, OrderDetails, PageType } from '../types';

interface CartPageProps {
  cart: CartItem[];
  updateCartQuantity: (id: string, chosenColorLabel: string, chosenSize: string, change: number) => void;
  removeFromCart: (id: string, chosenColorLabel: string, chosenSize: string) => void;
  setCurrentPage: (page: PageType) => void;
  setOrderDetails: (order: OrderDetails) => void;
  clearCart: () => void;
}

export default function CartPage({
  cart,
  updateCartQuantity,
  removeFromCart,
  setCurrentPage,
  setOrderDetails,
  clearCart,
}: CartPageProps) {
  const [step, setStep] = useState<'bag' | 'checkout'>('bag');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleStripeCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutError(null);
    try {
      // Store current cart items locally so we can restore exact custom options (images/color/size) on the success page
      localStorage.setItem('atelier_pending_order_items', JSON.stringify(cart));

      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to initiate secure checkout session.');
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Invalid response from Stripe session creator.');
      }
    } catch (err: any) {
      console.error('Stripe redirect error:', err);
      setCheckoutError(err.message || 'Unable to connect to Stripe Checkout server.');
      setIsCheckingOut(false);
    }
  };

  // Form Fields
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 0; // Complimentary
  const salesTaxRate = 0.0825; // 8.25%
  const tax = Math.round(subtotal * salesTaxRate);
  const total = subtotal + shippingCost + tax;

  const handleValidation = () => {
    const newErrors: Record<string, string> = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email is required.';
    }
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }
    if (!address.trim()) {
      newErrors.address = 'Street address is required.';
    }
    if (!city.trim()) {
      newErrors.city = 'City is required.';
    }
    if (!zipCode.trim() || zipCode.length < 5) {
      newErrors.zipCode = 'Valid ZIP code is required.';
    }
    if (!cardName.trim()) {
      newErrors.cardName = 'Name on card is required.';
    }
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Provide 16-digit card number.';
    }
    if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      newErrors.cardExpiry = 'Provide MM/YY format.';
    }
    if (!cardCvc || cardCvc.length < 3) {
      newErrors.cardCvc = 'Valid CVC is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

    // Build order receipt details
    const receiptId = 'ATL-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const details: OrderDetails = {
      email,
      firstName,
      lastName,
      address,
      city,
      zipCode,
      cardNumber: `•••• •••• •••• ${cardNumber.slice(-4)}`,
      receiptId,
      total,
      items: [...cart],
    };

    setOrderDetails(details);
    clearCart();
    setCurrentPage('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Card Number Auto-Spacer
  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    const truncated = val.slice(0, 16);
    const matches = truncated.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(truncated);
    }
    if (errors.cardNumber) {
      setErrors((prev) => ({ ...prev, cardNumber: '' }));
    }
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length > 2) {
      setCardExpiry(`${val.slice(0, 2)}/${val.slice(2)}`);
    } else {
      setCardExpiry(val);
    }
    if (errors.cardExpiry) {
      setErrors((prev) => ({ ...prev, cardExpiry: '' }));
    }
  };

  if (cart.length === 0) {
    return (
      <div id="cart-empty-view" className="bg-[#F9F6F0] min-h-[70vh] flex flex-col items-center justify-center py-24 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-[#E5D9C8]/15 flex items-center justify-center mx-auto">
            <Trash2 size={24} className="text-stone-400" />
          </div>
          <h2 className="font-serif text-3xl text-[#1C1C1C] tracking-wide font-light">Your bag is empty</h2>
          <p className="font-sans text-xs sm:text-sm text-stone-500 tracking-wider leading-relaxed">
            There are currently no items in your luxury atelier bag. Discover our seasonal collections and curate your wardrobe.
          </p>
          <button
            id="empty-cart-return"
            onClick={() => setCurrentPage('catalog')}
            className="inline-block px-8 py-4 bg-[#1C1C1C] text-[#F9F6F0] font-sans text-xs uppercase tracking-[0.25em] font-semibold rounded-full hover:shadow-lg transition-all"
          >
            Browse Collection
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="cart-page-container" className="bg-[#F9F6F0] min-h-screen py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          id="continue-shopping-btn"
          onClick={() => setCurrentPage('catalog')}
          className="text-sm text-gray-500 hover:text-black transition-colors mb-8 flex items-center gap-2 cursor-pointer w-fit uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          <span>Continue Shopping</span>
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] tracking-tight font-light mb-12">
          Your Atelier <span className="italic">Bag</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: List or Form Checkout Wizard (cols 1-7) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 'bag' ? (
                
                /* STEP 1: Shopping Bag Items List */
                <motion.div
                  id="cart-bag-step"
                  key="bag"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    {cart.map((item) => {
                      const productTotalInCart = cart
                        .filter((cItem) => cItem.id === item.id)
                        .reduce((acc, cItem) => acc + cItem.quantity, 0);
                      const isMaxStockReached = item.stock !== undefined && productTotalInCart >= item.stock;

                      return (
                        <div
                          id={`cart-item-${item.id}-${item.chosenColor.label.toLowerCase()}`}
                          key={`${item.id}-${item.chosenColor.label}-${item.chosenSize}`}
                          className="flex items-center space-x-6 border-b border-[#E5D9C8]/40 pb-6"
                        >
                          {/* Thumbnail */}
                          <div className="w-20 sm:w-24 aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200/40">
                            <img src={item.cartImage || item.image} alt={item.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="font-serif text-base sm:text-lg text-[#1C1C1C] tracking-wide leading-tight truncate">
                                {item.name}
                              </h3>
                              <span className="font-mono text-xs sm:text-sm text-[#1C1C1C] font-semibold tracking-wider">
                                ${(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>

                            {/* Attributes badge */}
                            <p className="text-[10px] sm:text-xs text-[#1C1C1C]/50 uppercase tracking-widest leading-none">
                              Color: <span className="text-[#1C1C1C] font-medium">{(item.selectedColor || item.chosenColor).label}</span> • Size: <span className="text-[#1C1C1C] font-medium">{item.chosenSize}</span>
                            </p>

                            {/* Control row */}
                            <div className="flex items-center justify-between pt-2">
                              {/* Quantity buttons */}
                              <div className="flex items-center space-x-3 border border-[#E5D9C8] rounded-lg p-1">
                                <button
                                  id={`dec-${item.id}`}
                                  onClick={() => updateCartQuantity(item.id, item.chosenColor.label, item.chosenSize, -1)}
                                  className="px-1.5 text-stone-500 hover:text-stone-800 focus:outline-none"
                                >
                                  -
                                </button>
                                <span className="font-mono text-xs text-[#1C1C1C] font-medium w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  id={`inc-${item.id}`}
                                  onClick={() => updateCartQuantity(item.id, item.chosenColor.label, item.chosenSize, 1)}
                                  className="px-1.5 text-stone-500 hover:text-stone-800 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                                  disabled={isMaxStockReached}
                                >
                                  +
                                </button>
                              </div>

                              {/* Trash action */}
                              <button
                                id={`remove-${item.id}`}
                                onClick={() => removeFromCart(item.id, item.chosenColor.label, item.chosenSize)}
                                className="text-stone-400 hover:text-red-500 p-2 transition-colors focus:outline-none"
                                title="Remove item"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Move to Checkout Button */}
                  <div className="pt-4">
                    <button
                      id="proceed-checkout-btn"
                      onClick={handleStripeCheckout}
                      disabled={isCheckingOut}
                      className="w-full group relative px-8 py-4 bg-[#1C1C1C] text-[#F9F6F0] font-sans text-xs uppercase tracking-[0.25em] font-semibold overflow-hidden rounded-full shadow-md hover:shadow-xl transition-all flex items-center justify-center space-x-3 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCheckingOut ? (
                        <span>Redirecting to Stripe...</span>
                      ) : (
                        <span>Proceed to Secure Checkout</span>
                      )}
                    </button>
                    {checkoutError && (
                      <p className="text-red-500 text-xs text-center mt-3 tracking-wider font-light">
                        {checkoutError}
                      </p>
                    )}
                  </div>
                </motion.div>
              ) : (
                
                /* STEP 2: Checkout Billing / Shipping Form */
                <motion.form
                  id="checkout-form"
                  key="checkout"
                  onSubmit={handlePlaceOrder}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Step Back Control */}
                  <button
                    id="checkout-back-btn"
                    type="button"
                    onClick={() => setStep('bag')}
                    className="flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.2em] text-[#1C1C1C]/70 hover:text-[#1C1C1C] transition-colors focus:outline-none"
                  >
                    <ArrowLeft size={12} />
                    <span>Return to Shopping Bag</span>
                  </button>

                  {/* Section 1: Customer Info */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-stone-500 text-xs uppercase tracking-widest font-semibold pb-2 border-b border-[#E5D9C8]/30">
                      <Mail size={14} />
                      <span>01. Customer Information</span>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="checkout-email" className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">Email Address</label>
                      <input
                        id="checkout-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder="e.g. name@domain.com"
                        className="w-full text-xs font-sans bg-transparent border border-[#E5D9C8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Section 2: Shipping Address */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-stone-500 text-xs uppercase tracking-widest font-semibold pb-2 border-b border-[#E5D9C8]/30">
                      <MapPin size={14} />
                      <span>02. Delivery Address</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="checkout-firstname" className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">First Name</label>
                        <input
                          id="checkout-firstname"
                          type="text"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: '' }));
                          }}
                          className="w-full text-xs font-sans bg-transparent border border-[#E5D9C8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                        />
                        {errors.firstName && <p className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.firstName}</p>}
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="checkout-lastname" className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">Last Name</label>
                        <input
                          id="checkout-lastname"
                          type="text"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: '' }));
                          }}
                          className="w-full text-xs font-sans bg-transparent border border-[#E5D9C8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                        />
                        {errors.lastName && <p className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="checkout-address" className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">Street Address</label>
                      <input
                        id="checkout-address"
                        type="text"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          if (errors.address) setErrors((prev) => ({ ...prev, address: '' }));
                        }}
                        className="w-full text-xs font-sans bg-transparent border border-[#E5D9C8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                      />
                      {errors.address && <p className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="checkout-city" className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">City</label>
                        <input
                          id="checkout-city"
                          type="text"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                          }}
                          className="w-full text-xs font-sans bg-transparent border border-[#E5D9C8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                        />
                        {errors.city && <p className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.city}</p>}
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="checkout-zip" className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">ZIP / Postal Code</label>
                        <input
                          id="checkout-zip"
                          type="text"
                          value={zipCode}
                          onChange={(e) => {
                            setZipCode(e.target.value);
                            if (errors.zipCode) setErrors((prev) => ({ ...prev, zipCode: '' }));
                          }}
                          className="w-full text-xs font-sans bg-transparent border border-[#E5D9C8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                        />
                        {errors.zipCode && <p className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Secured Payment Sandbox */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-stone-500 text-xs uppercase tracking-widest font-semibold pb-2 border-b border-[#E5D9C8]/30">
                      <CreditCard size={14} />
                      <span>03. Insured Payment Sandbox</span>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="checkout-cardname" className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">Name on Card</label>
                      <input
                        id="checkout-cardname"
                        type="text"
                        value={cardName}
                        onChange={(e) => {
                          setCardName(e.target.value);
                          if (errors.cardName) setErrors((prev) => ({ ...prev, cardName: '' }));
                        }}
                        className="w-full text-xs font-sans bg-transparent border border-[#E5D9C8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                      />
                      {errors.cardName && <p className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.cardName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="checkout-cardnumber" className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">Card Number (16 Digits)</label>
                      <input
                        id="checkout-cardnumber"
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000"
                        className="w-full text-xs font-sans bg-transparent border border-[#E5D9C8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="checkout-expiry" className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">Expiry Date</label>
                        <input
                          id="checkout-expiry"
                          type="text"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="w-full text-xs font-sans bg-transparent border border-[#E5D9C8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors text-center"
                        />
                        {errors.cardExpiry && <p className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.cardExpiry}</p>}
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="checkout-cvc" className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">CVC / CVV</label>
                        <input
                          id="checkout-cvc"
                          type="password"
                          value={cardCvc}
                          onChange={(e) => {
                            setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4));
                            if (errors.cardCvc) setErrors((prev) => ({ ...prev, cardCvc: '' }));
                          }}
                          placeholder="•••"
                          className="w-full text-xs font-sans bg-transparent border border-[#E5D9C8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors text-center"
                        />
                        {errors.cardCvc && <p className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Primary Place Order Button */}
                  <div className="pt-4">
                    <button
                      id="place-order-btn"
                      type="submit"
                      className="w-full group relative px-8 py-4 bg-[#1C1C1C] text-[#F9F6F0] font-sans text-xs uppercase tracking-[0.25em] font-semibold overflow-hidden rounded-full shadow-md hover:shadow-xl transition-all flex items-center justify-center space-x-3 focus:outline-none"
                    >
                      <span>Complete Order • ${total.toLocaleString()}</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Sticky Order Summary (cols 8-12) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 bg-[#E5D9C8]/15 rounded-[2rem] p-8 border border-[#E5D9C8]/30 space-y-6">
            <h2 className="font-serif text-xl text-[#1C1C1C] tracking-wide font-light pb-4 border-b border-[#E5D9C8]/30">
              Order Summary
            </h2>

            {/* Price breakdown lists */}
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between text-[#1C1C1C]/75">
                <span>Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                <span className="font-mono">${subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-[#1C1C1C]/75">
                <span>Estimated Shipping</span>
                <span className="uppercase text-[#C5B3A6] font-medium tracking-wider">Complimentary</span>
              </div>

              <div className="flex justify-between text-[#1C1C1C]/75">
                <span>VAT / Sales Tax (8.25%)</span>
                <span className="font-mono">${tax.toLocaleString()}</span>
              </div>

              <div className="w-full h-[1px] bg-[#E5D9C8]/30 pt-2"></div>

              <div className="flex justify-between text-sm text-[#1C1C1C] font-semibold pt-2">
                <span>Grand Total</span>
                <span className="font-mono text-base">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Quiet Luxury Guarantees */}
            <div className="bg-[#F9F6F0]/80 rounded-2xl p-4 border border-stone-200/40 space-y-3">
              <div className="flex items-start space-x-3 text-stone-600">
                <ShieldCheck size={16} className="mt-0.5 text-stone-500" />
                <div className="space-y-0.5">
                  <span className="font-sans text-[10px] uppercase tracking-wider font-semibold block text-[#1C1C1C]">Insured Delivery Guarantee</span>
                  <span className="font-sans text-[10px] leading-relaxed block text-stone-400">All Atelier packages are shipped fully insured via premier global couriers. Signature is strictly required upon receipt.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
