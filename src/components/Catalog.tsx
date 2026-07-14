import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, PageType } from '../types';
import { client } from '../sanityClient';

interface CatalogProps {
  setCurrentPage: (page: PageType) => void;
  setSelectedProduct: (product: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: 'all' | 'handbags' | 'watches' | 'footwear' | 'jewelry';
  setActiveCategory: (category: 'all' | 'handbags' | 'watches' | 'footwear' | 'jewelry') => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc';

export default function Catalog({
  setCurrentPage,
  setSelectedProduct,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}: CatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  useEffect(() => {
    setLoading(true);
    const query = `*[_type == "product"]{_id, name, price, description, category, sizes, colors, stock, "image": image.asset->url}`;
    client.fetch(query)
      .then((data: any[]) => {
        if (data) {
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
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products in Catalog:", err);
        setLoading(false);
      });
  }, []);

  const categories: { id: typeof activeCategory; label: string }[] = [
    { id: 'all', label: 'All Pieces' },
    { id: 'handbags', label: 'Handbags' },
    { id: 'watches', label: 'Watches' },
    { id: 'footwear', label: 'Footwear' },
    { id: 'jewelry', label: 'Jewelry' },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category (case-insensitive check to map uppercase/lowercase correctly)
    if (activeCategory.toLowerCase() !== 'all') {
      result = result.filter((p) => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Sort products
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSortBy('default');
  };

  return (
    <main id="catalog-page" className="min-h-screen bg-[#F9F6F0] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Catalog Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1C1C] tracking-tight font-light">
            The Autumn Atelier <span className="italic">Collection</span>
          </h1>
          <p className="font-sans text-xs text-[#1C1C1C]/60 tracking-widest max-w-md mx-auto leading-relaxed">
            A quiet luxury range prioritizing architectural form, hand-dyed tanneries, and precision Swiss movements.
          </p>
        </div>

        {/* Filter & Sort Controls Top Bar */}
        <div id="catalog-controls" className="flex flex-col md:flex-row items-center justify-between border-b border-[#E5D9C8]/40 pb-6 mb-12 gap-6">
          
          {/* Categories Tab Selector */}
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
            {categories.map((cat) => (
              <button
                id={`cat-tab-${cat.id}`}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-sans text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all focus:outline-none ${
                  activeCategory.toLowerCase() === cat.id.toLowerCase()
                    ? 'bg-[#1C1C1C] text-[#F9F6F0] font-medium shadow-md'
                    : 'bg-[#E5D9C8]/10 hover:bg-[#E5D9C8]/30 text-[#1C1C1C]/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort & Counter Controls */}
          <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end">
            
            {/* Counter */}
            <span id="product-count" className="font-sans text-xs text-[#1C1C1C]/50 uppercase tracking-widest">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 border-b border-transparent focus-within:border-stone-400">
              <label htmlFor="sort-select" className="font-sans text-xs text-[#1C1C1C]/50 uppercase tracking-widest">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="font-sans text-xs text-[#1C1C1C] bg-transparent py-1 pr-4 focus:outline-none cursor-pointer uppercase tracking-wider"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>
        </div>

        {/* Search status or quick tags */}
        {searchQuery && (
          <div id="search-status" className="flex items-center justify-between bg-stone-100/50 rounded-2xl px-6 py-4 mb-8 border border-stone-200/50">
            <p className="font-sans text-xs text-stone-600 tracking-wider">
              Showing results for <span className="font-medium text-[#1C1C1C]">"{searchQuery}"</span>
            </p>
            <button
              id="clear-search-btn"
              onClick={() => setSearchQuery('')}
              className="font-sans text-[10px] uppercase tracking-widest text-[#1C1C1C] border-b border-[#1C1C1C] font-semibold"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Dynamic Products Grid */}
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="space-y-4 animate-pulse">
                  <div className="bg-[#E5D9C8]/20 rounded-[2rem] aspect-[4/5] w-full" />
                  <div className="space-y-2 px-1">
                    <div className="h-4 bg-[#E5D9C8]/30 rounded w-2/3" />
                    <div className="h-3 bg-[#E5D9C8]/20 rounded w-1/2" />
                    <div className="h-3 bg-[#E5D9C8]/10 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div
              id="product-grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  id={`product-card-${product.id}`}
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer flex flex-col justify-between"
                  onClick={() => handleProductClick(product)}
                >
                  
                  {/* Card Image Area with custom hover details */}
                  <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-stone-100 shadow-sm group-hover:shadow-md transition-shadow duration-500 mb-4 border border-[#E5D9C8]/10">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    
                    {/* Hover Quick View Button */}
                    <div className="absolute inset-0 bg-[#1C1C1C]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="bg-[#F9F6F0] text-[#1C1C1C] font-sans text-[10px] uppercase tracking-widest font-semibold px-6 py-3 rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                        View Details
                      </div>
                    </div>

                    {/* Left corner tag: Category */}
                    <span className="absolute top-4 left-4 bg-[#F9F6F0]/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest text-stone-500">
                      {product.category}
                    </span>
                  </div>

                  {/* Card Meta details */}
                  <div className="space-y-2 px-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-serif text-lg text-[#1C1C1C] tracking-wide leading-tight group-hover:text-stone-600 transition-colors">
                        {product.name}
                      </h3>
                      <span className="font-mono text-xs text-[#1C1C1C] font-semibold tracking-wider pt-1">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="font-sans text-[11px] text-[#1C1C1C]/50 font-light line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Subtle color swatches preview */}
                    <div className="flex items-center space-x-1 pt-2">
                      {product.colors.map((col) => (
                        <span
                          key={col.label}
                          style={{ backgroundColor: col.hex }}
                          className="w-2.5 h-2.5 rounded-full ring-1 ring-stone-900/10"
                          title={col.label}
                        />
                      ))}
                      {product.sizes.length > 0 && product.sizes[0] !== 'Standard' && (
                        <span className="font-sans text-[9px] text-[#1C1C1C]/40 uppercase tracking-widest pl-2 font-medium">
                          {product.sizes.join(' • ')}
                        </span>
                      )}
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            
            /* No Results State */
            <motion.div
              id="no-results-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-[#E5D9C8]/15 rounded-[3rem] border border-dashed border-[#E5D9C8]/40 px-6"
            >
              <h3 className="font-serif text-2xl text-[#1C1C1C] tracking-wide mb-2">No items match your curation</h3>
              <p className="font-sans text-xs text-stone-500 tracking-wider max-w-sm mx-auto leading-relaxed mb-8">
                We couldn't find any pieces matching your search query or criteria. Explore other luxury collections or reset filters.
              </p>
              <button
                id="reset-catalog-btn"
                onClick={clearFilters}
                className="px-6 py-3 bg-[#1C1C1C] text-[#F9F6F0] font-sans text-[10px] uppercase tracking-widest font-semibold rounded-full hover:shadow-lg transition-all"
              >
                Reset Curations
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
