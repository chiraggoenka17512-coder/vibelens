import React from "react";
import { VibeLens3DViewer } from "../../../src/components/city/vibelens-3d-viewer";
import { SAMPLE_SCAN_RESULT } from "../../../src/data/sample-scan";

export default function XRayPage() {
  return (
    <div className="w-full h-screen bg-[#060608]">
      <VibeLens3DViewer initialScan={SAMPLE_SCAN_RESULT} />
    </div>
  );
}

