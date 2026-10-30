"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { ReachabilityArc } from "../../lib/city/reachability";

interface ReachabilityLaserProps {
  arcs: ReachabilityArc[];
}

export function ReachabilityLaser({ arcs }: ReachabilityLaserProps) {
  if (!arcs || arcs.length === 0) return null;

  return (
    <group>
      {arcs.map((arc) => {
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(...arc.start),
          new THREE.Vector3(...arc.control),
          new THREE.Vector3(...arc.end)
        );

        const points = curve.getPoints(36);
        const geom = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <group key={arc.edgeId}>
            {/* Core Red Laser Beam */}
            <line geometry={geom}>
              <lineBasicMaterial color="#ef4444" linewidth={3} />
            </line>

            {/* Origin & Target Laser Beacon Crosshairs */}
            <mesh position={arc.start}>
              <sphereGeometry args={[0.6, 8, 8]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>

            <mesh position={arc.end}>
              <sphereGeometry args={[0.7, 8, 8]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
