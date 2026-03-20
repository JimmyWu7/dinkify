"use client";

import { motion } from "framer-motion";
import { ShoppingCart, User, Zap } from "lucide-react";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-10 h-10 bg-[#d4ff00] rounded-full flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(212,255,0,0.3)]">
          <Zap size={20} className="text-black fill-black" />
        </div>
        <span className="text-2xl font-black tracking-tighter uppercase italic group-hover:text-[#d4ff00] transition-colors text-white">
          Dinkify
        </span>
      </div>

      <div className="hidden md:flex items-center gap-12">
        <a
          href="#"
          className="text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-[#d4ff00] transition-colors"
        >
          Customize
        </a>
        <a
          href="#"
          className="text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-[#d4ff00] transition-colors"
        >
          Contact
        </a>
      </div>

      <div className="flex items-center gap-6 text-white">
        <button className="hover:text-[#d4ff00] transition-colors">
          <User size={20} />
        </button>
        <button className="hover:text-[#d4ff00] transition-colors relative">
          <ShoppingCart size={20} />
          <span className="absolute -top-2 -right-2 bg-[#d4ff00] text-black text-[10px] font-black px-1.5 py-0.5 rounded-full">
            2
          </span>
        </button>
      </div>
    </motion.nav>
  );
};
