import { CityVisualState } from "./types";
import { CodebaseNode } from "../../types/graph";

export const STATE_COLORS: Record<CityVisualState, { base: string; accent: string; overlay: string }> = {
  working: {
    base: "#1e293b",
    accent: "#10b981", // Emerald
    overlay: "#065f46",
  },
  broken: {
    base: "#0f172a", // Submerged / dark flooded
    accent: "#ef4444", // Red distress
    overlay: "#7f1d1d",
  },
  "under-construction": {
    base: "#18181b",
    accent: "#f59e0b", // Amber scaffolding
    overlay: "#b45309",
  },
  vulnerable: {
    base: "#27272a",
    accent: "#ef4444", // Red flood zone
    overlay: "#991b1b",
  },
  "dim-ghost": {
    base: "#18181b",
    accent: "#52525b", // Faded ghost
    overlay: "#27272a",
  },
};

/**
 * Validates which visual state overlays must be drawn for a building.
 * A building or district can have multiple overlays active simultaneously.
 */
export function resolveVisualOverlays(activeStates: CityVisualState[]): {
  hasFloodZone: boolean;
  hasScaffolding: boolean;
  isFloodedDark: boolean;
  isGhostDim: boolean;
  isHealthy: boolean;
} {
  return {
    hasFloodZone: activeStates.includes("vulnerable"),
    hasScaffolding: activeStates.includes("under-construction"),
    isFloodedDark: activeStates.includes("broken"),
    isGhostDim: activeStates.includes("dim-ghost"),
    isHealthy: activeStates.includes("working") && activeStates.length === 1,
  };
}
