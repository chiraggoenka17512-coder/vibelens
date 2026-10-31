"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { CodebaseEdge, CodebaseNode } from "../../types/graph";

interface GraphCanvasProps {
  nodes: CodebaseNode[];
  edges: CodebaseEdge[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}

interface GraphNodePosition {
  node: CodebaseNode;
  position: [number, number, number];
  color: string;
}

export function GraphCanvas({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
}: GraphCanvasProps) {
  // Deterministic 3D spherical/orbital force-like distribution based on node index & metrics
  const nodePositions: GraphNodePosition[] = useMemo(() => {
    const count = nodes.length;
    const radius = 25;
    return nodes.map((node, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      let color = "#10b981"; // emerald default
      if (node.metrics.reachableCVEs > 0) {
        color = "#ef4444"; // red vulnerable
      } else if (node.metrics.tests === "fail" || node.metrics.errors) {
        color = "#dc2626"; // broken
      } else if (node.metrics.isDeadCode || node.metrics.reachability === "unreachable") {
        color = "#52525b"; // dim ghost
      } else if (node.metrics.duplication > 50) {
        color = "#f59e0b"; // yellow vibe slop
      }

      return {
        node,
        position: [x, y, z],
        color,
      };
    });
  }, [nodes]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, [number, number, number]>();
    for (const np of nodePositions) {
      map.set(np.node.id, np.position);
    }
    return map;
  }, [nodePositions]);

  return (
    <div className="w-full h-full relative bg-[#060608]">
      <Canvas
        camera={{ position: [0, 0, 55], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#060608"]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[50, 50, 50]} intensity={1.5} />
        <OrbitControls enableDamping dampingFactor={0.08} />

        {/* 1. Dependency Wiring Edges */}
        <group>
          {edges.map((edge) => {
            const start = nodeMap.get(edge.source);
            const end = nodeMap.get(edge.target);
            if (!start || !end) return null;

            const isRelatedToSelection =
              selectedNodeId &&
              (edge.source === selectedNodeId || edge.target === selectedNodeId);

            const lineColor = edge.isEntryPath
              ? "#ef4444"
              : isRelatedToSelection
              ? "#06b6d4"
              : "rgba(255, 255, 255, 0.15)";

            const geom = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(...start),
              new THREE.Vector3(...end),
            ]);

            return (
              <line key={edge.id} {...({ geometry: geom } as any)}>
                <lineBasicMaterial
                  color={lineColor}
                  linewidth={isRelatedToSelection || edge.isEntryPath ? 2 : 1}
                  transparent
                  opacity={isRelatedToSelection || edge.isEntryPath ? 1 : 0.3}
                />
              </line>
            );
          })}
        </group>

        {/* 2. Graph Nodes */}
        <group>
          {nodePositions.map(({ node, position, color }) => {
            const isSelected = node.id === selectedNodeId;
            const size = isSelected ? 1.8 : 1.2;

            return (
              <group key={node.id} position={position}>
                <mesh
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectNode(node.id);
                  }}
                >
                  <sphereGeometry args={[size, 16, 16]} />
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isSelected ? 0.8 : 0.2}
                    roughness={0.3}
                    metalness={0.7}
                  />
                </mesh>

                {/* Selection Halo */}
                {isSelected && (
                  <lineLoop rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[2.2, 2.35, 32]} />
                    <lineBasicMaterial color="#06b6d4" />
                  </lineLoop>
                )}
              </group>
            );
          })}
        </group>
      </Canvas>
    </div>
  );
}

