import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, PageType, OrderDetails, ColorOption } from './types';
import { products as staticProducts } from './data';
import { Globe, Shield, Award, Sparkles, X, ArrowRight } from 'lucide-react';
import { client } from './sanityClient';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import BentoCategories from './components/BentoCategories';
import Catalog from './components/Catalog';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import SuccessPage from './components/SuccessPage';
import Notification from './components/Notification';

// New Modular Home Sections
import MarqueeRow from './components/MarqueeRow';
import CategoryFormCards from './components/CategoryFormCards';
import BestsellersShowcase from './components/BestsellersShowcase';
import MaterialProvenance from './components/MaterialProvenance';
import Reviews from './components/Reviews';

interface JournalArticle {
  id: number;
  tag: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'handbags' | 'watches' | 'footwear' | 'jewelry'>('all');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Home Page states for the new sections
  const [seasonalTab, setSeasonalTab] = useState<'all' | 'handbags' | 'watches' | 'footwear' | 'jewelry'>('all');
  const [activeJournalStory, setActiveJournalStory] = useState<JournalArticle | null>(null);
  const [products, setProducts] = useState<Product[]>(staticProducts);

  useEffect(() => {
    const query = `*[_type == "product"]{_id, name, price, description, category, sizes, colors, stock, "image": image.asset->url}`;

    client.fetch(query)
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const mapped: Product[] = data.map((item) => {
            const imgUrl = item.image || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop';
            const mappedCategory = (item.category || 'handbags').toLowerCase();
            return {
              id: item._id,
              name: item.name || 'Unnamed Product',
              price: item.price || 0,
              category: mappedCategory as any,
              description: item.description || '',
              shortDescription: item.description 
                ? (item.description.slice(0, 120) + (item.description.length > 120 ? '...' : ''))
                : '',
              details: [
                'Individually inspected and signed by the master craftsman',
                'Designed with structural permanence and daily utility',
                'Responsibly sourced premium materials',
              ],
              materials: 'Premium selected materials, crafted in compliance with international environmental standards.',
              shipping: 'Complimentary express shipping worldwide. Delivered in signature linen pouch.',
              images: [imgUrl],
              colors: item.colors && item.colors.length > 0
                ? item.colors.map((c: any) => ({ label: c.label || '', hex: c.hex || '' }))
                : [
                    { label: "Noir", hex: "#1C1C1C" },
                    { label: "Sable", hex: "#8E7D6F" },
                    { label: "Oatmeal", hex: "#E5D9C8" }
                  ],
              sizes: item.sizes && item.sizes.length > 0
                ? item.sizes
                : ['Standard', 'Medium', 'Large'],
              stock: item.stock !== undefined ? item.stock : 10
            };
          });
          setProducts(mapped);
        }
      })
      .catch((err) => {
        console.error('Error fetching products from Sanity:', err);
      });
  }, []);

  // Handle Stripe redirect back to success page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    const sessionId = params.get('session_id');

    if (pageParam === 'success' && sessionId) {
      // Clear URL query parameters to avoid repeat loads
      window.history.replaceState({}, document.title, window.location.pathname);

      // Fetch checkout details from local Express server
      fetch(`http://localhost:4242/checkout-session/${sessionId}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to retrieve checkout details.');
          return res.json();
        })
        .then((data) => {
          // Reconstruct purchased items from localStorage to maintain color, size, and image selections
          const pendingItemsStr = localStorage.getItem('atelier_pending_order_items');
          let items = [];
          if (pendingItemsStr) {
            try {
              items = JSON.parse(pendingItemsStr);
            } catch (err) {
              console.error('Error parsing pending items:', err);
            }
          }

          setOrderDetails({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            city: data.city,
            zipCode: data.zipCode,
            cardNumber: '•••• •••• •••• 4242',
            receiptId: data.receiptId,
            total: data.total,
            items: items.length > 0 ? items : [],
          });

          // Clear cart and clean up pending order state
          setCart([]);
          localStorage.removeItem('atelier_cart');
          localStorage.removeItem('atelier_pending_order_items');
          setCurrentPage('success');
        })
        .catch((err) => {
          console.error('Error handling checkout success redirect:', err);
        });
    } else if (pageParam === 'cart') {
      setCurrentPage('cart');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Restore cart from localStorage if available
  useEffect(() => {
    const cachedCart = localStorage.getItem('atelier_cart');
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        console.error("Error reading cart from storage", e);
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('atelier_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart operations
  const addToCart = (product: Product, quantity: number, color: ColorOption, size: string, image?: string) => {
    const stock = product.stock !== undefined ? product.stock : 10;
    const existingInCart = cart
      .filter((item) => item.id === product.id)
      .reduce((acc, item) => acc + item.quantity, 0);

    if (existingInCart + quantity > stock) {
      alert(`Sorry, you can't add more than the available stock (${stock} pieces).`);
      return;
    }

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.chosenColor.label === color.label &&
          item.chosenSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        updated[existingIdx].stock = stock;
        if (image) {
          updated[existingIdx].image = image;
          updated[existingIdx].cartImage = image;
        }
        return updated;
      } else {
        const itemImage = image || product.images[0];
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          chosenColor: color,
          selectedColor: color,
          chosenSize: size,
          quantity,
          image: itemImage,
          cartImage: itemImage,
          category: product.category,
          stock: stock,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const updateCartQuantity = (id: string, colorLabel: string, size: string, change: number) => {
    setCart((prevCart) => {
      // Find the item first to get its stock limit
      const itemToUpdate = prevCart.find(
        (item) =>
          item.id === id &&
          item.chosenColor.label === colorLabel &&
          item.chosenSize === size
      );

      if (itemToUpdate) {
        const stock = itemToUpdate.stock !== undefined ? itemToUpdate.stock : 10;
        const otherItemsQuantity = prevCart
          .filter(
            (item) =>
              item.id === id &&
              !(item.chosenColor.label === colorLabel && item.chosenSize === size)
          )
          .reduce((acc, item) => acc + item.quantity, 0);

        if (change > 0 && otherItemsQuantity + itemToUpdate.quantity + change > stock) {
          alert(`Sorry, you can't add more than the available stock (${stock} pieces).`);
          return prevCart;
        }
      }

      return prevCart
        .map((item) => {
          if (
            item.id === id &&
            item.chosenColor.label === colorLabel &&
            item.chosenSize === size
          ) {
            return { ...item, quantity: item.quantity + change };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (id: string, colorLabel: string, size: string) => {
    setCart((prevCart) => {
      return prevCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.chosenColor.label === colorLabel &&
            item.chosenSize === size
          )
      );
    });
  };

  const clearCart = () => setCart([]);

  // Editorial journal content data
  const journalArticles: JournalArticle[] = [
    {
      id: 1,
      tag: "01 / ESSAYS",
      title: "The Longevity of Vegetable-Tanned Leather",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
      excerpt: "An exploration of age, patina, and the beauty of slow natural tanning processes.",
      content: "Vegetable-tanned leather is not merely a material; it is a living canvas that records the passage of time. Unlike chrome-tanned alternatives that deteriorate, vegetable tanning relies on natural bark extracts, mimosa, and quebracho. This slow, artisanal process takes up to forty days, resulting in a rich, fibrous structure that gains depth, character, and a deep warm patina with every touch.\n\nAt our Florence workshops, we ensure each skin is treated with pure, organic lipids that retain the leather's natural breathability. When you carry an Atelier piece, the oils of your hands, the ambient humidity, and the sunlight weave together to sculpt a completely unique shade. This is the luxury of patience."
    },
    {
      id: 2,
      tag: "02 / ARCHIVE",
      title: "Chrono-Design: The Architecture of Precision",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
      excerpt: "Analyzing how structural engineering and minimalist aesthetics redefine haute horology.",
      content: "In watchmaking, the line between art and engineering does not exist. Every balance wheel, hairspring, and bridge serves a dual purpose: absolute precision and mathematical beauty. Chrono-design is the philosophy of stripping away the ornamental noise to lay bare the pure geometry of timekeeping.\n\nOur watchmaker studio in Solothurn, Switzerland, adheres to a strict code of dimensional restraint. By refining the titanium case profiles to a mere 6.2 millimeters, we challenge the physical boundaries of mechanical movements. The result is a seamless weightlessness that honors the natural rhythm of your days."
    },
    {
      id: 3,
      tag: "03 / PROVENANCE",
      title: "The Art of Slow Living and Sculptured Accents",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
      excerpt: "Why modern spaces and dressing codes demand objects that endure for generations.",
      content: "We live in an era of rapid obsolescence, where objects are designed to be replaced rather than remembered. To counter this, we advocate for sculptured accents—items of singular quality that serve as anchors in both wardrobe and living spaces.\n\nWhether it is the heavy, fluid twist of a recycled 18-karat gold band or the architectural drape of a hand-painted box tote, these accents carry a physical weight and heritage. They ask us to slow down, to appreciate the silent hours spent stitching a seam or polishing a metal surface. True luxury does not shout; it is a quiet agreement between the maker and the keeper."
    }
  ];

  // Derived filtered products for the Seasonal Highlights Grid
  const filteredSeasonalProducts = seasonalTab.toLowerCase() === 'all'
    ? products
    : products.filter(p => p.category && p.category.toLowerCase() === seasonalTab.toLowerCase());

  return (
    <div className="min-h-screen bg-[#F9F6F0] flex flex-col justify-between text-[#1C1C1C] overflow-x-hidden selection:bg-[#E5D9C8] selection:text-[#1C1C1C] font-sans">
      
      {/* Global Toast Notification */}
      <Notification message={notification} onClose={() => setNotification(null)} />

      {/* Global Minimal Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cart={cart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setActiveCategory={setActiveCategory}
      />

      {/* Main viewport with AnimatePresence for editorial page-fade transitions */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* 1. Asymmetrical Hero Section */}
              <Hero setCurrentPage={setCurrentPage} setActiveCategory={setActiveCategory} />

              {/* 2. Scrolling Marquee Row */}
              <MarqueeRow />

              {/* 3. Editorial Philosophy Statement */}
              <section className="bg-[#1C1C1C] text-[#FAF8F5] py-28 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FAF8F5_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                  <p className="font-sans text-[12px] uppercase tracking-[0.35em] text-[#C5B3A6] font-semibold">
                    The Atelier Statement
                  </p>
                  <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl italic font-light leading-relaxed text-[#FAF8F5]/90">
                    "We reject the velocity of contemporary trends. Instead, we pursue slow provenance — focusing entirely on sculptural geometry, the absolute purity of raw materials, and quiet endurance."
                  </blockquote>
                  <div className="w-12 h-[1px] bg-[#C5B3A6] mx-auto"></div>
                  <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-stone-400 font-medium">
                    Atelier Co. Design Manual • Vol. V
                  </p>
                </div>
              </section>

              {/* 4. Brand Universe (5-Card Bento Grid Category Overview) */}
              <BentoCategories setCurrentPage={setCurrentPage} setActiveCategory={setActiveCategory} />

              {/* 5. Category Cards (Curated by Form 3-Column Grid) */}
              <CategoryFormCards setCurrentPage={setCurrentPage} setActiveCategory={setActiveCategory} />

              {/* 6. Bestsellers Showcase (3-Column Grid with Limited Edition & Specs Checkmarks) */}
              <BestsellersShowcase setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} products={products} />

              {/* 7. Material Provenance Split (Monochrome image & 2x2 Material grid) */}
              <MaterialProvenance />

              {/* 8. Social Proof Reviews (Collector rating stats & Horizontal Reviews) */}
              <Reviews />

              {/* SECTION 3: MICRO-INTERACTION & VALUE PROPOSITION */}
              <section className="bg-[#F2EFE9]/40 border-t border-b border-[#E5D9C8]/40 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    <div className="group flex flex-col items-center text-center space-y-3 p-2">
                      <div className="p-3 bg-[#F2EFE9] text-[#8E7D6F] rounded-full group-hover:bg-[#1C1C1C] group-hover:text-[#FAF8F5] transition-colors duration-500">
                        <Globe className="w-4 h-4 stroke-[1.25]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans text-[12px] uppercase tracking-[0.2em] font-semibold text-[#1C1C1C]">
                          Global Transit
                        </h4>
                        <p className="font-serif text-xs text-stone-500 italic">
                          Free Global Express Delivery
                        </p>
                      </div>
                    </div>

                    <div className="group flex flex-col items-center text-center space-y-3 p-2">
                      <div className="p-3 bg-[#F2EFE9] text-[#8E7D6F] rounded-full group-hover:bg-[#1C1C1C] group-hover:text-[#FAF8F5] transition-colors duration-500">
                        <Shield className="w-4 h-4 stroke-[1.25]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans text-[12px] uppercase tracking-[0.2em] font-semibold text-[#1C1C1C]">
                          Secure Wrapping
                        </h4>
                        <p className="font-serif text-xs text-stone-500 italic">
                          Complimentary Insured Packaging
                        </p>
                      </div>
                    </div>

                    <div className="group flex flex-col items-center text-center space-y-3 p-2">
                      <div className="p-3 bg-[#F2EFE9] text-[#8E7D6F] rounded-full group-hover:bg-[#1C1C1C] group-hover:text-[#FAF8F5] transition-colors duration-500">
                        <Award className="w-4 h-4 stroke-[1.25]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans text-[12px] uppercase tracking-[0.2em] font-semibold text-[#1C1C1C]">
                          Lifetime Pledge
                        </h4>
                        <p className="font-serif text-xs text-stone-500 italic">
                          Lifetime Craftsmanship Warranty
                        </p>
                      </div>
                    </div>

                    <div className="group flex flex-col items-center text-center space-y-3 p-2">
                      <div className="p-3 bg-[#F2EFE9] text-[#8E7D6F] rounded-full group-hover:bg-[#1C1C1C] group-hover:text-[#FAF8F5] transition-colors duration-500">
                        <Sparkles className="w-4 h-4 stroke-[1.25]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans text-[12px] uppercase tracking-[0.2em] font-semibold text-[#1C1C1C]">
                          Bespoke Atelier
                        </h4>
                        <p className="font-serif text-xs text-stone-500 italic">
                          Bespoke Personalization Available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* THE SEASONAL COLLECTION (Dynamic Product Tabs) */}
              <section className="bg-[#FAF8F5] py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-2">
                      <p className="font-sans text-[12px] uppercase tracking-[0.3em] text-[#C5B3A6] font-semibold">
                        Curated Offerings
                      </p>
                      <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1C1C] font-light tracking-tight">
                        The Seasonal Collection
                      </h2>
                    </div>

                    {/* Functional Category Filter Tabs */}
                    <div className="flex flex-wrap gap-2 border-b border-[#E5D9C8]/30 pb-1">
                      {(['all', 'handbags', 'watches', 'footwear', 'jewelry'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setSeasonalTab(tab)}
                          className="relative px-3 py-1.5 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 focus:outline-none cursor-pointer"
                          style={{ color: seasonalTab.toLowerCase() === tab.toLowerCase() ? '#1C1C1C' : '#8E7D6F' }}
                        >
                          {tab === 'all' ? 'All Pieces' : tab}
                          {seasonalTab.toLowerCase() === tab.toLowerCase() && (
                            <motion.div
                              layoutId="activeSeasonalTab"
                              className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1C1C1C]"
                              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4-column Dynamic Product Grid with AnimatePresence */}
                  <motion.div 
                    layout 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredSeasonalProducts.map((product) => (
                        <motion.div
                          layout
                          id={`product-card-${product.id}`}
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4 }}
                          onClick={() => {
                            setSelectedProduct(product);
                            setCurrentPage('product');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="group cursor-pointer flex flex-col justify-between h-full"
                        >
                          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-stone-100 shadow-sm group-hover:shadow-md transition-shadow duration-500 mb-4 border border-[#E5D9C8]/10">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#1C1C1C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                          <div className="space-y-1 mt-auto">
                            <div className="flex justify-between items-baseline gap-2">
                              <h3 className="font-serif text-[17px] sm:text-[18px] text-[#1C1C1C] tracking-wide font-light truncate">
                                {product.name}
                              </h3>
                              <span className="font-mono text-sm text-stone-500 flex-shrink-0">
                                ${product.price.toLocaleString()}
                              </span>
                            </div>
                            <p className="font-sans text-[11px] text-stone-400 uppercase tracking-widest leading-none pt-1">
                              {product.category}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </section>

              {/* THE ATELIER JOURNAL (Editorial/Blog Grid) */}
              <section className="bg-[#F2EFE9]/30 border-t border-[#E5D9C8]/40 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="space-y-2 mb-16 text-center">
                    <p className="font-sans text-[12px] uppercase tracking-[0.3em] text-[#C5B3A6] font-semibold">
                      Brand Narratives
                    </p>
                    <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1C1C] font-light tracking-tight">
                      The Atelier Journal
                    </h2>
                    <p className="font-serif text-base text-stone-500 italic max-w-lg mx-auto">
                      Essays on craft, philosophy, materials, and the luxury of patience.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
                    {journalArticles.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => setActiveJournalStory(article)}
                        className="group cursor-pointer flex flex-col space-y-5"
                      >
                        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-stone-100 border border-[#E5D9C8]/15 shadow-sm">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-[1s] ease-out group-hover:scale-103"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="space-y-3">
                          <span className="font-sans text-[12px] uppercase tracking-[0.3em] text-[#C5B3A6] font-semibold block">
                            {article.tag}
                          </span>
                          <h3 className="font-serif text-2xl text-[#1C1C1C] font-light leading-snug group-hover:text-stone-600 transition-colors duration-300">
                            {article.title}
                          </h3>
                          <p className="font-serif text-stone-500 text-sm leading-relaxed font-light line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="pt-2">
                            <span className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.2em] text-[#1C1C1C] border-b border-[#1C1C1C] pb-0.5 group-hover:text-stone-500 group-hover:border-stone-500 transition-all duration-300 font-semibold">
                              Read Story <ArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {currentPage === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Catalog
                setCurrentPage={setCurrentPage}
                setSelectedProduct={setSelectedProduct}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </motion.div>
          )}

          {currentPage === 'product' && selectedProduct && (
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductDetails
                product={selectedProduct}
                setCurrentPage={setCurrentPage}
                addToCart={addToCart}
                setNotification={setNotification}
              />
            </motion.div>
          )}

          {currentPage === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CartPage
                cart={cart}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
                setCurrentPage={setCurrentPage}
                setOrderDetails={setOrderDetails}
                clearCart={clearCart}
              />
            </motion.div>
          )}

          {currentPage === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SuccessPage
                orderDetails={orderDetails}
                setCurrentPage={setCurrentPage}
                setActiveCategory={setActiveCategory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global Editorial Footer */}
      <Footer setCurrentPage={setCurrentPage} setActiveCategory={setActiveCategory} />

      {/* Journal Story Modal Overlay */}
      <AnimatePresence>
        {activeJournalStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1C1C1C]/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setActiveJournalStory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="bg-[#F9F6F0] rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative border border-[#E5D9C8]/40 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveJournalStory(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#F2EFE9] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#F9F6F0] transition-colors duration-300 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Cover Image */}
              <div className="h-64 sm:h-80 overflow-hidden relative">
                <img
                  src={activeJournalStory.image}
                  alt={activeJournalStory.title}
                  className="w-full h-full object-cover filter grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F0] via-transparent to-transparent"></div>
              </div>

              {/* Text Area */}
              <div className="p-8 sm:p-10 space-y-6">
                <div className="space-y-2">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C5B3A6] font-semibold block">
                    {activeJournalStory.tag}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-light leading-tight">
                    {activeJournalStory.title}
                  </h3>
                </div>

                <div className="w-12 h-[1px] bg-[#E5D9C8]"></div>

                <p className="font-serif text-sm sm:text-base text-stone-600 leading-relaxed font-light whitespace-pre-line text-justify">
                  {activeJournalStory.content}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => setActiveJournalStory(null)}
                    className="font-sans text-xs uppercase tracking-widest text-[#1C1C1C] font-semibold border-b border-[#1C1C1C] pb-0.5 hover:text-stone-500 hover:border-stone-500 transition-colors"
                  >
                    Close Reading
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
