"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedPaddleModel } from "./RoundedPaddleModel";
import { PickleballModel } from "./PickleballModel";

export const SetModel = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle rotation for the set
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
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
