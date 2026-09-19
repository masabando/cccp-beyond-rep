# Reproducing Figure 1

This directory generates the six fidelity-map panels for
"Concatenated Composite Pulses Beyond Local Residual-Error Preservation".

## Run in your browser

[Open the interactive reproduction page](https://masabando.github.io/cccp-beyond-rep/)
to generate the six fidelity maps. Once generated, click each map to download
it as a PNG. No local installation is required.

The hosted page may change as the repository is updated. For the fixed version
used by the manuscript, use [v1.0.1](https://github.com/masabando/cccp-beyond-rep/tree/v1.0.1)
and follow the local execution instructions below. This release enlarges figure
labels and adds progress messages; the calculation conditions are unchanged
from v1.0.0.

## Requirements and local execution

Use a current browser with JavaScript modules, import maps, and Canvas support.
An internet connection is required to load the version-pinned library from
jsDelivr. No npm installation or build step is required.

From this directory, start a static HTTP server, for example with Python 3:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/ in your browser. If that port is occupied, choose
another port in both the command and URL. Wait for all six panels to render.
Click each map to download its PNG. Stop the server with Ctrl+C.
Serve the files over HTTP rather than opening index.html as a local file.

The downloaded files are individual panels, without panel captions.
The manuscript assembles them into Figure 1.

## Fixed dependency

- Library: @masabando/quantum-gates, version 0.1.13.
- Source: https://github.com/masabando/quantum-gates/tree/v0.1.13
- Browser module: https://cdn.jsdelivr.net/npm/@masabando/quantum-gates@0.1.13/+esm

index.html pins the version explicitly; it does not use a latest-version alias.
No changes to the library's error model are applied.
Three.js and the animation utilities are not needed.

## Calculation conditions

- Target: R(pi, 0).
- Horizontal axis: off-resonance error f (ORE).
- Vertical axis: pulse-length error epsilon (PLE), increasing upward.
- Both errors range from -0.1 to +0.1, inclusive, in steps of 0.001.
- Each panel contains 201 x 201 calculation points.
- The same epsilon and f apply to every elementary pulse.
- Pulses are listed in time order; their matrix product acts right to left.
- Adjacent pulses are not merged.

The exact elementary operation is

```text
R(theta, phi; epsilon, f)
  = exp[-i theta (1 + epsilon) (sigma_phi + f sigma_z) / 2],
sigma_phi = cos(phi) sigma_x + sin(phi) sigma_y.
```

The rotation-angle error multiplies the entire exponent, including detuning.
The calculation uses exact elementary rotations, not a Taylor truncation.
The phase-insensitive trace fidelity is

```text
F = abs(Tr(U_target^dagger W)) / 2.
```

The trace is not squared. The grayscale is

```text
floor(255 * (max(F, 0.9999) - 0.9999) / (1 - 0.9999)).
```

Black represents F <= 0.9999, not zero fidelity; white represents F = 1.
All panels use this same scale.

## Panels and filenames

Names use the inner/outer convention.

| Panel | Sequence | Downloaded file |
| --- | --- | --- |
| (a) | CORPSE/BB1 | CORPSE_BB1-fidelity.png |
| (b) | shortCORPSE/BB1 | shortCORPSE_BB1-fidelity.png |
| (c) | shortCORPSE/splitBB1 | shortCORPSE_splitBB1-fidelity.png |
| (d) | SCROFULOUS | SCROFULOUS-fidelity.png |
| (e) | splitShortCORPSE | splitShortCORPSE-fidelity.png |
| (f) | SCROFULOUS/splitShortCORPSE | SCROFULOUS_splitShortCORPSE-fidelity.png |

The map area is 400 x 400 pixels. Including axes, PNG dimensions are
520 x 520 pixels for (a), (b), (d), and (e), and 668 x 520 pixels for
(c) and (f), which include color bars. Browser display scaling does not
change the downloaded dimensions.

## Scope of the splitting definitions

The custom splitting definitions in main.js are for the target pi rotation
used in Figure 1, not general-angle splitting routines.

- splitBB1 replaces BB1's 2pi pulse by two consecutive pi pulses. Together
  with the other pulses, this gives five pi pulses.
- splitShortCORPSE replaces the central 5pi/3 pulse by five pi/3 pulses.
  Together with the two pi/3 end pulses, this gives seven equal-angle pulses.
- Panel (c) replaces each split BB1 pulse by short CORPSE, giving 15
  elementary pulses.
- Panel (f) replaces each split short CORPSE pulse by SCROFULOUS, giving
  21 elementary pulses.

Changing only the target angle does not produce the general-angle
constructions discussed in the manuscript. Appropriate commensurate
splitting must be supplied separately.

## Reproducibility limits

The fixed pulse definitions, model, and grid specify the numerical
calculation. Floating-point roundoff can vary slightly between environments.
Font selection, antialiasing, and Canvas rasterization can also differ
between browsers and operating systems, so byte-identical PNG files are
not expected. Numerical reproducibility and image-file identity are
different requirements.

This directory generates Figure 1 only; it does not reproduce every
analytical result or the unplotted constructions in the cost table.

## License and citation

The reproduction code and accompanying documentation are distributed under
the MIT License; see LICENSE. The quantum-gates library has its own MIT
license and copyright notice.

If this code contributes to your research, please cite the associated work
by Masamitsu Bando, "Concatenated Composite Pulses Beyond Local
Residual-Error Preservation". Publication details will be added when
available. This citation request is not an additional license condition.
