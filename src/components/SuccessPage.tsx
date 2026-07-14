import { motion } from 'motion/react';
import { CheckCircle, ShieldCheck, Mail, Calendar } from 'lucide-react';
import { OrderDetails, PageType } from '../types';

interface SuccessPageProps {
  orderDetails: OrderDetails | null;
  setCurrentPage: (page: PageType) => void;
  setActiveCategory: (category: 'all' | 'handbags' | 'watches' | 'footwear' | 'jewelry') => void;
}

export default function SuccessPage({
  orderDetails,
  setCurrentPage,
  setActiveCategory,
}: SuccessPageProps) {
  
  const handleContinue = () => {
    setActiveCategory('all');
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!orderDetails) {
    return (
      <div className="bg-[#F9F6F0] min-h-screen flex items-center justify-center p-4">
        <button
          onClick={handleContinue}
          className="px-6 py-3 bg-[#1C1C1C] text-white rounded-full font-sans text-xs uppercase tracking-widest"
        >
          Return to Atelier
        </button>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div id="success-page-container" className="bg-[#F9F6F0] min-h-screen py-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-sm border border-[#E5D9C8]/40 space-y-8"
        >
          {/* Success Check Shield */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle size={32} />
            </div>
            
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C5B3A6] font-semibold">
              Thank You for Your Order
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] tracking-wide font-light">
              Order Confirmed
            </h1>
            <p className="text-stone-500 text-xs tracking-wider max-w-sm mx-auto leading-relaxed">
              We are carefully preparing your selected luxury pieces. Your order receipt has been sent to <span className="text-[#1C1C1C] font-semibold">{orderDetails.email}</span>.
            </p>
          </div>

          <div className="w-full h-[1px] bg-[#E5D9C8]/40"></div>

          {/* Receipt Meta */}
          <div className="grid grid-cols-2 gap-6 text-xs text-stone-500">
            <div className="space-y-1">
              <span className="flex items-center space-x-1.5 text-[9px] uppercase tracking-widest font-semibold text-stone-400">
                <Calendar size={12} />
                <span>Date Placed</span>
              </span>
              <p className="font-sans text-stone-800 font-medium">{currentDate}</p>
            </div>

            <div className="space-y-1">
              <span className="flex items-center space-x-1.5 text-[9px] uppercase tracking-widest font-semibold text-stone-400">
                <ShieldCheck size={12} />
                <span>Receipt Number</span>
              </span>
              <p className="font-mono text-stone-800 font-bold">{orderDetails.receiptId}</p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-4">
            <h2 className="font-serif text-lg text-[#1C1C1C] tracking-wide font-light">Purchased Items</h2>
            <div className="space-y-4 bg-[#F9F6F0]/50 rounded-2xl p-6 border border-stone-200/20">
              {orderDetails.items.map((item) => (
                <div
                  id={`receipt-item-${item.id}`}
                  key={`${item.id}-${item.chosenColor.label}-${item.chosenSize}`}
                  className="flex items-center space-x-4 text-xs"
                >
                  <div className="w-12 h-15 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100">
                    <img src={item.cartImage || item.image} alt={item.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-[#1C1C1C] font-light truncate">{item.name}</p>
                    <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">
                      Qty: {item.quantity} • {(item.selectedColor || item.chosenColor).label} • {item.chosenSize}
                    </p>
                  </div>
                  <span className="font-mono text-stone-800 font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div className="w-full h-[1px] bg-[#E5D9C8]/40 my-4"></div>

              {/* Total Summary */}
              <div className="flex justify-between items-center text-xs pt-1">
                <span className="font-sans font-medium uppercase text-stone-400 tracking-wider">Total Amount Paid</span>
                <span className="font-mono text-base font-bold text-[#1C1C1C]">${orderDetails.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address Review */}
          <div className="space-y-3">
            <h2 className="font-serif text-lg text-[#1C1C1C] tracking-wide font-light">Shipping Coordinates</h2>
            <div className="bg-[#F9F6F0]/40 rounded-2xl p-6 border border-stone-200/20 text-xs text-[#1C1C1C]/80 space-y-1">
              <p className="font-semibold text-stone-800">{orderDetails.firstName} {orderDetails.lastName}</p>
              <p>{orderDetails.address}</p>
              <p>{orderDetails.city}, {orderDetails.zipCode}</p>
              <p className="pt-2 flex items-center space-x-1.5 text-[10px] uppercase text-stone-400 tracking-wider font-semibold">
                <Mail size={12} />
                <span>Delivery updates are sent automatically</span>
              </p>
            </div>
          </div>

          {/* Return button */}
          <div className="text-center pt-4">
            <button
              id="success-continue-btn"
              onClick={handleContinue}
              className="px-8 py-4 bg-[#1C1C1C] text-[#F9F6F0] font-sans text-xs uppercase tracking-[0.25em] font-semibold rounded-full hover:shadow-lg transition-all focus:outline-none"
            >
              Continue Exploring
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
