import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';

interface NotificationProps {
  message: string | null;
  onClose: () => void;
}

export default function Notification({ message, onClose }: NotificationProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          id="cart-add-notification"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-24 right-4 sm:right-8 z-50 bg-[#F9F6F0] border-2 border-[#1C1C1C] rounded-2xl shadow-xl p-4 max-w-sm w-[90vw] sm:w-auto flex items-start space-x-3.5"
        >
          {/* Green Confirmation Seal */}
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check size={12} strokeWidth={3} />
          </div>

          {/* Copy */}
          <div className="flex-1 min-w-0">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C5B3A6] font-semibold">
              Item Added to Bag
            </p>
            <p className="font-sans text-xs text-[#1C1C1C] leading-normal font-light mt-1">
              {message}
            </p>
          </div>

          {/* Dismiss button */}
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 transition-colors p-1"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
