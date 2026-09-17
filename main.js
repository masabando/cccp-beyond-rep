import { CPList, QTool, createCCCP } from "@masabando/quantum-gates";

// Figure 1 only: these splitting definitions are for a target pi rotation.
const theta = Math.PI;
const phi = 0;
const BB1 = CPList.BB1.pulse;
const shortCORPSE = CPList.shortCORPSE.pulse;

CPList.splitBB1 = {
  name: "splitBB1",
  robustType: "ple",
  rep: "ore",
  pulse: [
    BB1[0],
    { theta: () => Math.PI, phi: BB1[1].phi },
    { theta: () => Math.PI, phi: BB1[1].phi },
    BB1[2],
    BB1[3],
  ],
};

CPList.splitShortCORPSE = {
  name: "splitShortCORPSE",
  robustType: "ore",
  rep: false,
  pulse: [
    shortCORPSE[0],
    ...Array.from({ length: 5 }, () => ({
      theta: () => Math.PI / 3,
      phi: shortCORPSE[1].phi,
    })),
    shortCORPSE[2],
  ],
};

CPList["shortCORPSE/BB1"] = createCCCP("shortCORPSE", "BB1");
CPList["shortCORPSE/splitBB1"] = createCCCP("shortCORPSE", "splitBB1");
CPList["SCROFULOUS/splitShortCORPSE"] = createCCCP("SCROFULOUS", "splitShortCORPSE");

// Concatenation names use inner/outer order; no pulse merging is performed.
const panels = [
  "CORPSE/BB1",
  "shortCORPSE/BB1",
  "shortCORPSE/splitBB1",
  "SCROFULOUS",
  "splitShortCORPSE",
  "SCROFULOUS/splitShortCORPSE",
];

for (const gateName of panels) {
  const id = gateName.replace(/\//g, "_");
  QTool.createFidelityMap({
    target: document.getElementById(id),
    gateName,
    theta,
    phi,
    width: 400,
    height: 400,
    threshold: 0.9999,
    error: {
      ple: { min: -0.1, max: 0.1, step: 0.001 },
      ore: { min: -0.1, max: 0.1, step: 0.001 },
    },
    colorBar: gateName === panels[2] || gateName === panels[5],
    padding: { top: 20, bottom: 100, left: 100, right: 20 },
    labelFont: "26px serif",
    ticsFont: "26px serif",
    labelMargin: { ple: 60, ore: 52 },
    ticsMargin: { ple: 8, ore: 8, colorBar: 8 },
    colorBarWidth: 28,
    colorBarMargin: { left: 20, right: 100 },
    colorBarTicsFont: "26px serif",
    download: id + "-fidelity.png",
  });

  // Keep the library-generated download link accessible in English.
  const link = document.getElementById(id).querySelector("a");
  link.title = "Download PNG";
  link.setAttribute("aria-label", "Download " + gateName + " as PNG");
}
