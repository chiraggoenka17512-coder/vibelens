"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { CityDistrict } from "../../lib/city/types";

interface DistrictMeshProps {
  district: CityDistrict;
  isSelected?: boolean;
  onSelectDistrict?: (districtId: string) => void;
}

export function DistrictMesh({
  district,
  isSelected = false,
  onSelectDistrict,
}: DistrictMeshProps) {
  const posX = district.x + district.width / 2;
  const posZ = district.z + district.depth / 2;

  const groundGeom = useMemo(() => {
    return new THREE.BoxGeometry(district.width, 0.4, district.depth);
  }, [district.width, district.depth]);

  const edgesGeom = useMemo(() => {
    return new THREE.EdgesGeometry(groundGeom);
  }, [groundGeom]);

  const hasVulnerable = district.states.includes("vulnerable");
  const hasConstruction = district.states.includes("under-construction");

  return (
    <group position={[posX, -0.2, posZ]}>
      {/* District Ground Base Tile */}
      <mesh
        geometry={groundGeom}
        onClick={(e) => {
          e.stopPropagation();
          onSelectDistrict?.(district.id);
        }}
      >
        <meshStandardMaterial
          color="#09090b"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* District Boundary Hairline CAD Wireframe */}
      <lineSegments geometry={edgesGeom}>
        <lineBasicMaterial
          color={
            isSelected
              ? "#06b6d4"
              : hasVulnerable
              ? "#ef4444"
              : hasConstruction
              ? "#f59e0b"
              : "rgba(255, 255, 255, 0.15)"
          }
          linewidth={isSelected ? 2 : 1}
        />
      </lineSegments>
    </group>
  );
}
