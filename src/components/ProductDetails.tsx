import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Product, ColorOption, PageType } from '../types';

interface ProductDetailsProps {
  product: Product;
  setCurrentPage: (page: PageType) => void;
  addToCart: (product: Product, quantity: number, color: ColorOption, size: string, image?: string) => void;
  setNotification: (msg: string | null) => void;
}

export default function ProductDetails({
  product,
  setCurrentPage,
  addToCart,
  setNotification,
}: ProductDetailsProps) {
  const stock = product.stock !== undefined ? product.stock : 10;
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(stock > 0 ? 1 : 0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  useEffect(() => {
    setQuantity(stock > 0 ? 1 : 0);
  }, [product, stock]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize, product.images[activeImageIdx]);
    
    // Trigger notification
    const detailMsg = `${quantity}x ${product.name} (${selectedColor.label}, Size ${selectedSize}) added to your bag.`;
    setNotification(detailMsg);
    setTimeout(() => setNotification(null), 4000);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div id="pdp-container" className="bg-[#F9F6F0] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation button */}
        <button
          id="pdp-back-btn"
          onClick={() => setCurrentPage('catalog')}
          className="flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.25em] text-[#1C1C1C]/70 hover:text-[#1C1C1C] mb-12 group transition-colors focus:outline-none"
        >
          <ArrowLeft size={14} className="transform translate-x-0 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Collection</span>
        </button>

        {/* Primary Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Image Gallery (cols 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Picture Frame */}
            <div id="pdp-main-image-frame" className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-stone-100 shadow-sm border border-[#E5D9C8]/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIdx}
                  src={product.images[activeImageIdx]}
                  alt={`${product.name} view ${activeImageIdx + 1}`}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails list */}
            <div id="pdp-thumbnails" className="flex items-center gap-3 overflow-x-auto py-2">
              {product.images.map((img, idx) => (
                <button
                  id={`pdp-thumb-${idx}`}
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-20 sm:w-24 aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 transition-all border-2 focus:outline-none ${
                    idx === activeImageIdx ? 'border-[#1C1C1C]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Buying controls & details (cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-8">
            
            {/* Header / Title / Price */}
            <div className="space-y-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C5B3A6] font-semibold block">
                Atelier Collection • {product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] tracking-wide font-light leading-tight">
                {product.name}
              </h1>
              <span className="font-mono text-xl text-[#1C1C1C] font-semibold tracking-wider block">
                ${product.price.toLocaleString()}
              </span>
              <div className="w-full h-[1px] bg-[#E5D9C8]/40 pt-2"></div>
            </div>

            {/* Brand story snippet */}
            <p className="font-sans text-xs sm:text-sm text-[#1C1C1C]/75 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Buying Options */}
            <div className="space-y-6">
              
              {/* Color Swatches */}
              <div id="pdp-color-selector">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold block mb-3">
                  Color: <span className="text-[#1C1C1C]">{selectedColor.label}</span>
                </span>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color) => (
                    <button
                      id={`color-swatch-${color.label.replace(/\s+/g, '-').toLowerCase()}`}
                      key={color.label}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        selectedColor.label === color.label
                          ? 'border-[#1C1C1C] scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      title={color.label}
                    >
                      <span
                        style={{ backgroundColor: color.hex }}
                        className="w-6 h-6 rounded-full shadow-inner ring-1 ring-stone-900/15"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div id="pdp-size-selector">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold block mb-3">
                  Size: <span className="text-[#1C1C1C]">{selectedSize}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      id={`size-btn-${size.toLowerCase()}`}
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`font-sans text-xs uppercase tracking-widest px-5 py-3 border rounded-xl transition-all focus:outline-none min-w-[50px] ${
                        selectedSize === size
                          ? 'bg-[#1C1C1C] text-[#F9F6F0] border-[#1C1C1C] font-semibold'
                          : 'border-[#E5D9C8] text-[#1C1C1C]/80 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div id="pdp-quantity-selector">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold block mb-3">
                  Quantity
                </span>
                <div className="flex items-center space-x-4 border border-[#E5D9C8] w-fit rounded-xl p-1 bg-[#F9F6F0]">
                  <button
                    id="qty-decrement"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-stone-500 hover:text-[#1C1C1C] transition-colors focus:outline-none"
                    disabled={quantity <= 1 || stock === 0}
                  >
                    -
                  </button>
                  <span id="qty-value" className="font-mono text-xs font-semibold text-[#1C1C1C] w-8 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    id="qty-increment"
                    onClick={() => setQuantity(prev => Math.min(stock, prev + 1))}
                    className="p-2 text-stone-500 hover:text-[#1C1C1C] transition-colors focus:outline-none"
                    disabled={quantity >= stock || stock === 0}
                  >
                    +
                  </button>
                </div>

                {/* Stock status indicator */}
                {stock === 0 ? (
                  <p className="font-sans text-xs text-rose-600 font-medium tracking-wide mt-2">
                    Out of stock. We are currently crafting more pieces.
                  </p>
                ) : stock < 5 ? (
                  <p className="font-sans text-xs text-rose-600 font-bold tracking-wide mt-2">
                    Only {stock} {stock === 1 ? 'piece' : 'pieces'} left!
                  </p>
                ) : (
                  <p className="font-sans text-xs text-stone-500 font-light tracking-wide mt-2">
                    Available: {stock} pieces
                  </p>
                )}
              </div>

            </div>

            {/* Bag Button */}
            <div className="pt-4">
              <button
                id="add-to-bag-btn"
                onClick={handleAddToCart}
                disabled={stock === 0}
                className={`w-full group relative px-8 py-4 font-sans text-xs uppercase tracking-[0.25em] font-semibold overflow-hidden rounded-full shadow-md transition-all flex items-center justify-center space-x-3 focus:outline-none ${
                  stock === 0
                    ? 'bg-stone-300 text-stone-500 border border-stone-300 cursor-not-allowed shadow-none'
                    : 'bg-[#1C1C1C] text-[#F9F6F0] hover:shadow-xl'
                }`}
              >
                <ShoppingBag size={16} />
                <span>{stock === 0 ? 'Out of Stock' : 'Add to Bag'}</span>
              </button>
            </div>

            {/* Accordion Menus (Framer Motion) */}
            <div id="pdp-accordions" className="border-t border-[#E5D9C8]/50 pt-6 space-y-4">
              
              {/* Accordion Item 1: Product Details */}
              <div className="border-b border-[#E5D9C8]/40 pb-4">
                <button
                  id="acc-details-btn"
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between font-sans text-xs uppercase tracking-[0.15em] text-[#1C1C1C] font-semibold focus:outline-none py-2"
                >
                  <span>Details & Origin</span>
                  {openAccordion === 'details' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === 'details' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="list-disc pl-4 pt-3 space-y-2 text-xs text-[#1C1C1C]/70 leading-relaxed font-light font-sans">
                        {product.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion Item 2: Materials & Care */}
              <div className="border-b border-[#E5D9C8]/40 pb-4">
                <button
                  id="acc-materials-btn"
                  onClick={() => toggleAccordion('materials')}
                  className="w-full flex items-center justify-between font-sans text-xs uppercase tracking-[0.15em] text-[#1C1C1C] font-semibold focus:outline-none py-2"
                >
                  <span>Materials & Care</span>
                  {openAccordion === 'materials' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === 'materials' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-xs text-[#1C1C1C]/70 leading-relaxed font-light font-sans">
                        {product.materials}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion Item 3: Insured Shipping */}
              <div className="border-b border-[#E5D9C8]/40 pb-4">
                <button
                  id="acc-shipping-btn"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between font-sans text-xs uppercase tracking-[0.15em] text-[#1C1C1C] font-semibold focus:outline-none py-2"
                >
                  <span>Complimentary Delivery</span>
                  {openAccordion === 'shipping' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === 'shipping' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-xs text-[#1C1C1C]/70 leading-relaxed font-light font-sans">
                        {product.shipping}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
