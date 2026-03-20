"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedPaddleModel } from "./RoundedPaddleModel";
import { PickleballModel } from "./PickleballModel";

interface SetModelProps {
  scale?: number;
  color?: number;
}

export const SetModel = ({ scale = 1, color = 0xd4ff00 }: SetModelProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle rotation for the set
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <group position={[-1, 0, 0]} rotation={[0, 0.5, 0.2]}>
        <RoundedPaddleModel scale={scale} />
      </group>
      <group position={[1, 0, 0.5]}>
        <PickleballModel scale={scale * 0.7} />
      </group>
    </group>
  );
};
