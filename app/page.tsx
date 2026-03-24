"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PickleballModel } from "@/components/PickleballModel";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { RoundedPaddleModel } from "@/components/RoundedPaddleModel";
import { SetModel } from "@/components/SetModel";
import { prices } from "@/constants";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { Scene } from "@/components/Scene";
import { BackgroundText } from "@/components/BackgroundText";
import { ItemSelector } from "@/components/ItemSelector";
import { useScrollIndex } from "@/hooks/use-scroll";
import { ItemDetailsPanel } from "@/components/ItemDetailsPanel";
import { CustomizePanel } from "@/components/CustomizePanel";
import { switchTextColor } from "@/utils/color";
import { CartPanel } from "@/components/CartPanel";

interface CartItem {
  id: string;
  name: string;
  price: number;
  component: "Ball" | "Paddle" | "Set";
  color: string;
  quantity: number;
}

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
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isScrollDisabled = isDetailsOpen || isCustomizeOpen || isCartOpen;
  const [index, setIndex] = useScrollIndex(items.length, 800, isScrollDisabled);

  const activeItem = items[index];
  const [themeColor, setThemeColor] = useState("#d4ff00");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [flyingItem, setFlyingItem] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color: string;
  } | null>(null);

  const [modelScreenPos, setModelScreenPos] = useState({ x: 0, y: 0 });

  const addToCart = (e: React.MouseEvent) => {
    const cartEl = document.getElementById("cart-button");
    if (!cartEl) return;

    const cartRect = cartEl.getBoundingClientRect();
    const getModelPos = (window as any).__getModelScreenPosition;
    const modelPos = getModelPos ? getModelPos() : null;

    const startX = modelPos?.x ?? window.innerWidth / 2;
    const startY = modelPos?.y ?? window.innerHeight / 2;

    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2;

    setFlyingItem({
      startX,
      startY,
      endX,
      endY,
      color: themeColor,
    });

    const price = parseFloat(prices[activeItem.component].replace("$", ""));
    const newItem: CartItem = {
      id: `${activeItem.name}-${themeColor}-${Date.now()}`,
      name: activeItem.name,
      price,
      component: activeItem.component,
      color: themeColor,
      quantity: 1,
    };

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.name === newItem.name && item.color === newItem.color,
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, newItem];
    });

    // Reset flying item after animation
    setTimeout(() => setFlyingItem(null), 800);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <header>
        <Navbar
          themeColor={themeColor}
          onCustomizeClick={() => setIsCustomizeOpen(true)}
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
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
                onModelScreenPosition={setModelScreenPos}
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
            <div className="w-full flex justify-center items-center gap-4 py-4 order-3 md:order-2">
              <motion.button
                onClick={() => setIsCustomizeOpen(true)}
                whileHover={{
                  backgroundColor: switchTextColor(themeColor),
                  color: "#000000",
                  scale: 1.05,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                whileTap={{ scale: 0.95 }}
                className="z-20 flex items-center justify-center gap-2 md:gap-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white text-xs px-4 lg:px-10 py-2 lg:py-5 rounded-xl lg:rounded-full font-black uppercase tracking-tighter cursor-pointer"
              >
                Customize Now <ChevronRight size={20} />
              </motion.button>
              <motion.button
                id="bag-button"
                onClick={addToCart}
                whileHover={{
                  scale: 1.05,
                }}
                style={{
                  backgroundColor:
                    themeColor === "#000000" ? "#FFFFFF" : themeColor,
                  color: themeColor === "#FFFFFF" ? "#000000" : "#000000",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                whileTap={{ scale: 0.95 }}
                className="z-20 text-sm flex items-center justify-center gap-2 md:gap-4 backdrop-blur-sm px-4 lg:px-10 py-2 lg:py-5 rounded-full font-black uppercase tracking-tighter cursor-pointer border border-white/10"
              >
                Add to Bag
                <ShoppingBag size={20} />
              </motion.button>
            </div>

            {/* Item Selector */}
            <ItemSelector
              items={items}
              activeItem={activeItem}
              setIndex={setIndex}
              color={themeColor}
            />

            {/* Flying Item Animation */}
            <AnimatePresence>
              {flyingItem && (
                <motion.div
                  className="fixed pointer-events-none z-200"
                  style={{
                    width: 120,
                    height: 120,
                  }}
                  initial={{
                    left: flyingItem.startX,
                    top: flyingItem.startY,
                    scale: 1,
                    opacity: 1,
                  }}
                  animate={{
                    left: [flyingItem.startX, flyingItem.endX - 50],
                    top: [flyingItem.startY, flyingItem.endY - 50],
                    scale: [1, 0.4],
                    opacity: [1, 0.4],
                    rotate: 25,
                  }}
                  transition={{
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Canvas camera={{ fov: 20, position: [0, 0, 7] }}>
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[5, 5, 5]} intensity={1.2} />

                    {activeItem.component === "Ball" && (
                      <PickleballModel color={flyingItem.color} />
                    )}
                    {activeItem.component === "Paddle" && (
                      <RoundedPaddleModel color={flyingItem.color} />
                    )}
                    {activeItem.component === "Set" && (
                      <SetModel color={flyingItem.color} />
                    )}
                  </Canvas>
                </motion.div>
              )}
            </AnimatePresence>
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

          {/* Cart Panel */}
          <CartPanel
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            themeColor={themeColor}
          />
        </section>
      </main>
    </div>
  );
}
