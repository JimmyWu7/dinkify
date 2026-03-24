import { switchTextColor } from "@/utils/color";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface BackgroundTextProps {
  text: string;
  isDesktop?: boolean;
  color?: string;
}

export const BackgroundText = ({
  text,
  isDesktop,
  color = "#d4ff00",
}: BackgroundTextProps) => {
  const sizeClass = isDesktop ? "text-[27vw]" : "text-[22vw]";
  const hiddenClass = isDesktop
    ? "hidden lg:block absolute"
    : "lg:hidden w-full h-full flex justify-center items-center";

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={text}
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -100, opacity: 0, scale: 1.2 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={`${hiddenClass} text-center ${sizeClass} font-black uppercase italic tracking-tighter leading-none pointer-events-none`}
        style={{
          WebkitTextStroke: `2px ${switchTextColor(color)}33`,
          color: "transparent",
        }}
      >
        {text}
      </motion.h1>
    </AnimatePresence>
  );
};
