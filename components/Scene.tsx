import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { PickleballModel } from "./PickleballModel";
import { RoundedPaddleModel } from "./RoundedPaddleModel";
import { SetModel } from "./SetModel";

interface SceneProps {
  activeComponent: "Ball" | "Paddle" | "Set";
  color: string;
}

export const Scene = ({ activeComponent, color }: SceneProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeComponent}
        initial={{ opacity: 0, y: -100 }} // start completely off-screen left
        animate={{ opacity: 1, y: 0 }} // slide into position
        exit={{ opacity: 0, y: -100 }} // slide back out to the left
        transition={{ duration: 1.0, ease: "easeInOut" }}
        id="model-container"
        className="max-w-[80vw] lg:max-w-none h-full sm:max-h-[55vh] lg:max-h-[65vh] aspect-3/3.5 md:aspect-square"
      >
        <Canvas
          shadows
          className=" w-full h-full touch-none"
          camera={{ fov: 20, position: [0, 0, 7] }}
        >
          {/* Soft environment reflections */}
          <Environment preset="city" />

          {/* Ambient light (base) */}
          <ambientLight intensity={0.3} />

          {/* Key light (main light) */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Fill light */}
          <directionalLight position={[-5, 2, 3]} intensity={0.4} />

          {/* Rim light */}
          <directionalLight position={[0, 5, -5]} intensity={1} color={color} />

          {/* Ground shadow */}
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={4}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
          />

          <AnimatePresence mode="wait">
            {activeComponent === "Ball" && (
              <group key="pickleball">
                <PickleballModel color={color} />
              </group>
            )}
            {activeComponent === "Paddle" && (
              <group key="paddle">
                <RoundedPaddleModel color={color} />
              </group>
            )}
            {activeComponent === "Set" && (
              <group key="set">
                <SetModel color={color} />
              </group>
            )}
          </AnimatePresence>
        </Canvas>
      </motion.div>
    </AnimatePresence>
  );
};
