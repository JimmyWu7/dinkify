"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import { PickleballModel } from "@/components/PickleballModel";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { RoundedPaddleModel } from "@/components/RoundedPaddleModel";
import { SetModel } from "@/components/SetModel";
import { prices } from "@/constants";
import { ChevronRight } from "lucide-react";
import { Scene } from "@/components/Scene";
import { BackgroundText } from "@/components/BackgroundText";
import { ItemSelector } from "@/components/ItemSelector";
import { useScrollIndex } from "@/hooks/use-scroll";
import { ItemDetailsPanel } from "@/components/ItemDetailsPanel";
import CustomizePanel from "@/components/CustomizePanel";
import { switchTextColor } from "@/utils/color";

export default function Page() {
  type Item = {
    name: string;
    component: "Ball" | "Paddle" | "Set";
  };

  const items: Item[] = [
    { name: "VOLT", component: "Ball" },
    { name: "BLADE", component: "Paddle" },
    { name: "CORE", component: "Set" },
  ];
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const isScrollDisabled = isDetailsOpen || isCustomizeOpen;
  const [index, setIndex] = useScrollIndex(items.length, 800, isScrollDisabled);

  const activeItem = items[index];
  const [themeColor, setThemeColor] = useState("#d4ff00");

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <header>
        <Navbar
          themeColor={themeColor}
          onCustomizeClick={() => setIsCustomizeOpen(true)}
        />
      </header>

      <main className="flex flex-1">
        <section className="flex flex-col flex-1 items-center justify-between w-full">
          <div className="w-full mt-24 flex flex-col flex-1 md:justify-center">
            {/* Wrapper for positioning */}
            <div className="h-full relative flex items-center justify-center">
              {/* Background text (desktop only) */}
              <BackgroundText
                text={activeItem.name}
                color={themeColor}
                isDesktop={true}
              />

              {/* 3D Model */}
              <Scene
                activeComponent={activeItem.component}
                color={themeColor}
              />
            </div>

            {/* Mobile text (below model) */}
            <BackgroundText
              text={activeItem.name}
              color={themeColor}
              isDesktop={false}
            />
          </div>

          {/* Pricing / Customize Button */}
          <div className="w-full flex flex-col md:flex-row justify-between p-2 md:p-6">
            {/* Pricing */}
            <div className="p-2 order-1 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${activeItem.component}`}
                  initial={{ opacity: 0, x: -50 }} // start completely off-screen left
                  animate={{ opacity: 1, x: 0 }} // slide into position
                  exit={{ opacity: 0, x: -50 }} // slide back out to the left
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className=""
                >
                  <p
                    className="text-xs font-bold uppercase tracking-[0.3em] mb-2"
                    style={{ color: switchTextColor(themeColor) }}
                  >
                    Premium Gear
                  </p>
                  <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 text-white">
                    {activeItem.name}
                  </h2>
                  <motion.button
                    onClick={() => setIsDetailsOpen(true)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-xs mb-2 uppercase tracking-[0.3em] text-white/50 hover:text-white transition cursor-pointer"
                  >
                    View Details <ChevronRight size={14} />
                  </motion.button>
                  <div className="flex items-center gap-4 text-white">
                    <span className="text-2xl font-mono font-bold">
                      {prices[activeItem.component]}
                    </span>
                    <span className="h-px w-12 bg-white/20" />
                    <span className="flex flex-col gap-1 text-xs text-white/40 uppercase tracking-widest">
                      {activeItem.component === "Ball" && (
                        <span>Pack of 4 Balls</span>
                      )}
                      <span>Limited Edition</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Customize Button */}
            <div className="w-full flex justify-center items-center py-4 order-3 md:order-2">
              <motion.button
                onClick={() => setIsCustomizeOpen(true)}
                whileHover={{
                  backgroundColor: switchTextColor(themeColor),
                  color: "#000000",
                  scale: 1.05,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                whileTap={{ scale: 0.95 }}
                className="z-20 flex items-center justify-center gap-3 border border-white/20 bg-white/5 backdrop-blur-sm text-white px-10 py-5 rounded-full font-black uppercase tracking-tighter cursor-pointer"
              >
                Customize Now <ChevronRight size={20} />
              </motion.button>
            </div>

            {/* Item Selector */}
            <ItemSelector
              items={items}
              activeItem={activeItem}
              setIndex={setIndex}
              color={themeColor}
            />
          </div>
          {/* Decorative Background Elements */}
          <div className="fixed inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-10"
              style={{
                background: `radial-gradient(circle at center, ${themeColor} 0%, transparent 70%)`,
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4ff00]/5 rounded-full blur-[150px]" />
          </div>

          {/* Details Panel */}
          <ItemDetailsPanel
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            item={activeItem}
            color={themeColor}
          />

          {/* Customize Panel */}
          <CustomizePanel
            isOpen={isCustomizeOpen}
            onClose={() => setIsCustomizeOpen(false)}
            setThemeColor={setThemeColor}
            currentThemeColor={themeColor}
          />
        </section>
      </main>
    </div>
  );
}
