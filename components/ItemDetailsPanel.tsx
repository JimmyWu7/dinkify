"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Ruler,
  ShieldCheck,
  Layers,
  ArrowRight,
} from "lucide-react";
import { itemDetails } from "@/constants";
import { switchTextColor } from "@/utils/color";

interface ItemDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    component: "Ball" | "Paddle" | "Set";
  };
  color: string;
}

export const ItemDetailsPanel = ({
  isOpen,
  onClose,
  item,
  color,
}: ItemDetailsPanelProps) => {
  const details = itemDetails[item.component];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
            initial={isMobile ? { y: "100%", x: 0 } : { x: "100%", y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={isMobile ? { y: "100%", x: 0 } : { x: "100%", y: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 bottom-0 md:top-0 h-[60vh] md:h-full w-full md:w-[500px] bg-[#050505]/90 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/10 z-[101] overflow-y-auto shadow-2xl rounded-t-[40px] md:rounded-t-none"
          >
            {/* Mobile handle/indicator */}
            <div className="md:hidden w-16 h-1.5 bg-white/10 rounded-full mx-auto mt-6 mb-2" />

            <div className="p-8 md:p-16">
              <div className="flex justify-between items-start mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-80"
                    style={{ color: switchTextColor(color) }}
                  >
                    Engineering Excellence
                  </p>
                  <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white leading-none">
                    {item.name}
                  </h2>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="space-y-12">
                {/* Description */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-white/70 leading-relaxed text-xl font-medium">
                    {details.description}
                  </p>
                </motion.section>

                {/* Key Features Grid */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="group flex items-center gap-6 p-6 bg-white/[0.03] hover:bg-white/[0.06] rounded-3xl border border-white/5 transition-all duration-500">
                    <div
                      className="w-14 h-14 rounded-2xl bg-[#d4ff00]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                      style={{ color: switchTextColor(color) }}
                    >
                      <Layers size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">
                        Material Composition
                      </p>
                      <p className="text-white text-lg font-bold tracking-tight">
                        {details.material}
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-6 p-6 bg-white/[0.03] hover:bg-white/[0.06] rounded-3xl border border-white/5 transition-all duration-500">
                    <div
                      className="w-14 h-14 rounded-2xl bg-[#d4ff00]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                      style={{ color: switchTextColor(color) }}
                    >
                      <Ruler size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">
                        Physical Dimensions
                      </p>
                      <p className="text-white text-lg font-bold tracking-tight">
                        {details.dimensions}
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-6 p-6 bg-white/[0.03] hover:bg-white/[0.06] rounded-3xl border border-white/5 transition-all duration-500">
                    <div
                      className="w-14 h-14 rounded-2xl bg-[#d4ff00]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                      style={{ color: switchTextColor(color) }}
                    >
                      <ShieldCheck size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">
                        Quality Assurance
                      </p>
                      <p className="text-white text-lg font-bold tracking-tight">
                        {details.quality}
                      </p>
                    </div>
                  </div>
                </motion.section>

                {/* Specs List */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-white/30 font-black uppercase tracking-[0.3em] text-[10px] mb-8">
                    Performance Metrics
                  </h3>
                  <div className="grid grid-cols-1 gap-5">
                    {details.specs.map((spec, i) => (
                      <motion.div
                        key={spec}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-4 text-white/90 group"
                      >
                        <div
                          className="w-2 h-2 rounded-full group-hover:scale-150 transition-transform"
                          style={{ backgroundColor: switchTextColor(color) }}
                        />
                        <span className="text-base font-semibold tracking-tight">
                          {spec}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* CTA in panel */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-12 pb-8"
                >
                  <motion.button
                    onClick={onClose}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: switchTextColor(color),
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 bg-white text-black font-black uppercase italic tracking-tighter text-xl rounded-3xl shadow-[0_0_30px_rgba(212,255,0,0.2)] flex items-center justify-center gap-4 group cursor-pointer"
                  >
                    Secure Your Order{" "}
                    <ArrowRight
                      size={24}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </motion.button>
                  <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-6">
                    Free Express Shipping on All Premium Orders
                  </p>
                </motion.section>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
