export default function WaxSeal() {
  return (
    <svg viewBox="0 0 200 200" className="wax-svg" aria-hidden="true">
      <defs>
        <radialGradient id="waxA" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffefc4" />
          <stop offset="36%" stopColor="#f3cd74" />
          <stop offset="72%" stopColor="#d29a3e" />
          <stop offset="100%" stopColor="#9c6b26" />
        </radialGradient>
        <radialGradient id="waxB" cx="46%" cy="44%" r="68%">
          <stop offset="0%" stopColor="#ecb95a" />
          <stop offset="78%" stopColor="#b17c33" />
          <stop offset="100%" stopColor="#8a5a1e" />
        </radialGradient>
        <linearGradient id="waxGloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="waxRough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.055"
            numOctaves="3"
            seed="11"
            result="n"
          />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" />
        </filter>
        <path id="sealArc" d="M100,100 m0,-49 a49,49 0 1 1 -0.01,0" fill="none" />
      </defs>

      {/* Organic poured-wax blob */}
      <g filter="url(#waxRough)">
        <circle cx="100" cy="100" r="79" fill="url(#waxA)" />
      </g>

      {/* Debossed inner plate + rings */}
      <circle cx="100" cy="100" r="61" fill="url(#waxB)" />
      <circle cx="100" cy="100" r="61" fill="none" stroke="#ffeeb8" strokeOpacity="0.5" strokeWidth="1.6" />
      <circle cx="100" cy="100" r="57" fill="none" stroke="#7c5015" strokeOpacity="0.65" strokeWidth="1.4" />

      {/* Debossed circular label */}
      <text className="wax-txt">
        <textPath href="#sealArc">&#8226; TAP TO OPEN &#8226; TAP TO OPEN</textPath>
      </text>

      {/* Embossed heart */}
      <g transform="translate(76,74) scale(2.05)">
        <path
          d="M12 21s-7.6-4.95-10.06-9.4C.35 7.7 2.6 4.2 6.15 4.6c2 .22 3.6 1.6 4.85 3.25 1.25-1.65 2.85-3.03 4.85-3.25 3.55-.4 5.8 3.1 4.21 7-2.46 4.45-10.06 9.4-10.06 9.4Z"
          fill="#8a5a1c"
          stroke="#ffe9ad"
          strokeOpacity="0.45"
          strokeWidth="0.7"
        />
        <path
          d="M12 21s-7.6-4.95-10.06-9.4C.35 7.7 2.6 4.2 6.15 4.6c2 .22 3.6 1.6 4.85 3.25 1.25-1.65 2.85-3.03 4.85-3.25 3.55-.4 5.8 3.1 4.21 7-2.46 4.45-10.06 9.4-10.06 9.4Z"
          transform="scale(0.72) translate(4.6 7.2)"
          fill="#a9783a"
          opacity="0.6"
        />
      </g>

      {/* Specular gloss */}
      <ellipse cx="76" cy="56" rx="36" ry="19" fill="url(#waxGloss)" opacity="0.45" />
    </svg>
  );
}
