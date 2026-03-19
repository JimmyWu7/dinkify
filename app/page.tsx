"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, ChevronRight, Zap } from "lucide-react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  ContactShadows,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// --- 3D Components ---

const PickleballModel = ({
  scale = 1,
  color = 0xd4ff00, // Default color for the pickleball
}: {
  scale?: number;
  color?: number;
}) => {
  // Load the .glb model
  const model = useLoader(GLTFLoader, "/models/Pickleball-Model.glb");

  useEffect(() => {
    model.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        if (
          mesh.material instanceof THREE.MeshStandardMaterial ||
          mesh.material instanceof THREE.MeshPhysicalMaterial
        ) {
          mesh.material.color.set(color); // This will blend the color with the texture
        }
      }
    });
  }, [model, color]);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={[0, 0, 0]} scale={scale}>
        <primitive object={model.scene} scale={[1.5, 1.5, 1.5]} />
      </group>
    </Float>
  );
};

const RoundedPaddleModel = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Create rounded rectangle shape
  const paddleShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = -0.9,
      y = -1.25,
      width = 1.8,
      height = 2.5,
      radius = 0.4;
    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width,
      y + height - radius,
    );
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);
    return shape;
  }, []);

  const extrudeSettings = {
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 5,
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.5;
      groupRef.current.rotation.z = Math.cos(t * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
      <group ref={groupRef} position={[0, 0.5, 0]}>
        {/* Main Paddle Face */}
        <mesh>
          <extrudeGeometry args={[paddleShape, extrudeSettings]} />
          <meshStandardMaterial color="#111" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Design: Center Stripe */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.2, 2.5]} />
          <meshStandardMaterial
            color="#d4ff00"
            emissive="#d4ff00"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Design: Logo Circle */}
        <mesh position={[0, 0.5, 0.07]}>
          <circleGeometry args={[0.3, 32]} />
          <meshStandardMaterial color="#d4ff00" />
        </mesh>

        {/* Handle */}
        <mesh position={[0, -1.8, 0.05]}>
          <cylinderGeometry args={[0.15, 0.18, 1.2, 32]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>

        {/* Handle Wrap Design */}
        <mesh position={[0, -1.8, 0.05]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.19, 1.2, 32]} />
          <meshBasicMaterial
            color="#d4ff00"
            wireframe
            opacity={0.2}
            transparent
          />
        </mesh>
      </group>
    </Float>
  );
};

const SetModel = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[-1.5, 0, 0]} rotation={[0, 0.5, 0.2]}>
        <RoundedPaddleModel />
      </group>
      <group position={[1.5, 0, 0.5]}>
        <PickleballModel scale={0.5} />
      </group>
    </group>
  );
};

// --- UI Components ---

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-10 h-10 bg-[#d4ff00] rounded-full flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(212,255,0,0.3)]">
          <Zap size={20} className="text-black fill-black" />
        </div>
        <span className="text-2xl font-black tracking-tighter uppercase italic group-hover:text-[#d4ff00] transition-colors">
          Dinkify
        </span>
      </div>

      <div className="hidden md:flex items-center gap-12">
        <a
          href="#"
          className="text-xs font-bold uppercase tracking-[0.2em] hover:text-[#d4ff00] transition-colors"
        >
          Customize
        </a>
        <a
          href="#"
          className="text-xs font-bold uppercase tracking-[0.2em] hover:text-[#d4ff00] transition-colors"
        >
          Contact
        </a>
      </div>

      <div className="flex items-center gap-6">
        <button className="hover:text-[#d4ff00] transition-colors">
          <User size={20} />
        </button>
        <button className="hover:text-[#d4ff00] transition-colors relative">
          <ShoppingCart size={20} />
          <span className="absolute -top-2 -right-2 bg-[#d4ff00] text-black text-[10px] font-black px-1.5 py-0.5 rounded-full">
            2
          </span>
        </button>
      </div>
    </motion.nav>
  );
};

export default function Page() {
  const [activeItem, setActiveItem] = useState<"Pickleball" | "Paddle" | "Set">(
    "Pickleball",
  );
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
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 8], fov: 40 }}
          >
            {/* Ambient Light */}
            <ambientLight intensity={0.4} />

            {/* Main Spotlight focused on the pickleball */}
            <spotLight
              position={[0, 5, 0]}
              angle={Math.PI / 8} // Adjust the spread of the spotlight
              penumbra={1} // Softens the spotlight's edge
              intensity={4} // Higher intensity to make the ball pop more
              // target={groupRef.current ?? undefined} // Make sure it targets the pickleball model
              castShadow
              color={new THREE.Color(1, 1, 1)} // White light
              target={groupRef.current ? groupRef.current : undefined} // Ensure the spotlight targets the pickleball
            />
            {/* Existing Lights */}
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1.5}
              castShadow
            />
            <pointLight position={[-2, 0, -2]} intensity={2.0} />
            <Environment preset="night" />

            <AnimatePresence mode="wait">
              <group ref={groupRef}>
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
              autoRotate
              autoRotateSpeed={0.5}
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
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            {activeItem}
          </h2>
          <div className="flex items-center gap-4">
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
