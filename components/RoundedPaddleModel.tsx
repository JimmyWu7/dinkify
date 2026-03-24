"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";

interface RoundedpaddleModelProps {
  scale?: number;
  color?: string;
}

export const RoundedPaddleModel = ({
  scale,
  color = "#d4ff00",
}: RoundedpaddleModelProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const { viewport } = useThree();
  const base = Math.min(viewport.width, viewport.height);
  const responsiveScale = Math.min(Math.max(base / 5, 0.5), 1.2);

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

  const zapGeometry = useMemo(() => {
    const loader = new SVGLoader();
    const svgData = loader.parse(`
      <svg viewBox="0 0 24 24">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
      </svg>
    `);

    // Convert paths to shapes
    const shapes = svgData.paths.flatMap((p) => p.toShapes(true));
    // Create geometry
    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 0.02,
      bevelEnabled: false,
    });

    // Flip Y axis by scaling geometry
    geometry.scale(1, -1, 1);

    // Center geometry so it’s easier to position
    geometry.center();

    return geometry;
  }, []);

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
      <group
        ref={groupRef}
        position={[0, 0.25, 0]}
        scale={scale ?? responsiveScale}
      >
        {/* Main Paddle Face */}
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[paddleShape, extrudeSettings]} />
          {/* Front and Back Faces */}
          <meshStandardMaterial
            attach="material-0"
            color="#222222"
            roughness={0.3}
            metalness={0.8}
          />

          {/* The Border */}
          <meshStandardMaterial
            attach="material-1"
            color={color}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>

        {/* Design: Center Stripe */}
        {/* <mesh position={[0, 0, 0.13]} renderOrder={1}>
          <planeGeometry args={[0.175, 2.5]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh> */}

        {/* Zap logo on Paddle */}
        <mesh geometry={zapGeometry} position={[0, -0.85, 0.15]} scale={0.005}>
          <meshStandardMaterial color="#222222" emissiveIntensity={1.5} />
        </mesh>

        {/* Design: Logo Circle */}
        <mesh position={[0, -0.85, 0.14]} renderOrder={2}>
          <circleGeometry args={[0.1, 32]} />
          <meshStandardMaterial
            color={color}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>

        {/* Handle */}
        <mesh position={[0, -1.8, 0.05]}>
          <cylinderGeometry args={[0.15, 0.18, 1.2, 32]} />
          <meshStandardMaterial color="#222222" roughness={0.8} />
        </mesh>

        {/* Zap logo on Handle Bottom */}
        <mesh
          geometry={zapGeometry}
          position={[0, -2.4, 0.05]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <meshStandardMaterial
            color={color}
            emissiveIntensity={1.5}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>

        {/* Handle Wrap Design */}
        <mesh position={[0, -1.8, 0.05]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.19, 1.2, 32]} />
          <meshBasicMaterial
            color={new THREE.Color(color).multiplyScalar(0.3)}
            wireframe
            opacity={0.2}
            transparent
          />
        </mesh>
      </group>
    </Float>
  );
};
