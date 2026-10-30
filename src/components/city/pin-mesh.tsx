"use client";

import React, { useMemo, useState } from "react";
import * as THREE from "three";
import { ResolvedPin } from "../../lib/city/pins";

interface PinMeshProps {
  pin: ResolvedPin;
  isSelected?: boolean;
  onSelectPin?: (pinId: string) => void;
}

export function PinMesh({ pin, isSelected = false, onSelectPin }: PinMeshProps) {
  const [hovered, setHovered] = useState(false);

  // Octahedron marker for diamond CAD pin appearance
  const markerGeom = useMemo(() => {
    return new THREE.OctahedronGeometry(0.8, 0);
  }, []);

  const markerColor = pin.orphaned
    ? "#f59e0b" // Amber warning for orphaned
    : isSelected
    ? "#06b6d4" // Cyan selection
    : "#10b981"; // Emerald anchored pin

  return (
    <group position={[pin.x, pin.y, pin.z]}>
      {/* 1. Pin Head Diamond */}
      <mesh
        geometry={markerGeom}
        scale={isSelected || hovered ? [1.3, 1.6, 1.3] : [1, 1.3, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectPin?.(pin.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={isSelected || hovered ? 0.8 : 0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Anchor Stem connecting pin head to building roof */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0, 0, -1.2, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={markerColor} linewidth={2} />
      </line>

      {/* 3. Pulsing Orbit Ring for Orphaned Pins */}
      {pin.orphaned && (
        <lineLoop rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.25, 16]} />
          <lineBasicMaterial color="#f59e0b" />
        </lineLoop>
      )}
    </group>
  );
}
