import { describe, it, expect } from "vitest";
import { resolveVisualOverlays, STATE_COLORS } from "../src/lib/city/states";
import { CityVisualState } from "../src/lib/city/types";

describe("Visual State Overlays & Colors", () => {
  it("resolves single state overlays properly", () => {
    const working = resolveVisualOverlays(["working"]);
    expect(working.isHealthy).toBe(true);
    expect(working.hasFloodZone).toBe(false);
    expect(working.hasScaffolding).toBe(false);

    const vuln = resolveVisualOverlays(["vulnerable"]);
    expect(vuln.hasFloodZone).toBe(true);
    expect(vuln.isHealthy).toBe(false);

    const broken = resolveVisualOverlays(["broken"]);
    expect(broken.isFloodedDark).toBe(true);

    const ghost = resolveVisualOverlays(["dim-ghost"]);
    expect(ghost.isGhostDim).toBe(true);

    const constr = resolveVisualOverlays(["under-construction"]);
    expect(constr.hasScaffolding).toBe(true);
  });

  it("resolves multiple simultaneous overlays without losing individual state flags", () => {
    const multi: CityVisualState[] = ["vulnerable", "under-construction", "broken"];
    const overlays = resolveVisualOverlays(multi);

    expect(overlays.hasFloodZone).toBe(true);
    expect(overlays.hasScaffolding).toBe(true);
    expect(overlays.isFloodedDark).toBe(true);
    expect(overlays.isHealthy).toBe(false);
  });

  it("contains valid hex color codes for all visual states", () => {
    const states: CityVisualState[] = ["working", "broken", "under-construction", "vulnerable", "dim-ghost"];
    for (const s of states) {
      expect(STATE_COLORS[s]).toBeDefined();
      expect(STATE_COLORS[s].base).toMatch(/^#[0-9a-f]{6}$/i);
      expect(STATE_COLORS[s].accent).toMatch(/^#[0-9a-f]{6}$/i);
      expect(STATE_COLORS[s].overlay).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
