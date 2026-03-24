"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Palette, Check } from "lucide-react";
import { COLORS } from "../constants/colors";
import { switchDarkLightLogo, switchTextColor } from "@/utils/color";

interface CustomizePanelProps {
  isOpen: boolean;
  onClose: () => void;
  setThemeColor: (color: string) => void;
  currentThemeColor: string;
}

const CustomizePanel: React.FC<CustomizePanelProps> = ({
  isOpen,
  onClose,
  setThemeColor,
  currentThemeColor,
}) => {
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[450px] bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl z-[101]"
          >
            <div className="flex justify-between items-start mb-12">
              <div>
                <div
                  className="flex items-center gap-3 mb-4"
                  style={{ color: switchTextColor(currentThemeColor) }}
                >
                  <Palette size={20} />
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-80">
                    Customization Lab
                  </p>
                </div>
                <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                  Tailor Your Gear
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white cursor-pointer"
              >
                <X size={24} />
              </motion.button>
            </div>

            <div className="space-y-10">
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-6">
                  Select Accent Color
                </p>
                <div className="grid grid-cols-4 gap-6">
                  {Object.entries(COLORS).map(([colorName, colorValue]) => (
                    <motion.button
                      key={colorName}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative flex flex-col items-center gap-3 group"
                      onClick={() => setThemeColor(colorValue)}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl cursor-pointer border-2 transition-all duration-300 flex items-center justify-center"
                        style={{
                          backgroundColor: colorValue,
                          borderColor:
                            currentThemeColor === colorValue
                              ? "white"
                              : "transparent",
                        }}
                      >
                        {currentThemeColor === colorValue && (
                          <Check
                            size={20}
                            className={
                              colorValue === "#FFFFFF"
                                ? "text-black"
                                : "text-white"
                            }
                          />
                        )}
                      </div>
                      <span className="text-[8px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">
                        {colorName}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: currentThemeColor,
                    color: switchDarkLightLogo(currentThemeColor),
                    boxShadow: "0 0 0 2px rgba(255,255,255,0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full py-5 bg-white text-black font-black uppercase tracking-tighter rounded-2xl cursor-pointer"
                >
                  Apply Configuration
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomizePanel;
