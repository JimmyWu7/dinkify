import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PickleballModel } from "./PickleballModel";
import { RoundedPaddleModel } from "./RoundedPaddleModel";
import { SetModel } from "./SetModel";

interface SceneProps {
  activeComponent: "Ball" | "Paddle" | "Set";
  color: string;
  onModelScreenPosition?: (pos: { x: number; y: number }) => void;
}

const ModelTracker = ({
  activeComponent,
  color,
  onModelScreenPosition,
}: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;

    const updatePosition = () => {
      const vector = new THREE.Vector3();
      groupRef.current!.getWorldPosition(vector);

      vector.project(camera);

      const canvas = document.querySelector("canvas");
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();

      const x = (vector.x * 0.5 + 0.5) * rect.width + rect.left;

      const y = (-(vector.y * 0.5) + 0.5) * rect.height + rect.top;

      return { x, y };
    };

    // store function on window (quick + clean for now)
    (window as any).__getModelScreenPosition = updatePosition;
  }, [camera, size, activeComponent]);

  return (
    <group ref={groupRef}>
      {activeComponent === "Ball" && <PickleballModel color={color} />}
      {activeComponent === "Paddle" && <RoundedPaddleModel color={color} />}
      {activeComponent === "Set" && <SetModel color={color} />}
    </group>
  );
};

export const Scene = ({
  activeComponent,
  color,
  onModelScreenPosition,
}: SceneProps) => {
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

          <ModelTracker
            activeComponent={activeComponent}
            color={color}
            onModelScreenPosition={onModelScreenPosition}
          />
        </Canvas>
      </motion.div>
    </AnimatePresence>
  );
};
