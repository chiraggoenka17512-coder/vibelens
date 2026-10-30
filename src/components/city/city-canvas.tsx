"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { CityLayout, CityBuilding, CityDistrict } from "../../lib/city/types";
import { ResolvedPin } from "../../lib/city/pins";
import { ReachabilityArc } from "../../lib/city/reachability";
import { BuildingMesh } from "./building-mesh";
import { DistrictMesh } from "./district-mesh";
import { PinMesh } from "./pin-mesh";
import { ReachabilityLaser } from "./reachability-laser";

interface CityCanvasProps {
  layout: CityLayout;
  pins: ResolvedPin[];
  reachabilityArcs: ReachabilityArc[];
  selectedNodeId: string | null;
  selectedPinId: string | null;
  focusedTarget?: [number, number, number] | null;
  onSelectBuilding: (nodeId: string, functionId?: string) => void;
  onSelectPin: (pinId: string) => void;
  onSelectDistrict: (districtId: string) => void;
}

function CameraFocusController({ target }: { target?: [number, number, number] | null }) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (target && controlsRef.current) {
      controlsRef.current.target.set(target[0], target[1], target[2]);
      camera.position.set(target[0] + 25, target[1] + 35, target[2] + 45);
      controlsRef.current.update();
    }
  }, [target, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={10}
      maxDistance={400}
      maxPolarAngle={Math.PI / 2 - 0.05} // Do not dip below ground
    />
  );
}

export function CityCanvas({
  layout,
  pins,
  reachabilityArcs,
  selectedNodeId,
  selectedPinId,
  focusedTarget,
  onSelectBuilding,
  onSelectPin,
  onSelectDistrict,
}: CityCanvasProps) {
  // Center camera on layout bounds
  const centerX = (layout.bounds.minX + layout.bounds.maxX) / 2 || 0;
  const centerZ = (layout.bounds.minZ + layout.bounds.maxZ) / 2 || 0;

  return (
    <div className="w-full h-full relative bg-[#060608]">
      <Canvas
        camera={{
          position: [centerX + 40, 60, centerZ + 70],
          fov: 45,
          near: 0.5,
          far: 2000,
        }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onPointerDown={(e) => {
          // Deselect if clicking on empty background
          if ((e.target as HTMLElement).tagName === "CANVAS") {
            // background click
          }
        }}
      >
        <color attach="background" args={["#060608"]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[100, 150, 100]} intensity={1.2} />
        <directionalLight position={[-80, 80, -80]} intensity={0.4} color="#64748b" />

        <CameraFocusController target={focusedTarget} />

        {/* 1. Districts */}
        <group>
          {layout.districts.map((district) => (
            <DistrictMesh
              key={district.id}
              district={district}
              isSelected={district.path === selectedNodeId}
              onSelectDistrict={onSelectDistrict}
            />
          ))}
        </group>

        {/* 2. Buildings */}
        <group>
          {layout.buildings.map((building) => (
            <BuildingMesh
              key={building.id}
              building={building}
              isSelected={building.nodeId === selectedNodeId}
              onSelect={onSelectBuilding}
            />
          ))}
        </group>

        {/* 3. Pins */}
        <group>
          {pins.map((pin) => (
            <PinMesh
              key={pin.id}
              pin={pin}
              isSelected={pin.id === selectedPinId}
              onSelectPin={onSelectPin}
            />
          ))}
        </group>

        {/* 4. On-Demand Reachability Arcs (drawn ONLY when vulnerable node selected) */}
        <ReachabilityLaser arcs={reachabilityArcs} />
      </Canvas>
    </div>
  );
}
