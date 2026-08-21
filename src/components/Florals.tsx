/* Delicate pink line-art florals drawn as SVG — used for watermarks & frame */

const SPRIG_PATHS = [
  /* stem */
  "M30 116 C 30 84 28 52 20 16",
  /* leaves */
  "M27 96 C 40 90 44 78 42 68 C 30 74 25 84 27 96 Z",
  "M30 84 C 18 78 14 66 16 56 C 28 62 32 72 30 84 Z",
  "M26 66 C 38 60 41 50 39 40 C 29 46 24 56 26 66 Z",
  "M24 44 C 14 38 11 30 13 21 C 21 27 25 35 24 44 Z",
];

function PetalFan() {
  return (
    <>
      {[0, 60, 120].map((a) => (
        <g key={a} transform={`rotate(${a} 60 60)`}>
          <path d="M60 8 C80 26 80 46 60 62 C40 46 40 26 60 8 Z" />
        </g>
      ))}
      <circle cx="60" cy="62" r="8" strokeDasharray="0.1 7" strokeWidth="4" />
    </>
  );
}

export function Bloom({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <PetalFan />
    </svg>
  );
}

export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {SPRIG_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
      <circle cx="20" cy="12" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CornerCluster({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* bloom anchored near the corner */}
      <g transform="translate(24,24) scale(0.78)">
        <PetalFan />
      </g>
      {/* sprig sweeping along the top edge */}
      <g transform="translate(104,38) rotate(115) scale(0.9)">
        {SPRIG_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {/* sprig sweeping down the side edge */}
      <g transform="translate(38,106) rotate(160) scale(0.9)">
        {SPRIG_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {/* berries */}
      <circle cx="152" cy="34" r="3.4" fill="currentColor" stroke="none" />
      <circle cx="166" cy="44" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="150" cy="52" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="34" cy="152" r="3.4" fill="currentColor" stroke="none" />
      <circle cx="44" cy="166" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="52" cy="150" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Thin double-line stationery frame with floral corners, floating above the page */
export function StationeryFrame() {
  return (
    <div className="frame" aria-hidden="true">
      <span className="f-line f-outer" />
      <span className="f-line f-inner" />
      {(["tl", "tr", "br", "bl"] as const).map((c) => (
        <span key={c} className={`f-corner ${c}`}>
          <CornerCluster />
        </span>
      ))}
    </div>
  );
}
