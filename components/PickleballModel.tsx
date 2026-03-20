"use client";

import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface PickleballModelProps {
  scale?: number;
  color?: number;
  onLoaded?: () => void;
}

export const PickleballModel = ({
  scale = 1,
  color = 0xd4ff00,
  onLoaded,
}: PickleballModelProps) => {
  const model = useLoader(
    GLTFLoader,
    "/models/Pickleball-Model-Textureless.glb",
  );

  useEffect(() => {
    model.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (
          mesh.material instanceof THREE.MeshStandardMaterial ||
          mesh.material instanceof THREE.MeshPhysicalMaterial
        ) {
          mesh.material.color.set(color);
        }
      }
    });
    onLoaded?.();
  }, [model, color, onLoaded]);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={[0, 0, 0]} scale={scale}>
        <primitive object={model.scene} />
      </group>
    </Float>
  );
};

//! Google AI Studio + Prev code
// "use client";

// import { useState, useEffect, useRef, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingCart, User, Menu, X, ChevronRight, Zap } from "lucide-react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import {
//   OrbitControls,
//   PerspectiveCamera,
//   Environment,
//   ContactShadows,
//   useScroll,
//   ScrollControls,
// } from "@react-three/drei";
// import * as THREE from "three";
// import gsap from "gsap";

// import { Navbar } from "@/components/Navbar";
// import { PickleballModel } from "@/components/PickleballModel";
// import { RoundedPaddleModel } from "@/components/RoundedPaddleModel";
// import { SetModel } from "@/components/SetModel";
// import { itemDetails, prices } from "@/constants";

// export default function Page() {
//   const [activeItem, setActiveItem] = useState<"Pickleball" | "Paddle" | "Set">(
//     "Pickleball",
//   );
//   const [showInfo, setShowInfo] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const groupRef = useRef<THREE.Group>(null);

//   useEffect(() => {
//     if (titleRef.current) {
//       gsap.fromTo(
//         titleRef.current,
//         { y: 100, opacity: 0, scale: 0.8 },
//         { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" },
//       );
//     }
//     if (groupRef.current) {
//       gsap.fromTo(
//         groupRef.current.scale,
//         { x: 0, y: 0, z: 0 },
//         { x: 1, y: 1, z: 1, duration: 0.8, ease: "circ.out" },
//       );
//     }
//   }, [activeItem]);

//   return (
//     <main
//       ref={containerRef}
//       className="relative min-h-screen w-full overflow-hidden bg-black selection:bg-[#d4ff00] selection:text-black"
//     >
//       <Navbar />

//       {/* Background Text - Centered and Huge */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
//         <h1
//           ref={titleRef}
//           className="text-[20vw] md:text-[25vw] font-black uppercase italic tracking-tighter leading-none opacity-10 select-none"
//           style={{
//             WebkitTextStroke: "2px rgba(212,255,0,0.2)",
//             color: "transparent",
//           }}
//         >
//           {activeItem === "Pickleball"
//             ? "VOLT"
//             : activeItem === "Paddle"
//               ? "BLADE"
//               : "CORE"}
//         </h1>
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
//         {/* 3D Canvas Container - Centered */}
//         <div className="w-full h-screen">
//           <Canvas shadows dpr={[1, 2]}>
//             <ScrollControls pages={6} damping={0.2}>
//               <SceneContent
//                 activeItem={activeItem}
//                 setActiveItem={setActiveItem}
//                 setShowInfo={setShowInfo}
//                 setIsHovered={setIsHovered}
//                 groupRef={groupRef}
//               />
//             </ScrollControls>
//             {/* <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40}> */}
//             {/* Main Spotlight focused on the pickleball */}
//             {/* <spotLight
//                 position={[5, 5, 5]}
//                 angle={0.3}
//                 penumbra={1}
//                 intensity={2}
//                 castShadow
//               />
//               <pointLight position={[-5, -5, -5]} intensity={1} />
//             </PerspectiveCamera> */}

//             {/* Ambient Light */}
//             {/* <ambientLight intensity={0.5} /> */}

//             {/* Main Spotlight focused on the scene center */}
//             {/* <spotLight
//               position={[0, 10, 0]}
//               angle={Math.PI / 8}
//               penumbra={1}
//               intensity={3}
//               castShadow
//               color="#ffffff"
//             /> */}

//             {/* <Environment preset="night" /> */}

//             {/* <AnimatePresence mode="wait">
//               <group
//                 ref={groupRef}
//                 onPointerOver={() => setIsHovered(true)}
//                 onPointerOut={() => setIsHovered(false)}
//               >
//                 {activeItem === "Pickleball" && <PickleballModel />}
//                 {activeItem === "Paddle" && <RoundedPaddleModel />}
//                 {activeItem === "Set" && <SetModel />}
//               </group>
//             </AnimatePresence> */}

//             {/* <ContactShadows
//               position={[0, -3, 0]}
//               opacity={0.4}
//               scale={10}
//               blur={2}
//               far={4.5}
//             /> */}

//             {/* <OrbitControls
//               enableZoom={false}
//               enablePan={false}
//               autoRotate={true}
//               autoRotateSpeed={2}
//               maxPolarAngle={Math.PI / 2}
//               minPolarAngle={Math.PI / 2}
//             /> */}
//           </Canvas>
//         </div>

//         {/* Pricing & Item Info */}
//         <AnimatePresence mode="wait">
//           {!showInfo && (
//             <motion.div
//               key={`info-${activeItem}`}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="absolute left-8 bottom-32 md:left-12 md:bottom-12 z-20"
//             >
//               <p className="text-[#d4ff00] text-xs font-bold uppercase tracking-[0.3em] mb-2">
//                 Premium Gear
//               </p>
//               <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 text-white">
//                 {activeItem}
//               </h2>
//               <div className="flex items-center gap-4 text-white">
//                 <span className="text-2xl font-mono font-bold">
//                   {prices[activeItem]}
//                 </span>
//                 <span className="h-px w-12 bg-white/20" />
//                 <span className="text-xs text-white/40 uppercase tracking-widest">
//                   Limited Edition
//                 </span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Detailed Info Overlay */}
//         <AnimatePresence>
//           {showInfo && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
//             >
//               <div className="max-w-4xl w-full px-8 flex flex-col md:flex-row justify-between items-center gap-12">
//                 <div className="flex-1 pointer-events-auto">
//                   <motion.div
//                     initial={{ opacity: 0, x: -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <h3 className="text-[#d4ff00] text-sm font-black uppercase tracking-[0.5em] mb-6">
//                       Technical Specs
//                     </h3>
//                     <div className="space-y-8">
//                       <div>
//                         <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">
//                           Material
//                         </p>
//                         <p className="text-white text-xl font-bold uppercase">
//                           {itemDetails[activeItem].material}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">
//                           Dimensions
//                         </p>
//                         <p className="text-white text-xl font-bold uppercase">
//                           {itemDetails[activeItem].dimensions}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">
//                           Quality
//                         </p>
//                         <p className="text-white text-xl font-bold uppercase">
//                           {itemDetails[activeItem].quality}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>

//                 <div className="flex-1 text-right pointer-events-auto">
//                   <motion.div
//                     initial={{ opacity: 0, x: 50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 }}
//                   >
//                     <p className="text-white/60 text-lg md:text-2xl font-medium italic leading-relaxed">
//                       &quot;{itemDetails[activeItem].description}&quot;
//                     </p>
//                     <div className="mt-8 flex justify-end">
//                       <div className="h-px w-24 bg-[#d4ff00]" />
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
//           <span className="text-[10px] text-white uppercase tracking-[0.3em]">
//             Scroll to Explore
//           </span>
//           <div className="w-px h-12 bg-linear-to-b from-[#d4ff00] to-transparent" />
//         </div>

//         {/* Item Selector */}
//         <div className="absolute right-8 bottom-32 md:right-12 md:bottom-12 z-20 flex flex-col gap-4 items-end">
//           {(["Pickleball", "Paddle", "Set"] as const).map((item) => (
//             <div
//               key={item}
//               className={`group flex items-center gap-4 transition-all duration-300 ${
//                 activeItem === item
//                   ? "text-[#d4ff00]"
//                   : "text-white/40 hover:text-white"
//               }`}
//             >
//               <span
//                 className={`text-[10px] font-black uppercase tracking-widest transition-all ${
//                   activeItem === item ? "opacity-100" : "opacity-0"
//                 }`}
//               >
//                 {item}
//               </span>
//               <div
//                 className={`w-12 h-1 transition-all ${
//                   activeItem === item ? "bg-[#d4ff00] w-16" : "bg-white/10 w-8"
//                 }`}
//               />
//             </div>
//           ))}
//         </div>

//         {/* CTA Button */}
//         <motion.button
//           whileHover={{
//             scale: 1.05,
//             backgroundColor: "#d4ff00",
//             color: "#000",
//           }}
//           whileTap={{ scale: 0.95 }}
//           className="absolute bottom-12 right-12 md:right-auto md:left-1/2 md:-translate-x-1/2 z-20 flex items-center gap-3 border border-white/20 bg-white/5 backdrop-blur-sm text-white px-10 py-5 rounded-full font-black uppercase tracking-tighter cursor-pointer"
//         >
//           Customize Now <ChevronRight size={20} />
//         </motion.button>
//       </div>

//       {/* Decorative Background Elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,255,0,0.05)_0%,transparent_70%)]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4ff00]/5 rounded-full blur-[150px]" />
//       </div>

//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap");

//         body {
//           background-color: #000;
//           overflow-x: hidden;
//         }

//         .outline-text {
//           color: transparent;
//           -webkit-text-stroke: 1px rgba(212, 255, 0, 0.1);
//         }

//         canvas {
//           touch-action: none;
//         }
//       `}</style>
//     </main>
//   );
// }

// function SceneContent({
//   activeItem,
//   setActiveItem,
//   setShowInfo,
//   setIsHovered,
//   groupRef,
// }: {
//   activeItem: string;
//   setActiveItem: (item: "Pickleball" | "Paddle" | "Set") => void;
//   setShowInfo: (show: boolean) => void;
//   setIsHovered: (hovered: boolean) => void;
//   groupRef: React.RefObject<THREE.Group | null>;
// }) {
//   const scroll = useScroll();

//   useFrame((state) => {
//     const offset = scroll.offset;

//     // Determine active item and info state based on scroll
//     // 0 - 0.15: Pickleball Hero
//     // 0.15 - 0.35: Pickleball Info
//     // 0.35 - 0.50: Paddle Hero
//     // 0.50 - 0.70: Paddle Info
//     // 0.70 - 0.85: Set Hero
//     // 0.85 - 1.0: Set Info

//     if (offset < 0.35) {
//       if (activeItem !== "Pickleball") setActiveItem("Pickleball");
//       setShowInfo(offset > 0.15 && offset < 0.35);
//     } else if (offset < 0.7) {
//       if (activeItem !== "Paddle") setActiveItem("Paddle");
//       setShowInfo(offset > 0.5 && offset < 0.7);
//     } else {
//       if (activeItem !== "Set") setActiveItem("Set");
//       setShowInfo(offset > 0.85);
//     }

//     if (groupRef.current) {
//       // Unique animations for each item
//       if (activeItem === "Pickleball") {
//         // Pickleball: Move to side and rotate to show holes
//         const t = THREE.MathUtils.smoothstep(offset, 0.15, 0.35);
//         groupRef.current.position.x = THREE.MathUtils.lerp(0, 2, t);
//         groupRef.current.position.y = THREE.MathUtils.lerp(0, 0.5, t);
//         groupRef.current.rotation.y =
//           state.clock.getElapsedTime() * 0.5 + t * Math.PI;
//         groupRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.5, t));
//       } else if (activeItem === "Paddle") {
//         // Paddle: Slide in and tilt
//         const t = THREE.MathUtils.smoothstep(offset, 0.5, 0.7);
//         groupRef.current.position.x = THREE.MathUtils.lerp(0, -2, t);
//         groupRef.current.rotation.z = THREE.MathUtils.lerp(0, Math.PI / 6, t);
//         groupRef.current.rotation.y =
//           state.clock.getElapsedTime() * 0.5 + t * Math.PI * 0.5;
//         groupRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.2, t));
//       } else if (activeItem === "Set") {
//         // Set: Zoom in and center
//         const t = THREE.MathUtils.smoothstep(offset, 0.85, 1.0);
//         groupRef.current.position.z = THREE.MathUtils.lerp(0, 2, t);
//         groupRef.current.position.y = THREE.MathUtils.lerp(0, -0.5, t);
//         groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
//       }
//     }
//   });

//   return (
//     <>
//       <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40}>
//         <spotLight
//           position={[5, 5, 5]}
//           angle={0.3}
//           penumbra={1}
//           intensity={2}
//           castShadow
//         />
//         <pointLight position={[-5, -5, -5]} intensity={1} />
//       </PerspectiveCamera>

//       <ambientLight intensity={0.5} />

//       <spotLight
//         position={[0, 10, 0]}
//         angle={Math.PI / 8}
//         penumbra={1}
//         intensity={3}
//         castShadow
//         color="#ffffff"
//       />

//       <Environment preset="night" />

//       <group
//         ref={groupRef}
//         onPointerOver={() => setIsHovered(true)}
//         onPointerOut={() => setIsHovered(false)}
//       >
//         {activeItem === "Pickleball" && <PickleballModel />}
//         {activeItem === "Paddle" && <RoundedPaddleModel />}
//         {activeItem === "Set" && <SetModel />}
//       </group>

//       <ContactShadows
//         position={[0, -3, 0]}
//         opacity={0.4}
//         scale={10}
//         blur={2}
//         far={4.5}
//       />

//       <OrbitControls
//         enableZoom={false}
//         enablePan={false}
//         autoRotate={true}
//         autoRotateSpeed={2}
//         maxPolarAngle={Math.PI / 2}
//         minPolarAngle={Math.PI / 2}
//       />
//     </>
//   );
// }
