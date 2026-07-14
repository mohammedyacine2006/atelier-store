import { useState, ChangeEvent } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { PageType, CartItem } from '../types';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  cart: CartItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: 'all' | 'handbags' | 'watches' | 'footwear' | 'jewelry') => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  cart,
  searchQuery,
  setSearchQuery,
  setActiveCategory,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (page: PageType, category?: 'all' | 'handbags' | 'watches' | 'footwear' | 'jewelry') => {
    setCurrentPage(page);
    if (category) {
      setActiveCategory(category);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (currentPage !== 'catalog' && e.target.value !== '') {
      setCurrentPage('catalog');
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-[#F9F6F0]/90 backdrop-blur-md border-b border-[#E5D9C8]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1C1C1C] hover:text-stone-500 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation Links - Left (Desktop) */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8 font-sans text-sm tracking-[0.2em] uppercase text-[#1C1C1C]/70">
            <button
              id="nav-link-shop"
              onClick={() => handleNavClick('catalog', 'all')}
              className={`hover:text-[#1C1C1C] transition-colors relative pb-1 ${
                currentPage === 'catalog' ? 'text-[#1C1C1C] font-medium' : ''
              }`}
            >
              Collection
              {currentPage === 'catalog' && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1C1C1C]" />
              )}
            </button>
            <button
              id="nav-link-bags"
              onClick={() => handleNavClick('catalog', 'handbags')}
              className="hover:text-[#1C1C1C] transition-colors"
            >
              Handbags
            </button>
            <button
              id="nav-link-watches"
              onClick={() => handleNavClick('catalog', 'watches')}
              className="hover:text-[#1C1C1C] transition-colors"
            >
              Watches
            </button>
            <button
              id="nav-link-editorial"
              onClick={() => handleNavClick('home')}
              className="hover:text-[#1C1C1C] transition-colors"
            >
              Editorial
            </button>
          </nav>

          {/* Luxury Minimalist Brand Logo - Center */}
          <div className="flex-1 md:absolute md:left-1/2 md:-translate-x-1/2 flex justify-center">
            <button
              id="logo-button"
              onClick={() => handleNavClick('home')}
              className="font-serif text-3xl sm:text-4xl tracking-[0.25em] text-[#1C1C1C] uppercase focus:outline-none transition-opacity hover:opacity-85"
            >
              Atelier
            </button>
          </div>

          {/* Right side controls: Search, Cart */}
          <div className="flex items-center space-x-6">
            
            {/* Search Input Container */}
            <div id="search-container" className="relative hidden sm:flex items-center">
              <input
                id="navbar-search-input"
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`font-sans text-sm bg-transparent border-b text-[#1C1C1C] placeholder-[#1C1C1C]/40 py-1 pl-1 pr-6 focus:outline-none transition-all duration-300 ${
                  isSearchFocused ? 'w-48 border-[#1C1C1C]' : 'w-28 border-[#E5D9C8]'
                }`}
              />
              <Search size={14} className="absolute right-1 text-[#1C1C1C]/50 pointer-events-none" />
            </div>

            {/* Cart Button */}
            <button
              id="cart-icon-btn"
              onClick={() => handleNavClick('cart')}
              className="relative p-2 text-[#1C1C1C] hover:text-stone-500 transition-colors focus:outline-none group"
              aria-label="View shopping bag"
            >
              <ShoppingBag size={20} className="transition-transform group-hover:scale-105" />
              {cartCount > 0 && (
                <span
                  id="cart-badge"
                  className="absolute -top-1 -right-1 bg-[#1C1C1C] text-[#F9F6F0] text-[11px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center scale-90 border border-[#F9F6F0]"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slider */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-[#F9F6F0] border-t border-[#E5D9C8]/40 px-4 pt-4 pb-6 space-y-4 font-sans text-sm tracking-widest uppercase text-[#1C1C1C] animate-fade-in">
          <div className="pb-3 border-b border-[#E5D9C8]/30">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full font-sans text-sm bg-stone-100 border border-stone-200 rounded-lg py-2 px-3 text-[#1C1C1C] focus:outline-none focus:border-stone-400"
            />
          </div>
          <button
            id="mobile-nav-collection"
            onClick={() => handleNavClick('catalog', 'all')}
            className="block w-full text-left py-2 font-medium"
          >
            The Collection
          </button>
          <button
            id="mobile-nav-handbags"
            onClick={() => handleNavClick('catalog', 'handbags')}
            className="block w-full text-left py-2"
          >
            Handbags
          </button>
          <button
            id="mobile-nav-watches"
            onClick={() => handleNavClick('catalog', 'watches')}
            className="block w-full text-left py-2"
          >
            Watches
          </button>
          <button
            id="mobile-nav-jewelry"
            onClick={() => handleNavClick('catalog', 'jewelry')}
            className="block w-full text-left py-2"
          >
            Jewelry
          </button>
          <button
            id="mobile-nav-footwear"
            onClick={() => handleNavClick('catalog', 'footwear')}
            className="block w-full text-left py-2"
          >
            Footwear
          </button>
          <button
            id="mobile-nav-editorial"
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2"
          >
            Editorial Story
          </button>
        </div>
      )}
    </header>
  );
}
