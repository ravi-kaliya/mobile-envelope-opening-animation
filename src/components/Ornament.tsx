interface OrnamentProps {
  flip?: boolean;
  className?: string;
}

export default function Ornament({ flip = false, className = "" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 240 26"
      className={`${className}${flip ? " orn-flip" : ""}`}
      aria-hidden="true"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path className="swoosh" d="M2 15 C 26 6, 46 5, 68 11 C 82 14.5, 92 14.5, 99 12.5 C 103.5 11.3, 104.5 8, 101.8 7.2 C 99.3 6.5, 97.6 9, 99.8 10.6" />
        <path className="swoosh swoosh-r" d="M238 15 C 214 6, 194 5, 172 11 C 158 14.5, 148 14.5, 141 12.5 C 136.5 11.3, 135.5 8, 138.2 7.2 C 140.7 6.5, 142.4 9, 140.2 10.6" />
      </g>
      <path className="gem" d="M120 6 L127 13 L120 20 L113 13 Z" fill="currentColor" />
    </svg>
  );
}
