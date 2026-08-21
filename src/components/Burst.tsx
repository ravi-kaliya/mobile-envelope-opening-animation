import { useMemo } from "react";
import type { CSSProperties } from "react";

const COLORS = ["#e88ba3", "#f3c96b", "#ffffff", "#f3aebf", "#c24266", "#fbd9c9"];

function rand(seed: number) {
  const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
}

interface Piece {
  dx: number;
  dy: number;
  rot: number;
  s: number;
  c: string;
  delay: number;
  round: boolean;
}

/** One-shot rose-gold confetti burst from the seal position */
export default function Burst() {
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const a = rand(i * 7.13) * Math.PI * 2;
        const dist = 55 + rand(i * 3.7 + 1) * 130;
        return {
          dx: Math.cos(a) * dist,
          dy: Math.sin(a) * dist - 42, /* upward bias */
          rot: Math.round(rand(i + 2.4) * 460 - 230),
          s: 5 + rand(i + 3.9) * 8,
          c: COLORS[Math.floor(rand(i + 5.2) * COLORS.length)],
          delay: rand(i + 6.6) * 0.1,
          round: rand(i + 8.1) > 0.55,
        };
      }),
    []
  );

  return (
    <div className="burst" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          style={
            {
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--rot": `${p.rot}deg`,
              "--delay": `${p.delay}s`,
              width: p.s,
              height: p.round ? p.s : p.s * 1.5,
              background: p.c,
              borderRadius: p.round ? "50%" : "2px",
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
