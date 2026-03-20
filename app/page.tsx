"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, ChevronRight, Zap } from "lucide-react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

import { Navbar } from "@/components/Navbar";
import { PickleballModel } from "@/components/PickleballModel";
import { RoundedPaddleModel } from "@/components/RoundedPaddleModel";
import { SetModel } from "@/components/SetModel";
import { prices } from "@/constants";
import { useBreakpoint } from "@/hooks/use-mobile";

export default function Page() {
  const [activeItem, setActiveItem] = useState<"Pickleball" | "Paddle" | "Set">(
    "Pickleball",
  );
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<THREE.Group>(null);

  const scales = {
    Pickleball: { sm: 1, md: 1.2, lg: 1.3, xl: 1.5 },
    Paddle: { sm: 0.6, md: 0.8, lg: 1, xl: 1 },
    Set: { sm: 0.5, md: 0.7, lg: 0.9, xl: 1 },
  };
  const breakpoint = useBreakpoint();
  const currentScale = scales[activeItem][breakpoint];
  const items = ["Pickleball", "Paddle", "Set"] as const;
  const [index, setIndex] = useState(0);
  const isAnimating = useRef(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    setActiveItem(items[index]);

    const timeout = setTimeout(() => {
      isAnimating.current = false;
    }, 900); // match animation duration

    return () => clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isAnimating.current) return;

      if (e.deltaY > 0 && index < items.length - 1) {
        isAnimating.current = true;
        setIndex((prev) => prev + 1);
      }

      if (e.deltaY < 0 && index > 0) {
        isAnimating.current = true;
        setIndex((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: true });

    return () => window.removeEventListener("wheel", handleScroll);
  }, [index]);

  useEffect(() => {
    if (!groupRef.current || !modelLoaded) return;

    const tl = gsap.timeline();

    // Reset instantly
    tl.set(groupRef.current.position, {
      y: 2,
    });

    // Enter animation
    tl.to(groupRef.current.position, {
      y: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, [activeItem, modelLoaded]);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black selection:bg-[#d4ff00] selection:text-black"
    >
      <Navbar />

      {/* Background Text - Centered and Huge */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.h1
          key={activeItem}
          ref={titleRef}
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 1.2 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-[20vw] md:text-[25vw] font-black uppercase italic tracking-tighter leading-none  select-none"
          style={{
            WebkitTextStroke: "2px rgba(212,255,0,0.2)",
            color: "transparent",
          }}
        >
          {activeItem === "Pickleball"
            ? "VOLT"
            : activeItem === "Paddle"
              ? "BLADE"
              : "CORE"}
        </motion.h1>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* 3D Canvas Container - Centered */}
        <div className="w-full max-w-4xl h-screen">
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40}>
              {/* Main Spotlight focused on the pickleball */}
              <spotLight
                position={[5, 5, 5]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                castShadow
              />
              <pointLight position={[0, 2, -8]} intensity={4} color="white" />
            </PerspectiveCamera>

            {/* Ambient Light */}
            <ambientLight intensity={0.5} />

            {/* Main Spotlight focused on the scene center */}
            <spotLight
              position={[0, 10, 0]}
              angle={Math.PI / 8}
              penumbra={1}
              intensity={3}
              castShadow
              color="#ffffff"
            />

            <Environment preset="night" />

            <group ref={groupRef}>
              {activeItem === "Pickleball" && (
                <PickleballModel
                  scale={currentScale}
                  onLoaded={() => setModelLoaded(true)}
                />
              )}
              {activeItem === "Paddle" && (
                <RoundedPaddleModel scale={currentScale} />
              )}
              {activeItem === "Set" && <SetModel scale={currentScale} />}
            </group>

            <ContactShadows
              position={[0, -3, 0]}
              opacity={0.4}
              scale={10}
              blur={2}
              far={4.5}
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={true}
              autoRotateSpeed={2}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>

        {/* Pricing & Item Info */}
        <motion.div
          key={`info-${activeItem}`}
          initial={{ opacity: 0, x: "-100vw" }} // start completely off-screen left
          animate={{ opacity: 1, x: 0 }} // slide into position
          exit={{ opacity: 0, x: "-100vw" }} // slide back out to the left
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute left-8 bottom-32 md:left-12 md:bottom-12 z-20"
        >
          <p className="text-[#d4ff00] text-xs font-bold uppercase tracking-[0.3em] mb-2">
            Premium Gear
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 text-white">
            {activeItem}
          </h2>
          <div className="flex items-center gap-4 text-white">
            <span className="text-2xl font-mono font-bold">
              {prices[activeItem]}
            </span>
            <span className="h-px w-12 bg-white/20" />
            <span className="text-xs text-white/40 uppercase tracking-widest">
              Limited Edition
            </span>
          </div>
        </motion.div>

        {/* Item Selector */}
        <div className="absolute right-8 bottom-32 md:right-12 md:bottom-12 z-20 flex flex-col gap-4 items-end">
          {(["Pickleball", "Paddle", "Set"] as const).map((item) => (
            <button
              key={item}
              onClick={() => {
                const i = items.indexOf(item);
                setIndex(i);
              }}
              className={`group flex items-center gap-4 transition-all duration-300 ${
                activeItem === item
                  ? "text-[#d4ff00]"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <span
                className={`text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeItem === item
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {item}
              </span>
              <div
                className={`w-12 h-1 transition-all ${
                  activeItem === item ? "bg-[#d4ff00] w-16" : "bg-white/10 w-8"
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "#d4ff00",
            color: "#000",
          }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-12 z-20 flex items-center gap-3 border border-white/20 bg-white/5 backdrop-blur-sm text-white px-10 py-5 rounded-full font-black uppercase tracking-tighter cursor-pointer"
        >
          Customize Now <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,255,0,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4ff00]/5 rounded-full blur-[150px]" />
      </div>
    </main>
  );
}
