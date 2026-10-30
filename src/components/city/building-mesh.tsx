"use client";

import React, { useMemo, useState } from "react";
import * as THREE from "three";
import { CityBuilding } from "../../lib/city/types";
import { STATE_COLORS, resolveVisualOverlays } from "../../lib/city/states";

interface BuildingMeshProps {
  building: CityBuilding;
  isSelected?: boolean;
  isHovered?: boolean;
  showRooms?: boolean;
  onSelect?: (nodeId: string, functionId?: string) => void;
  onHover?: (nodeId: string | null) => void;
}

export function BuildingMesh({
  building,
  isSelected = false,
  isHovered = false,
  showRooms = true,
  onSelect,
  onHover,
}: BuildingMeshProps) {
  const [internalHover, setInternalHover] = useState(false);
  const activeHover = isHovered || internalHover;

  const overlays = useMemo(() => {
    return resolveVisualOverlays(building.activeStates);
  }, [building.activeStates]);

  const colorConfig = STATE_COLORS[building.primaryState] || STATE_COLORS.working;

  // Center position of the building box
  const posX = building.x + building.width / 2;
  const posY = building.height / 2;
  const posZ = building.z + building.depth / 2;

  // Building geometry edges for CAD blueprint styling
  const boxGeom = useMemo(() => {
    return new THREE.BoxGeometry(building.width, building.height, building.depth);
  }, [building.width, building.height, building.depth]);

  const edgesGeom = useMemo(() => {
    return new THREE.EdgesGeometry(boxGeom);
  }, [boxGeom]);

  // Scaffolding cage geometry (slightly larger than building)
  const scaffoldGeom = useMemo(() => {
    if (!overlays.hasScaffolding) return null;
    return new THREE.BoxGeometry(
      building.width + 0.8,
      building.height + 0.8,
      building.depth + 0.8
    );
  }, [overlays.hasScaffolding, building.width, building.height, building.depth]);

  const scaffoldEdges = useMemo(() => {
    if (!scaffoldGeom) return null;
    return new THREE.EdgesGeometry(scaffoldGeom);
  }, [scaffoldGeom]);

  return (
    <group position={[posX, 0, posZ]}>
      {/* 1. Base Building Solid Mesh */}
      <mesh
        position={[0, posY, 0]}
        geometry={boxGeom}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(building.nodeId);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setInternalHover(true);
          onHover?.(building.nodeId);
        }}
        onPointerOut={() => {
          setInternalHover(false);
          onHover?.(null);
        }}
      >
        <meshStandardMaterial
          color={overlays.isFloodedDark ? "#09090b" : colorConfig.base}
          roughness={0.7}
          metalness={0.2}
          transparent={overlays.isGhostDim}
          opacity={overlays.isGhostDim ? 0.35 : 1.0}
        />
      </mesh>

      {/* 2. CAD Blueprint Hairline Wireframe Edges */}
      <lineSegments position={[0, posY, 0]} geometry={edgesGeom}>
        <lineBasicMaterial
          color={
            isSelected
              ? "#06b6d4" // Cyan laser selection
              : activeHover
              ? "#ffffff"
              : overlays.isGhostDim
              ? "#3f3f46"
              : colorConfig.accent
          }
          linewidth={isSelected || activeHover ? 2 : 1}
        />
      </lineSegments>

      {/* 3. Vulnerable Flood Zone Overlay (Floor Perimeter & Hazard Base) */}
      {overlays.hasFloodZone && (
        <group position={[0, 0.05, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[building.width + 2.5, building.depth + 2.5]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0.35} />
          </mesh>
          <lineSegments>
            <edgesGeometry
              args={[new THREE.BoxGeometry(building.width + 2.5, 0.2, building.depth + 2.5)]}
            />
            <lineBasicMaterial color="#ef4444" />
          </lineSegments>
        </group>
      )}

      {/* 4. Under Construction Scaffolding Overlay (Amber Lattice Cage) */}
      {overlays.hasScaffolding && scaffoldEdges && (
        <lineSegments position={[0, posY, 0]} geometry={scaffoldEdges}>
          <lineBasicMaterial color="#f59e0b" linewidth={1.5} />
        </lineSegments>
      )}

      {/* 5. Function Blocks (Rooms) inside/atop building */}
      {showRooms &&
        building.rooms.map((room) => {
          // Local offset relative to building center
          const rLocalX = room.x - posX + room.width / 2;
          const rLocalZ = room.z - posZ + room.depth / 2;
          const rLocalY = building.height + room.height / 2;

          return (
            <mesh
              key={room.id}
              position={[rLocalX, rLocalY, rLocalZ]}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(building.nodeId, room.id);
              }}
            >
              <boxGeometry args={[room.width, room.height, room.depth]} />
              <meshStandardMaterial
                color={room.isVulnerable ? "#ef4444" : "#0284c7"}
                roughness={0.4}
                metalness={0.5}
              />
            </mesh>
          );
        })}
    </group>
  );
}
