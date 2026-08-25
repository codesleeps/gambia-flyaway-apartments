import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hello! I am interested in booking an apartment with Gambia Flyaway Apartments.");
    const url = `https://wa.me/2207993244?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/30"
    >
      <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-extrabold pr-1">
        Chat on WhatsApp
      </span>
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
      </span>
    </button>
  );
};

export default WhatsAppFloat;
