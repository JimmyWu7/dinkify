"use client";

import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Center, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

interface PickleballModelProps {
  scale?: number;
  position?: [number, number, number];
  color?: string;
  onLoaded?: () => void;
}

export const PickleballModel = ({
  scale,
  position = [0, 0, 0],
  color = "#d4ff00",
  onLoaded,
}: PickleballModelProps) => {
  const model = useLoader(
    GLTFLoader,
    "/models/Pickleball-Model-Textureless.glb",
  );

  const { viewport } = useThree();
  const base = Math.min(viewport.width, viewport.height);
  const responsiveScale = Math.min(Math.max(base / 2.25, 0.6), 1.0);

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
    <Float speed={2} rotationIntensity={1} floatIntensity={0}>
      <group position={position} scale={scale ?? responsiveScale}>
        {/* <Center position={position}> */}
        <primitive object={model.scene.clone()} />
        {/* </Center> */}
      </group>
    </Float>
  );
};
