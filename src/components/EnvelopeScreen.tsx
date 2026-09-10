import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Heart, Music2, QrCode, RotateCcw, Sparkles } from "lucide-react";
import Ornament from "./Ornament";
import srLogoDark from "@/assets/sr-logo-dark.png";
// import WaxSeal from "./WaxSeal";
import Invitation from "./Invitation";
import Burst from "./Burst";
import { THEMES } from "../themes";
import "./envelope.css";

type InvitePhase = "hidden" | "shown" | "leaving";

const ENVELOPE_READ_HOLD_MS = 3_000;

export default function EnvelopeScreen() {
  const [open, setOpen] = useState(false);
  const [invite, setInvite] = useState<InvitePhase>("hidden");
  const [themeIdx, setThemeIdx] = useState(4);
  const theme = THEMES[themeIdx];
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const openEnvelope = () => {
    if (open) return;
    setOpen(true);
    clearTimers();
    /* Keep the revealed monogram and date visible long enough to read. */
    timers.current.push(window.setTimeout(() => setInvite("shown"), ENVELOPE_READ_HOLD_MS));
  };

  const sealEnvelope = () => {
    clearTimers();
    setOpen(false);
    setInvite("hidden");
  };

  const closeInvite = () => {
    setOpen(false); /* re-seal the envelope behind the leaving sheet */
    setInvite("leaving");
    clearTimers();
    timers.current.push(window.setTimeout(() => setInvite("hidden"), 680));
  };

  useEffect(() => clearTimers, []);

  /* Preload every theme pattern so switching styles is instant */
  useEffect(() => {
    THEMES.forEach((t) => {
      const img = new Image();
      img.src = t.pattern;
    });
  }, []);

  const style = {
    ...theme.vars,
    "--pattern-url": `url("${theme.pattern}")`,
    "--env-bg": theme.vars["--env-bg"] ?? "#ecc3b0",
  } as CSSProperties;
  const showEnvelope = invite !== "shown";

  return (
    <div className={`env-screen${open ? " is-open" : ""}`} style={style}>
      {showEnvelope && (
        <>
          {/* ===== Envelope face (full screen, ornate blush pattern) ===== */}
          <div className="face pattern" key={`face-${theme.id}`}>
            <div className="inner-shade" aria-hidden="true" />

            {/* Revealed monogram — hidden beneath the lowered flap until opened */}
            <div className="reveal" aria-hidden={!open}>
            <img
                src={srLogoDark}
                alt="wax seal"
                className="block h-30 w-30 rounded-full object-cover drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
              // aria-hidden={opened}
              />
              <p className="save">25 Years of Love</p>
              <p className="date serif">08&nbsp;&middot;&nbsp;12&nbsp;&middot;&nbsp;2026</p>
              <p className="date serif">08:00 PM</p>
            </div>

            {/* "You are invited" block — printed on the envelope body */}
            <div className="invited">
              <Ornament className="orn" />
              <h1 className="invited-title serif">You Are Invited</h1>
              <Ornament className="orn" flip />
              <span className="invited-heart">
                <Heart size={11} fill="currentColor" strokeWidth={0} />
              </span>
            </div>

            {/* Envelope style picker — 5 patterns */}
            {/* <div className="theme-picker" role="tablist" aria-label="Envelope style">
              <span className="tp-label serif">Choose a style</span>
              <div className="tp-row">
                {THEMES.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={i === themeIdx}
                    aria-label={t.name}
                    title={t.name}
                    className={`swatch${i === themeIdx ? " active" : ""}`}
                    style={{ backgroundImage: `url(${t.pattern})` } as CSSProperties}
                    onClick={(e) => {
                      e.stopPropagation();
                      setThemeIdx(i);
                    }}
                  >
                    <span className="sw-mono serif" aria-hidden="true">
                      {t.short}
                    </span>
                  </button>
                ))}
              </div>
            </div> */}

            {/* Bottom controls */}
            <div className="controls">
              <button
                type="button"
                className="pill btn-undo"
                onClick={(e) => {
                  e.stopPropagation();
                  sealEnvelope();
                }}
              >
                <RotateCcw size={15} strokeWidth={1.7} />
                Undo
              </button>
              <button
                type="button"
                className="pill btn-reveal"
                onClick={openEnvelope}
              >
                <Sparkles size={15} strokeWidth={1.7} />
                Tap to Reveal
              </button>
            </div>

            {/* Music corner */}
            <button type="button" className="corner corner-br" aria-label="Music">
              <span className="pulse-ring" aria-hidden="true" />
              <Music2 size={18} strokeWidth={1.5} />
            </button>

            {/* Floating gold dust */}
            <span className="mote m1" aria-hidden="true" />
            <span className="mote m2" aria-hidden="true" />
            <span className="mote m3" aria-hidden="true" />
            <span className="mote m4" aria-hidden="true" />
          </div>

          {/* ===== Cast shadow of the flap on the face ===== */}
          <div className="cast" aria-hidden="true" />

          {/* ===== The flap ===== */}
          <div
            key={`flap-${theme.id}`}
            className="flap pattern"
            role="button"
            tabIndex={0}
            aria-label="Open invitation"
            onClick={openEnvelope}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openEnvelope();
            }}
          >
            <div className="flap-sheen" aria-hidden="true" />
            {/* <div className="flap-label">
              <Ornament className="orn sm" />
              <p className="flap-small">Our 25th Anniversary of</p>
              <p className="flap-names serif">Sachin &amp; Rukman</p>
              <Ornament className="orn sm" flip />
            </div> */}
            {/* QR corner — printed on the flap */}
            <button
              type="button"
              className="corner corner-tr"
              aria-label="Invitation QR"
              onClick={(e) => e.stopPropagation()}
            >
              <QrCode size={19} strokeWidth={1.5} />
            </button>
          </div>

          {/* ===== Gold wax seal ===== */}
          <button type="button" className="seal" aria-label="Tap to open" onClick={openEnvelope}>
            <span className="seal-glow" aria-hidden="true" />
            <span className="seal-in">
              {/* <WaxSeal /> */}
              <img
                src={srLogoDark}
                alt="wax seal"
                className="block h-full w-full rounded-full object-cover drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
                // aria-hidden={opened}
              />
            </span>
          </button>

          {/* ===== Confetti burst when the seal breaks ===== */}
          {open && <Burst />}
        </>
      )}

      {/* ===== Invitation sheet that rises after the flap opens ===== */}
      {invite !== "hidden" && (
        <Invitation leaving={invite === "leaving"} onSeal={closeInvite} />
      )}
    </div>
  );
}
