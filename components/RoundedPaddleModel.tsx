"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface RoundedpaddleModelProps {
  scale?: number;
  color?: number;
}

export const RoundedPaddleModel = ({
  scale = 1,
  color = 0xd4ff00,
}: RoundedpaddleModelProps) => {
  const groupRef = useRef<THREE.Group>(null);

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
      // We'll keep some gentle floating/rotation here,
      // but the main rotation will be handled by OrbitControls in the parent
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      groupRef.current.rotation.z = Math.cos(t * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={[0, 0.50, 0]} scale={scale}>
        {/* Main Paddle Face */}
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[paddleShape, extrudeSettings]} />
          <meshStandardMaterial color="#111" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Design: Center Stripe */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.2, 2.5]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Design: Logo Circle */}
        <mesh position={[0, 0.5, 0.07]}>
          <circleGeometry args={[0.3, 32]} />
          <meshStandardMaterial color={color} />
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
            color={color}
            wireframe
            opacity={0.2}
            transparent
          />
        </mesh>
      </group>
    </Float>
  );
};
