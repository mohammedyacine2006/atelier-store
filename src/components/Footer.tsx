import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { PageType } from '../types';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
  setActiveCategory: (category: 'all' | 'handbags' | 'watches' | 'footwear' | 'jewelry') => void;
}

export default function Footer({ setCurrentPage, setActiveCategory }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide a valid address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email format.');
      return;
    }

    setError('');
    setSubscribed(true);
    setEmail('');
  };

  const navigateToCategory = (cat: 'handbags' | 'watches' | 'footwear' | 'jewelry') => {
    setActiveCategory(cat);
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#1C1C1C] text-[#F9F6F0] pt-20 pb-12 mt-auto border-t border-[#E5D9C8]/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-stone-800">
          
          {/* Newsletter section - 5 columns */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-3xl tracking-widest text-stone-100 uppercase mb-4">
                The Atelier Letter
              </h3>
              <p className="text-stone-400 text-sm tracking-wider leading-relaxed mb-8 max-w-sm">
                Receive exclusive previews of new collection drops, private editorial lookbooks, and thoughts on craft.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative w-full max-w-md">
              {!subscribed ? (
                <div>
                  <div className="flex border-b border-stone-700 focus-within:border-[#E5D9C8] transition-colors py-1">
                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className="w-full bg-transparent text-sm text-stone-200 placeholder-stone-500 py-2 focus:outline-none"
                    />
                    <button
                      id="newsletter-submit"
                      type="submit"
                      className="text-sm uppercase tracking-[0.2em] hover:text-[#E5D9C8] transition-colors px-4 focus:outline-none"
                    >
                      Subscribe
                    </button>
                  </div>
                  {error && <p id="newsletter-error" className="text-red-400 text-[12px] mt-2 tracking-wider">{error}</p>}
                </div>
              ) : (
                <motion.div
                  id="newsletter-success"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-stone-800/40 border border-stone-800 px-4 py-3 rounded-lg"
                >
                  <p className="text-sm text-[#E5D9C8] tracking-widest uppercase mb-1">Welcome to the Atelier</p>
                  <p className="text-xs text-stone-400 leading-normal">Your invitation and membership will arrive in your inbox shortly.</p>
                </motion.div>
              )}
            </form>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links columns - 6 columns total */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-[12px] uppercase tracking-[0.25em] text-stone-500 mb-5">Collections</h4>
              <ul className="space-y-3 text-stone-300 tracking-wider">
                <li>
                  <button id="footer-link-handbags" onClick={() => navigateToCategory('handbags')} className="hover:text-white transition-colors">
                    Handbags
                  </button>
                </li>
                <li>
                  <button id="footer-link-watches" onClick={() => navigateToCategory('watches')} className="hover:text-white transition-colors">
                    Fine Watches
                  </button>
                </li>
                <li>
                  <button id="footer-link-jewelry" onClick={() => navigateToCategory('jewelry')} className="hover:text-white transition-colors">
                    Sought Jewelry
                  </button>
                </li>
                <li>
                  <button id="footer-link-footwear" onClick={() => navigateToCategory('footwear')} className="hover:text-white transition-colors">
                    Footwear
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[12px] uppercase tracking-[0.25em] text-stone-500 mb-5">Atelier</h4>
              <ul className="space-y-3 text-stone-300 tracking-wider">
                <li><a href="#about" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#provenance" className="hover:text-white transition-colors">Provenance</a></li>
                <li><a href="#sustainability" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#journal" className="hover:text-white transition-colors">The Journal</a></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-semibold text-[12px] uppercase tracking-[0.25em] text-stone-500 mb-5">Services</h4>
              <ul className="space-y-3 text-stone-300 tracking-wider">
                <li><a href="#care" className="hover:text-white transition-colors">Product Care</a></li>
                <li><a href="#repairs" className="hover:text-white transition-colors">Repairs & Bespoke</a></li>
                <li><a href="#concierge" className="hover:text-white transition-colors">Concierge Care</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Atelier</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[12px] text-stone-500 tracking-widest uppercase">
          <p>© 2026 Atelier Co. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <a href="#accessibility" className="hover:text-stone-300 transition-colors">Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
