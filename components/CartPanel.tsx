"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import { switchDarkLightLogo, switchTextColor } from "@/utils/color";

interface CartItem {
  id: string;
  name: string;
  price: number;
  component: "Ball" | "Paddle" | "Set";
  color: string;
  quantity: number;
}

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  themeColor: string;
}

export const CartPanel = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  themeColor,
}: CartPanelProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 15.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Panel */}
          <motion.div
            initial={isMobile ? { y: "100%" } : { x: "100%" }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: "100%" } : { x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 bottom-0 md:top-0 h-[85vh] md:h-full w-full md:w-[450px] bg-[#050505]/95 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/10 z-[101] flex flex-col shadow-2xl rounded-t-[40px] md:rounded-t-none"
          >
            {/* Header */}
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-xl"
                  style={{
                    backgroundColor: `${themeColor}20`,
                    color: themeColor,
                  }}
                >
                  <ShoppingBag
                    size={20}
                    style={{ color: switchTextColor(themeColor) }}
                  />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-white">
                  Your Bag
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white cursor-pointer"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <ShoppingBag
                    size={48}
                    strokeWidth={1}
                    style={{ color: switchTextColor(themeColor) }}
                  />
                  <p className="text-sm uppercase tracking-widest font-bold">
                    Your bag is empty
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 p-4 bg-white/5 rounded-3xl border border-white/5 group"
                  >
                    {/* Item Preview (Simplified) */}
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden bg-black/40"
                      style={{ border: `1px solid ${item.color}30` }}
                    >
                      <div
                        className="absolute inset-0 opacity-20 blur-xl"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[10px] font-black uppercase tracking-tighter z-10 text-white/60">
                        {item.component}
                      </span>
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-bold text-lg leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                            {item.component} •{" "}
                            <span style={{ color: item.color }}>Custom</span>
                          </p>
                        </div>
                        <p className="text-white font-mono font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 bg-black/40 rounded-full px-3 py-1 border border-white/10">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-white/40 hover:text-white transition cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-mono font-bold text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-white/40 hover:text-white transition cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-white/20 hover:text-red-500 transition cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            <div className="p-8 bg-white/[0.02] border-t border-white/5 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs uppercase tracking-widest text-white/40 font-bold">
                  <span>Subtotal</span>
                  <span className="text-white/80 font-mono">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-white/40 font-bold">
                  <span>Shipping</span>
                  <span className="text-white/80 font-mono">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-white/40 font-bold">
                  <span>Estimated Tax</span>
                  <span className="text-white/80 font-mono">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="pt-4 flex justify-between items-end">
                  <span className="text-sm font-black uppercase tracking-tighter text-white">
                    Total
                  </span>
                  <span
                    className="text-3xl font-mono font-black text-white"
                    style={{ color: switchTextColor(themeColor) }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: switchTextColor(themeColor),
                  color: "#000",
                }}
                whileTap={{ scale: 0.98 }}
                disabled={items.length === 0}
                className="w-full py-5 bg-white text-black font-black uppercase italic tracking-tighter text-lg rounded-2xl flex items-center justify-center gap-3 transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              >
                Checkout <CreditCard size={20} />
              </motion.button>

              <p className="text-center text-[8px] uppercase tracking-[0.3em] text-white/20">
                Secure checkout powered by Dinkify Pay
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
