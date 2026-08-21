import type { CSSProperties } from "react";

/* Leaf / petal silhouettes (viewBox 0 0 100 100) */
const SHAPES = [
  // pointed rose leaf
  "M50 3 C74 20 88 36 88 56 C88 78 70 92 50 97 C30 92 12 78 12 56 C12 36 26 20 50 3 Z",
  // soft petal
  "M50 4 C80 22 92 48 82 70 C74 88 58 96 50 96 C42 96 26 88 18 70 C8 48 20 22 50 4 Z",
  // curved leaf
  "M50 2 C84 30 96 58 78 84 C64 96 46 98 34 90 C16 78 8 52 26 26 C34 14 42 6 50 2 Z",
];

const COLORS = ["#f3aebf", "#e88ba3", "#fbd3dd", "#f2c1cd", "#efc88f", "#cfd8bb", "#e98aa4"];

interface LeafCfg {
  x: number;
  s: number;
  dur: number;
  delay: number;
  sway: number;
  swayDur: number;
  tilt: number;
  shape: number;
  color: string;
  blur: number;
  o: number;
  top: number;
}

/* Deterministic pseudo-random so it renders identically server/client */
function rand(seed: number) {
  const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
}

function makeLeaves(count: number, seedBase: number): LeafCfg[] {
  return Array.from({ length: count }, (_, i) => {
    const r = (n: number) => rand(seedBase + i * 13 + n * 0.618);
    return {
      x: r(1) * 96,
      s: 13 + r(2) * 20,
      dur: 10 + r(3) * 10,
      delay: -r(4) * 20,
      sway: 14 + r(5) * 30,
      swayDur: 2.1 + r(6) * 2.6,
      tilt: 20 + r(7) * 40,
      shape: Math.floor(r(8) * SHAPES.length),
      color: COLORS[Math.floor(r(9) * COLORS.length)],
      blur: r(10) > 0.72 ? 1.6 : 0,
      o: 0.45 + r(11) * 0.45,
      top: -80 - r(12) * 300,
    };
  });
}

const LEAVES = makeLeaves(15, 7);

export default function FallingLeaves() {
  return (
    <>
      {/* Drifting bokeh glows behind the content */}
      <div className="backdrop" aria-hidden="true">
        {/* The envelope's own damask pattern, washed white */}
        <span className="pattern-bg" />
        <span className="bokeh bk1" />
        <span className="bokeh bk2" />
        <span className="bokeh bk3" />
        <span className="bokeh bk4" />
      </div>

      {/* Falling leaves / petals layer */}
      <div className="leaves" aria-hidden="true">
        {LEAVES.map((L, i) => {
          const style = {
            "--dur": `${L.dur}s`,
            "--delay": `${L.delay}s`,
            "--sway": `${L.sway}px`,
            "--sd": `${L.swayDur}s`,
            "--tl": `${L.tilt}deg`,
            left: `${L.x}%`,
            top: `${L.top}px`,
            width: `${L.s}px`,
            opacity: L.o,
            filter: L.blur ? `blur(${L.blur}px)` : undefined,
          } as CSSProperties;
          return (
            <span className="leaf" key={i} style={style}>
              <svg viewBox="0 0 100 100" className="leaf-in">
                <path d={SHAPES[L.shape]} fill={L.color} />
                <path
                  d="M50 10 C50 38 50 66 50 92"
                  fill="none"
                  stroke="rgba(122,58,42,.28)"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          );
        })}
      </div>
    </>
  );
}
