import { CodebaseNode, CodebaseFunction } from "../../types/graph";

export interface TreemapRect {
  x: number;
  z: number;
  width: number;
  depth: number;
}

export interface CityDistrict {
  id: string;
  name: string;
  path: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  fileCount: number;
  states: CityVisualState[];
}

export type CityVisualState =
  | "working"
  | "broken"
  | "under-construction"
  | "vulnerable"
  | "dim-ghost";

export interface CityRoom {
  id: string;
  name: string;
  astFingerprint: string;
  functionData: CodebaseFunction;
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  isVulnerable: boolean;
}

export interface CityBuilding {
  id: string;
  nodeId: string;
  filePath: string;
  fileName: string;
  node: CodebaseNode;
  districtId: string;
  districtPath: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  primaryState: CityVisualState;
  activeStates: CityVisualState[];
  rooms: CityRoom[];
}

export interface CityLayout {
  districts: CityDistrict[];
  buildings: CityBuilding[];
  bounds: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
    width: number;
    depth: number;
  };
}

export interface MetroGridPreset {
  id: string;
  name: string;
  country: string;
  code: string; // e.g. "BLR", "SFO", "NYC", "LHR", "HND", "BER"
  lat: string;
  lon: string;
  tagline: string;
  districtLabels: {
    core: string;      // Central Business District / Entrypoint routes
    components: string;// Tech corridors / UI Modules
    utils: string;     // Infrastructure / Docks
    peripherals: string;
  };
}
