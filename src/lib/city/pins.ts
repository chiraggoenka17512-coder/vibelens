import { Pin } from "../../types/graph";
import { CityBuilding, CityLayout } from "./types";

export interface ResolvedPin extends Pin {
  x: number;
  y: number;
  z: number;
  orphaned: boolean;
  buildingId?: string;
  targetName: string;
}

/**
 * Resolves pin positions against the city layout.
 * 
 * Rules:
 * 1. Anchors to building by filePath.
 * 2. If functionFingerprint matches a room inside the building, anchors precisely to that room.
 * 3. If file has moved/renamed/not found, marks pin as ORPHANED instead of hiding it.
 * 4. Orphaned pins are placed in a designated staging area at the perimeter.
 */
export function resolvePins(
  pins: Pin[],
  layout: CityLayout
): { resolvedPins: ResolvedPin[]; orphanedCount: number; anchoredCount: number } {
  const buildingMap = new Map<string, CityBuilding>();
  for (const b of layout.buildings) {
    buildingMap.set(b.filePath, b);
  }

  let orphanedCount = 0;
  let anchoredCount = 0;

  const resolvedPins: ResolvedPin[] = pins.map((pin, index) => {
    const building = buildingMap.get(pin.filePath);

    if (building) {
      anchoredCount++;
      let pinX = building.x + building.width / 2;
      let pinZ = building.z + building.depth / 2;
      let pinY = building.height + 1.2;
      let targetName = building.fileName;

      if (pin.functionFingerprint && building.rooms.length > 0) {
        const matchingRoom = building.rooms.find(
          (r) => r.astFingerprint === pin.functionFingerprint
        );
        if (matchingRoom) {
          pinX = matchingRoom.x + matchingRoom.width / 2;
          pinZ = matchingRoom.z + matchingRoom.depth / 2;
          pinY = building.height + matchingRoom.height + 1.2;
          targetName = `${building.fileName} -> ${matchingRoom.name}()`;
        }
      }

      return {
        ...pin,
        x: Number(pinX.toFixed(2)),
        y: Number(pinY.toFixed(2)),
        z: Number(pinZ.toFixed(2)),
        orphaned: false,
        buildingId: building.id,
        targetName,
      };
    } else {
      orphanedCount++;
      // Orphaned pin staging zone at the western perimeter of the city
      const orphanX = (layout.bounds.minX || 0) - 15;
      const orphanZ = (layout.bounds.minZ || 0) + index * 8;
      const orphanY = 3.5;

      return {
        ...pin,
        x: Number(orphanX.toFixed(2)),
        y: orphanY,
        z: Number(orphanZ.toFixed(2)),
        orphaned: true,
        targetName: `${pin.filePath} [ORPHANED - FILE NOT FOUND]`,
      };
    }
  });

  return { resolvedPins, orphanedCount, anchoredCount };
}
