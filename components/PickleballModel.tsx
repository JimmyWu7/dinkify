"use client";

import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface PickleballModelProps {
  scale?: number;
  color?: number;
}

export const PickleballModel = ({
  scale = 1,
  color = 0xd4ff00,
}: PickleballModelProps) => {
  const model = useLoader(GLTFLoader, "/models/Pickleball-Model.glb");

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
  }, [model, color]);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={[0, 0, 0]} scale={scale}>
        <primitive object={model.scene} scale={[1.5, 1.5, 1.5]} />
      </group>
    </Float>
  );
};
