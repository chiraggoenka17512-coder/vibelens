import { describe, it, expect } from "vitest";
import { METRO_PRESETS, getMetroPreset, detectDefaultMetro } from "../src/lib/city/metro-presets";

describe("Metropolitan City Grid Presets", () => {
  it("includes all 6 primary tech hub metropolitan presets", () => {
    const codes = METRO_PRESETS.map((m) => m.code);
    expect(codes).toContain("BLR");
    expect(codes).toContain("SFO");
    expect(codes).toContain("NYC");
    expect(codes).toContain("LHR");
    expect(codes).toContain("HND");
    expect(codes).toContain("BER");
    expect(METRO_PRESETS.length).toBe(6);
  });

  it("retrieves a preset by code or ID (case-insensitive)", () => {
    const blr = getMetroPreset("BLR");
    expect(blr.name).toBe("Bengaluru");
    expect(blr.country).toBe("India");
    expect(blr.districtLabels.core).toContain("Central Business District");

    const sfo = getMetroPreset("sfo");
    expect(sfo.name).toBe("San Francisco");
    expect(sfo.districtLabels.peripherals).toContain("East Bay");
  });

  it("falls back to default preset if code is unknown", () => {
    const fallback = getMetroPreset("UNKNOWN_CITY");
    expect(fallback.code).toBe("BLR");
  });

  it("detectDefaultMetro returns a valid preset", () => {
    const detected = detectDefaultMetro();
    expect(detected).toBeDefined();
    expect(detected.code).toBeDefined();
    expect(detected.lat).toBeDefined();
    expect(detected.lon).toBeDefined();
  });
});
