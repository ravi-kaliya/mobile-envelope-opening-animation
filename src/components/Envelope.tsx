import "./envelope.css";

interface EnvelopeProps {
  open: boolean;
  onOpen: () => void;
  onReset: () => void;
}

export default function Envelope({ open, onOpen, onReset }: EnvelopeProps) {
  return (
    <div className={`envelope-scene ${open ? "is-open" : ""}`}>
      {/* Star field sparkles */}
      <div className="sparkle sparkle-1">✦</div>
      <div className="sparkle sparkle-2">✦</div>
      <div className="sparkle sparkle-3">✧</div>
      <div className="sparkle sparkle-4">✦</div>

      {/* The closed envelope / open scene */}
      <div className="envelope-stage" onClick={open ? undefined : onOpen}>
        {/* Back panel of envelope */}
        <div className="env-back"></div>

        {/* The letter that pops out */}
        <div className="env-letter">
          <div className="letter-face">
            <div className="letter-heart">♥</div>
            <h2 className="letter-title">You&apos;re Invited!</h2>
            <p className="letter-text">
              A special surprise awaits you inside. Tap to unravel a little
              bit of magic made just for you.
            </p>
            <p className="letter-sign">With love, Me ✨</p>
            <button
              className="letter-close"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
            >
              Close ✕
            </button>
          </div>
        </div>

        {/* Envelope front pocket (the part the letter comes out of) */}
        <div className="env-front"></div>

        {/* Flap that folds open */}
        <div className="env-flap">
          <div className="flap-inner"></div>
        </div>

        {/* Wax seal on the flap */}
        <div className="env-seal">
          <span>♥</span>
        </div>

        {/* Hint text before opening */}
        <div className="env-hint">Tap to open</div>
      </div>
    </div>
  );
}
