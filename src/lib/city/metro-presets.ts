import { MetroGridPreset } from "./types";

export const METRO_PRESETS: MetroGridPreset[] = [
  {
    id: "blr",
    name: "Bengaluru",
    country: "India",
    code: "BLR",
    lat: "12.9716° N",
    lon: "77.5946° E",
    tagline: "Silicon Valley of Asia // Ring Roads & Tech Corridors",
    districtLabels: {
      core: "Central Business District (M.G. Road Core)",
      components: "Outer Ring Road (Tech Corridors)",
      utils: "Whitefield (Infrastructure & Power Grids)",
      peripherals: "Electronic City (Package Dependencies)",
    },
  },
  {
    id: "sfo",
    name: "San Francisco",
    country: "United States",
    code: "SFO",
    lat: "37.7749° N",
    lon: "122.4194° W",
    tagline: "The Peninsula & Bay Bridge Crossings",
    districtLabels: {
      core: "Financial District / SoMa (API Route Entrypoints)",
      components: "Mission & Hayes (UI Primitives & Views)",
      utils: "Industrial Docks / Mission Bay (Core Engine)",
      peripherals: "East Bay Crossings (External Services)",
    },
  },
  {
    id: "nyc",
    name: "New York City",
    country: "United States",
    code: "NYC",
    lat: "40.7128° N",
    lon: "74.0060° W",
    tagline: "The Manhattan Grid & Waterfront Avenues",
    districtLabels: {
      core: "Financial District / Wall St (Public Gateways)",
      components: "Midtown & Flatiron (Feature Modules)",
      utils: "Hudson River Yards (Infrastructure Utilities)",
      peripherals: "Brooklyn Bridge Terminal (NPM Dependencies)",
    },
  },
  {
    id: "lhr",
    name: "London",
    country: "United Kingdom",
    code: "LHR",
    lat: "51.5074° N",
    lon: "0.1278° W",
    tagline: "The Thames River Curve & Square Mile",
    districtLabels: {
      core: "City of London (Server Core & HTTP Handlers)",
      components: "Canary Wharf (Client Interface Modules)",
      utils: "Southwark Bank (Internal Engine Helpers)",
      peripherals: "Thames Barrier (Network Perimeters)",
    },
  },
  {
    id: "hnd",
    name: "Tokyo",
    country: "Japan",
    code: "HND",
    lat: "35.6762° N",
    lon: "139.6503° E",
    tagline: "Yamanote Radial Circuit & Tokyo Bay",
    districtLabels: {
      core: "Marunouchi / Chiyoda (Central Routing Hub)",
      components: "Shibuya & Shinjuku (Interactive Views)",
      utils: "Koto Bay Port (Data Stores & AST Engines)",
      peripherals: "Rainbow Bridge Rail (Transitive Libraries)",
    },
  },
  {
    id: "ber",
    name: "Berlin",
    country: "Germany",
    code: "BER",
    lat: "52.5200° N",
    lon: "13.4050° E",
    tagline: "Spree River Arteries & Bauhaus Blocks",
    districtLabels: {
      core: "Mitte (Core API & Application Routing)",
      components: "Kreuzberg & Friedrichshain (UI Components)",
      utils: "Moabit Industrial Yards (Parsing Utilities)",
      peripherals: "Ostkreuz Junction (External Microservices)",
    },
  },
];

export function getMetroPreset(codeOrId: string): MetroGridPreset {
  const normalized = codeOrId.toLowerCase().trim();
  const match = METRO_PRESETS.find(
    (p) => p.id === normalized || p.code.toLowerCase() === normalized
  );
  return match ?? METRO_PRESETS[0]; // Default to BLR
}

export function detectDefaultMetro(): MetroGridPreset {
  if (typeof Intl === "undefined") return METRO_PRESETS[0];
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
    if (tz.includes("calcutta") || tz.includes("kolkata") || tz.includes("india")) return getMetroPreset("BLR");
    if (tz.includes("los_angeles") || tz.includes("san_francisco")) return getMetroPreset("SFO");
    if (tz.includes("new_york")) return getMetroPreset("NYC");
    if (tz.includes("london")) return getMetroPreset("LHR");
    if (tz.includes("tokyo")) return getMetroPreset("HND");
    if (tz.includes("berlin")) return getMetroPreset("BER");
  } catch {
    // fallback
  }
  return METRO_PRESETS[0];
}
