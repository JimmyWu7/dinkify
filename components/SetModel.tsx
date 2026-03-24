"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedPaddleModel } from "./RoundedPaddleModel";
import { PickleballModel } from "./PickleballModel";

interface SetModelProps {
  scale?: number;
  color?: string;
}

export const SetModel = ({ scale = 1, color = "#d4ff00" }: SetModelProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const { viewport } = useThree();
  const base = Math.min(viewport.width, viewport.height);
  const responsiveScale = Math.min(Math.max(base / 4, 0.5), 1.2);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle rotation for the set
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={responsiveScale}>
      {/* First Paddle */}
      <group position={[-1, 0, 0]} rotation={[0, 0.5, 0.2]}>
        <RoundedPaddleModel scale={0.8} color={color} />
      </group>
      {/* Second Paddle */}
      <group position={[1, 0, -0.3]} rotation={[0, -0.5, -0.1]}>
        <RoundedPaddleModel scale={0.8} color={color} />
      </group>
      {/* Balls */}
      <group position={[0, 0, 0]}>
        {/* <PickleballModel position={[0.25, 0, 0.8]} scale={0.7} /> */}
        <PickleballModel
          position={[-0.6, -0.3, 0.8]}
          scale={0.5}
          color={color}
        />
        <PickleballModel
          position={[0.8, -0.3, 0.8]}
          scale={0.5}
          color={color}
        />
        <PickleballModel
          position={[-0.4, 0.8, 1.2]}
          scale={0.5}
          color={color}
        />
        <PickleballModel position={[0.8, 0.8, 1.2]} scale={0.5} color={color} />
      </group>
    </group>
  );
};
