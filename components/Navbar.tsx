"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, User, Zap } from "lucide-react";
import CustomizePanel from "../components/CustomizePanel"; // Import the panel component
import { COLORS } from "../constants/colors"; // Import your color constants
import { switchTextColor, switchDarkLightLogo } from "@/utils/color";

interface NavbarProps {
  themeColor: string;
  onCustomizeClick: () => void;
}

export const Navbar = ({ themeColor, onCustomizeClick }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed h-header w-full z-50 flex items-center justify-between px-8 py-6 bg-black/50 border border-white/5"
    >
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.05 },
        }}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="flex items-center gap-2 group cursor-pointer"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: themeColor }}
        >
          <Zap
            size={20}
            style={{
              color: switchDarkLightLogo(themeColor),
              fill: switchDarkLightLogo(themeColor),
            }}
          />
        </div>
        <motion.span
          variants={{
            rest: { color: "#FFFFFF" },
            hover: { color: switchTextColor(themeColor) },
          }}
          transition={{ duration: 0.3 }}
          className="text-2xl text-white font-black tracking-tighter uppercase italic"
        >
          Dinkify
        </motion.span>
      </motion.div>

      <div className="hidden md:flex items-center gap-12">
        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <motion.button
              whileHover={{
                color: switchTextColor(themeColor),
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-white font-semibold cursor-pointer"
              onClick={onCustomizeClick}
            >
              Customize
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{
                color: switchTextColor(themeColor),
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-white font-semibold cursor-pointer"
            >
              <a
                href="https://github.com/JimmyWu7"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </motion.button>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-6 text-white">
        <motion.button
          whileHover={{ color: switchTextColor(themeColor), scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="text-white cursor-pointer"
        >
          <User size={20} />
        </motion.button>
        <motion.button
          whileHover={{ color: switchTextColor(themeColor), scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative text-white cursor-pointer"
        >
          <ShoppingCart size={20} />
          <span
            className="absolute -top-2 -right-2 text-[10px] font-black px-1.5 py-0.5 rounded-full transition-colors duration-500"
            style={{
              backgroundColor: themeColor,
              color: switchDarkLightLogo(themeColor),
              fill: switchDarkLightLogo(themeColor),
              border: `1px solid ${
                themeColor === "#FFFFFF"
                  ? "rgba(255,255,255,0.2)"
                  : "transparent"
              }`,
            }}
          >
            2
          </span>
        </motion.button>
      </div>
    </motion.nav>
  );
};
