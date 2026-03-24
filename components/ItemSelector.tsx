import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { switchTextColor } from "@/utils/color";

interface Item {
  name: string;
  component: "Ball" | "Paddle" | "Set";
}

interface ItemSelectorProps {
  items: Item[];
  activeItem: Item;
  setIndex: (i: number) => void;
  color?: string;
}

export const ItemSelector = ({
  items,
  activeItem,
  setIndex,
  color = "#d4ff00",
}: ItemSelectorProps) => {
  return (
    <div className="md:w-full absolute right-0 md:relative flex flex-col items-end justify-self-end p-2 order-2 md:order-3">
      {items.map((item) => {
        const isActive = activeItem === item;
        return (
          <motion.button
            key={item.name}
            initial={{ opacity: 0, x: 100 }} // start completely off-screen left
            animate={{ opacity: 1, x: 0 }} // slide into position
            exit={{ opacity: 0, x: 100 }} // slide back out to the left
            transition={{ duration: 1.0, ease: "easeInOut" }}
            whileHover={{
              opacity: 1, // On hover, make the text fully visible
              scale: 1.2, // Slightly scale up the text
            }}
            onClick={() => setIndex(items.indexOf(item))}
            className={`group flex items-center gap-4 ${
              isActive ? "" : "text-white/40 hover:text-white"
            }`}
            style={{ color: isActive ? color : undefined }}
          >
            {/* Item Name */}
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1.0 : 0.7,
              }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className={`font-black uppercase tracking-widest ${
                isActive
                  ? "opacity-100 scale-100 text-[10px] md:text-[12px]"
                  : " opacity-100 scale-100 text-[12px] md:text-[14px]"
              }`}
              style={{ color: switchTextColor(color) }}
            >
              {item.name}
            </motion.span>

            <motion.div
              initial={{ width: 32 }} // corresponds to w-8 (8*4px)
              animate={{ width: activeItem === item ? 64 : 32 }} // 64px = w-16
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative h-1 bg-white/10 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  initial={false}
                  animate={{
                    width: activeItem === item ? "100%" : "0%",
                  }}
                  className="absolute inset-0"
                  // style={{ backgroundColor: getContrastTextColor(color) }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
};
