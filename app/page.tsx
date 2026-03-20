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

export default function Page() {
  const [activeItem, setActiveItem] = useState<"Pickleball" | "Paddle" | "Set">(
    "Pickleball",
  );
  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<THREE.Group>(null);

  const prices = {
    Pickleball: "$12.00",
    Paddle: "$149.00",
    Set: "$299.00",
  };

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" },
      );
    }
    if (groupRef.current) {
      gsap.fromTo(
        groupRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 0.8, ease: "circ.out" },
      );
    }
  }, [activeItem]);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black selection:bg-[#d4ff00] selection:text-black"
    >
      <Navbar />

      {/* Background Text - Centered and Huge */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1
          ref={titleRef}
          className="text-[20vw] md:text-[25vw] font-black uppercase italic tracking-tighter leading-none opacity-10 select-none"
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
        </h1>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* 3D Canvas Container - Centered */}
        <div className="w-full h-screen">
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
              <pointLight position={[-5, -5, -5]} intensity={1} />
            </PerspectiveCamera>

            {/* Ambient Light */}
            <ambientLight intensity={0.4} />

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

            <AnimatePresence mode="wait">
              <group
                ref={groupRef}
                onPointerOver={() => setIsHovered(true)}
                onPointerOut={() => setIsHovered(false)}
              >
                {activeItem === "Pickleball" && <PickleballModel />}
                {activeItem === "Paddle" && <RoundedPaddleModel />}
                {activeItem === "Set" && <SetModel />}
              </group>
            </AnimatePresence>

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
              autoRotate={isHovered} // Only rotate when hovered
              autoRotateSpeed={2}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>

        {/* Pricing & Item Info */}
        <motion.div
          key={`info-${activeItem}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
              onClick={() => setActiveItem(item)}
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
          className="absolute bottom-12 z-20 flex items-center gap-3 border border-white/20 bg-white/5 backdrop-blur-sm text-white px-10 py-5 rounded-full font-black uppercase tracking-tighter transition-all"
        >
          Customize Now <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,255,0,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4ff00]/5 rounded-full blur-[150px]" />
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap");

        body {
          background-color: #000;
        }

        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(212, 255, 0, 0.1);
        }
      `}</style>
    </main>
  );
}
