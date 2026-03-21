"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import * as THREE from "three";
import gsap from "gsap";

interface ModelControlsProps {
  groupRef: React.RefObject<THREE.Group | null>;
  activeItem: "Pickleball" | "Paddle" | "Set";
  viewMode: "main" | "details";
}

export const ModelControls = ({
  groupRef,
  activeItem,
  viewMode,
}: ModelControlsProps) => {
  const { gl } = useThree(); // 👈 access canvas
  const rotation = useRef({ x: 0, y: 0 });
  const last = useRef({ x: 0, y: 0 });

  // Reset rotation whenever activeItem changes or viewMode changes
  useEffect(() => {
    rotation.current = { x: 0, y: 0 };
    last.current = { x: 0, y: 0 };
    if (groupRef.current) {
      // Smoothly reset the actual 3D object's rotation
      gsap.to(groupRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.3, // smooth reset
        ease: "power3.out",
      });
    }
  }, [activeItem, viewMode, groupRef]);

  useGesture(
    {
      onDrag: ({ movement: [mx, my], first, last: isLast }) => {
        if (!groupRef.current) return;

        // When a new drag starts, store the starting rotation
        if (first) {
          last.current = { ...rotation.current };
        }
        // Apply delta relative to where the last drag ended
        const currentX = rotation.current.x;

        // Check if object is upside down
        const isUpsideDown = Math.cos(currentX) < 0;

        // Flip horizontal rotation direction if upside down
        const direction = isUpsideDown ? -1 : 1;

        rotation.current.y =
          last.current.y + direction * (mx / window.innerWidth) * Math.PI * 2;

        rotation.current.x =
          last.current.x + (my / window.innerHeight) * Math.PI * 0.5;
      },

      onPinch: ({ offset: [d] }) => {
        if (!groupRef.current) return;

        const scale = THREE.MathUtils.clamp(1 + d / 200, 0.5, 2);

        gsap.to(groupRef.current.scale, {
          x: scale,
          y: scale,
          z: scale,
          duration: 0.3,
          ease: "power3.out",
        });
      },
    },
    {
      target: gl.domElement,
      eventOptions: { passive: false },
    },
  );

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      rotation.current.x,
      0.1,
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotation.current.y,
      0.1,
    );
  });

  return null;
};
