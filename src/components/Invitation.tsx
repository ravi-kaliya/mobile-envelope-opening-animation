import srLogoDark from "@/assets/sr-logo-dark.png";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
// import sr2 from "@/assets/sr-2.webp";
// import sr3 from "@/assets/sr-3.webp";
// import sr4 from "@/assets/sr-4.webp";

import bright_lights_warm_love from "@/assets/bright-lights-warm-love.webp";
import fantastic_four from "@/assets/fantastic-four.webp";
import flowers_for_a_lasting_love from "@/assets/flowers-for-a-lasting-love.webp";
import never_letting_go from "@/assets/never-letting-go.webp";
import our_favorite_love_story from "@/assets/our-favorite-love-story.webp";
import she_said_yes_again_and_again from "@/assets/she-said-yes-again-and-again.webp";
import silver_looks_good_on_us from "@/assets/silver-looks-good-on-us.webp";
import to_every_sunset_together from "@/assets/to-every-sunset-together.webp";
import where_it_all_began from "@/assets/where-it-all-began.webp";

import noura from "@/assets/noura-1.webp";
import {
  ChevronDown,
  Heart,
  MapPin,
  Music2,
  RotateCcw,
} from "lucide-react";
import Ornament from "./Ornament";
import FallingLeaves from "./FallingLeaves";
import { Bloom, Sprig, StationeryFrame } from "./Florals";
import "./invite.css";
import heroSection from "@/assets/sr-5.webp";

/* ------- Live CDN imagery ------- */
const HERO_IMG = heroSection;
const FLORAL_IMG =
  "https://images.pexels.com/photos/13656187/pexels-photo-13656187.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const VENUE_IMG = noura;
const MOMENTS = [
  {
    img: bright_lights_warm_love,
    alt: "Bright lights, warm love.",
    caption: "Bright lights, warm love.",
    tilt: "-2.6deg",
    d: ".05s",
  },
  {
    img: fantastic_four,
    alt: "Fantastic four",
    caption: "Fantastic four!",
    tilt: "1.8deg",
    d: ".16s",
  },
  {
    img: flowers_for_a_lasting_love,
    alt: "Flowers for a lasting love",
    caption: "Flowers for a lasting love",
    tilt: "-1.6deg",
    d: ".27s",
  },
  {
    img: never_letting_go,
    alt: "Never letting go",
    caption: "Never letting go",
    tilt: "-1.6deg",
    d: ".27s",
  },
  {
    img: our_favorite_love_story,
    alt: "Our favorite love story",
    caption: "Our favorite love story",
    tilt: "-1.6deg",
    d: ".27s",
  },
  {
    img: she_said_yes_again_and_again,
    alt: "She said yes, again and again",
    caption: "She said yes, again and again",
    tilt: "-1.6deg",
    d: ".27s",
  },
  {
    img: silver_looks_good_on_us,
    alt: "Silver looks good on us",
    caption: "Silver looks good on us.",
    tilt: "-1.6deg",
    d: ".27s",
  },

  {
    img: to_every_sunset_together,
    alt: "To every sunset together",
    caption: "To every sunset together",
    tilt: "-1.6deg",
    d: ".27s",
  },
  {
    img: where_it_all_began,
    alt: "Where it all began",
    caption: "Where it all began",
    tilt: "-1.6deg",
    d: ".27s",
  },
];
const JOURNEY = [
  {
    date: "September 2001",
    title: "Where it began",
    text: "A meeting in college and love at first sight.",
    d: ".05s",
  },
  {
    date: "October 2001",
    title: "Two hearts one promise",
    text: "We exchanged rings and hearts forever.",
    d: ".15s",
  },
  {
    date: "December 2001",
    title: "A celebration of commitment",
    text: "Under a thousand fairy lights, We finally tied a knot  for a lifetime.",
    d: ".25s",
  },
  {
    date: "July 2003 ",
    title: " Little princess arrives",
    text: "Blessed with a little angel who filled our life with happiness -khushi",
    d: ".35s",
  },
  {
    date: "May 2005",
    title: "Happiness Doubled",
    text: "Beautiful gift  by God to us -paarth.",
    d: ".35s",
  },
  {
    date: "Dec 2026",
    title: "Together we celebrate",
    text: "Looking back old memories and promise to make countless new ones.",
    d: ".35s",
  },
];

const VENUE_NAME = "Noura Chandigarh - The Green Escape";
const VENUE_ADDR = "Near Ramgarh fort,  SAS Nagar, Chandigarh, India";
const MAPS_URL = `https://share.google/w669jLCd5p3TOxEoV`;
const ANNIVERSARY_DATE = new Date("2026-12-08T20:00:00");

/** scroll-reveal delay helper */
const rv = (d?: string): CSSProperties => ({ ["--d" as string]: d ?? "0s" });



function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff / 3600000) % 24,
      mins: Math.floor(diff / 60000) % 60,
      secs: Math.floor(diff / 1000) % 60,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return t;
}

function useScrollReveal(
  containerRef: React.RefObject<HTMLDivElement | null>,
  active: boolean
) {
  useEffect(() => {
    if (!active) return;
    const root = containerRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { root, threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [containerRef, active]);
}

export default function Invitation({
  leaving,
  onSeal,
  musicPlaying,
  onToggleMusic,
}: {
  leaving: boolean;
  onSeal: () => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const t = useCountdown(ANNIVERSARY_DATE);


  /* Animate the sheet up after mount */
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntered(true))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  /* Scroll-driven parallax for hero + quote band */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = root.scrollTop;
        root.style.setProperty("--px", `${y * 0.32}px`);
        root.style.setProperty("--py", `${y * 0.22}px`);
        root.style.setProperty("--ph", `${y * 0.16}px`);
        const max = root.scrollHeight - root.clientHeight;
        root.style.setProperty("--prog", String(max > 0 ? y / max : 0));
      });
    };
    onScroll();
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      root.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useScrollReveal(rootRef, entered);


  const countdownCells: Array<[number, string]> = [
    [t.days, "Days"],
    [t.hours, "Hours"],
    [t.mins, "Mins"],
    [t.secs, "Secs"],
  ];


  return (
    <div ref={rootRef} className={`invite${entered ? " in" : ""}${leaving ? " leaving" : ""}`}>
      {/* ===== Atmosphere: drift bokeh + falling petals ===== */}
      <FallingLeaves />

      {/* ===== Stationery frame: double pink outline + floral corners ===== */}
      <StationeryFrame />

      {/* ===== Scroll progress ribbon ===== */}
      <span className="iv-progress" aria-hidden="true" />

      {/* ================= HERO ================= */}
      <header className="iv-hero">
        <div className="iv-hero-media">
          <img className="iv-hero-img" src={HERO_IMG} alt="Sachin and Rukman celebrating together" />
        </div>
        <div className="iv-hero-veil" />
        <div className="iv-hero-copy">
          <p className="iv-kicker rv" style={rv(".1s")}>
            {/* Celebrating twenty-five years together */}
          </p>
          <h1 className="iv-names serif rv" style={rv(".25s")}>
            Sachin <br />& <br /> Rukman
          </h1>
          <div className="iv-date rv" style={rv(".4s")}>
            <Ornament className="orn light" />
            <p>Tuesday</p>
            <p>December 08, 2026</p>
            <p>08:00 PM</p>
            <Ornament className="orn light" flip />
          </div>
          <p
          className="iv-names text-[30px]! mb-0! serif rv"
          style={{
            // position: "fixed",
            // bottom: "3.50rem",
            // left: "50%",
            // zIndex: 100,
            width: "100%",
            // margin: 0,
            // transform: "translateX(-50%)",
            color: "#fff",
            opacity: 1,
            // visibility: "visible",
            // display: "block",
            // fontSize: "50px",
            // lineHeight: 1.1,
            textAlign: "center",
            // pointerEvents: "none",
          }}
        >
          The Countdown Begins
        </p>
        </div>
        
        <div className="iv-scrollcue">
          <span>Scroll</span>
          <ChevronDown size={16} />
        </div>
      </header>

      {/* Heart chip straddling the hero / countdown seam */}
      <span className="iv-seam" aria-hidden="true">
        <Heart size={13} fill="currentColor" strokeWidth={0} />
      </span>

      {/* ================= COUNTDOWN ================= */}
      <section className="iv-count band">
        <div className="iv-count-inner rv">
          {countdownCells.map(([v, label]) => (
            <div className="cd-cell" key={label}>
              <span className="cd-num serif" key={`${label}-${v}`}>
                {String(v).padStart(2, "0")}
              </span>
              <span className="cd-label">{label}</span>
            </div>
          ))}
        </div>
        <p className="iv-count-sub">until we celebrate 25 years of love</p>
      </section>

      {/* ================= INVITATION TEXT ================= */}
      <section className="iv-sec iv-hello">
        <span className="wm wm-hello">
          <Bloom />
        </span>
        <Ornament className="orn rv" />
        {/* <p className="iv-script serif rv" style={rv(".08s")}>
          request the honour of your presence
        </p> */}
        <h2 className="iv-sec-title serif rv" style={rv(".16s")}>
          As we celebrate this special day
        </h2>
        <p className="iv-body rv" style={rv(".24s")}>
          Surrounded by  flowers, candle lights and the people we love the most  we wish to celebrate our beginings....
          <br />
          <br />
          Join us for an evening of fun, laughter and togetherness
        </p>
      </section>

      {/* ================= DETAILS CARDS ================= */}
      {/* <section className="iv-sec iv-details">
        {detailCards.map(({ Icon, title, lines, d }) => (
          <article className="iv-card rv" key={title} style={rv(d)}>
            <span className="iv-card-icon">
              <Icon size={20} strokeWidth={1.6} />
            </span>
            <h3>{title}</h3>
            {lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </article>
        ))}
      </section> */}

      {/* ================= MOMENTS GALLERY ================= */}
      <section className="iv-moments">
        <div className="iv-sec" style={{ paddingBottom: 0 }}>
          <p className="iv-kicker rv">
            {/* Keepsakes */}
          </p>
          <h2 className="iv-sec-title serif rv" style={rv(".08s")}>
            Moments in bloom
          </h2>
        </div>
        <div className="m-row">
          {MOMENTS.map((m) => (
            <figure
              className="m-card rv"
              key={m.caption}
              style={{ ...rv(m.d), ["--tilt" as string]: m.tilt }}
            >
              <img src={m.img} alt={m.alt} loading="lazy" />
              <p className="iv-script serif text-center pb-0 text-sm! font-bold!">{m.caption}</p>
            </figure>
          ))}
        </div>
      </section>

      {/* ================= QUOTE BAND ================= */}
      <section className="iv-quote band" style={{ backgroundImage: `url(${FLORAL_IMG})` }}>
        <div className="iv-quote-veil" />
        <blockquote className="rv">
          <p className="serif">&ldquo;And so, the adventure begins.&rdquo;</p>
        </blockquote>
      </section>

      {/* ================= OUR JOURNEY TIMELINE ================= */}
      <section className="iv-sec iv-journey">
        <p className="iv-kicker rv">Our Story</p>
        <h2 className="iv-sec-title serif rv" style={rv(".08s")}>
          The journey so far
        </h2>
        <div className="j-list">
          <span className="j-stem rv" style={rv(".1s")} aria-hidden="true" />
          {JOURNEY.map((j) => (
            <article className="j-item rv" key={j.title} style={rv(j.d)}>
              <span className="j-dot">
                <Heart size={13} fill="currentColor" strokeWidth={0} />
              </span>
              <div className="j-card">
                <span className="j-date">{j.date}</span>
                <h3 className="serif">{j.title}</h3>
                <p>{j.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= VENUE ================= */}
      <section className="iv-sec iv-venue">
        <span className="wm wm-venue">
          <Sprig />
        </span>
        <h2 className="iv-sec-title serif rv" style={rv(".08s")}>
          The Venue
        </h2>
        <figure className="iv-venue-card rv" style={rv(".16s")}>
          <img src={VENUE_IMG} alt="The venue terrace at dusk" loading="lazy" />
          <figcaption>
            <span className="iv-venue-name serif">{VENUE_NAME}</span>
            <span className="iv-venue-addr">
              <MapPin size={13} /> {VENUE_ADDR}
            </span>
          </figcaption>
        </figure>
        <a
          className="iv-btn rv"
          style={rv(".24s")}
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin size={16} />
          View Venue Map
        </a>
      </section>

      {/* ================= ADD TO CALENDAR ================= */}
      {/* <section className="iv-cal band">
        <span className="twinkle tk1" aria-hidden="true" />
        <span className="twinkle tk2" aria-hidden="true" />
        <span className="twinkle tk3" aria-hidden="true" />
        <Ornament className="orn rv" />
        <h2 className="iv-sec-title serif rv" style={rv(".08s")}>
          Save the Date
        </h2>
        <p className="iv-body rv" style={rv(".16s")}>
          Add our celebration to your calendar so you never miss a moment of it.
        </p>
        <button type="button" className="iv-btn gold rv" style={rv(".22s")} onClick={downloadICS}>
          <CalendarPlus size={16} />
          Add to Calendar
        </button>
        <p className="iv-fine rv" style={rv(".3s")}>
          Works with Apple, Google &amp; Outlook calendars
        </p>
      </section> */}

      {/* ================= RSVP FORM ================= */}
      {/* <section className="iv-sec rsvp" id="rsvp">
        <span className="wm wm-rsvp">
          <Bloom />
        </span>
        <p className="iv-kicker rv">Répondez s&rsquo;il vous plaît</p>
        <h2 className="iv-sec-title serif rv" style={rv(".08s")}>
          RSVP
        </h2>
        <p className="iv-body rv" style={rv(".14s")}>
          Kindly respond by the 5th of June, 2026.
        </p>

        {submitted ? (
          <div className="iv-success enter">
            <span className="ok-ring">
              <Check size={26} strokeWidth={2.4} />
            </span>
            <h3 className="serif">Thank you, {form.name.split(" ")[0]}!</h3>
            <p>
              {form.attending === "yes"
                ? `We can't wait to celebrate with you — party of ${form.guests}.`
                : "You will be dearly missed, and we treasure your wishes."}
            </p>
            {form.attending === "yes" && (
              <div className="ok-chips">
                <span>
                  <Heart size={12} fill="currentColor" strokeWidth={0} /> {form.guests}{" "}
                  {form.guests > 1 ? "guests" : "guest"}
                </span>
                <span>
                  <CalendarPlus size={12} /> July 20, 2026
                </span>
              </div>
            )}
            <button
              type="button"
              className="iv-link"
              onClick={() => {
                setSubmitted(false);
                localStorage.removeItem(RSVP_KEY);
              }}
            >
              Edit your response
            </button>
          </div>
        ) : (
          <form className="iv-form rv" style={rv(".2s")} onSubmit={submit}>
            <label>
              <span>Your name</span>
              <input
                type="text"
                placeholder="e.g. Isabelle Laurent"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>

            <div className="attend">
              <span className="attend-label">Will you join us?</span>
              <div className="attend-opts">
                <button
                  type="button"
                  className={`opt${form.attending === "yes" ? " sel" : ""}`}
                  onClick={() => setForm({ ...form, attending: "yes" })}
                >
                  Joyfully accepts
                </button>
                <button
                  type="button"
                  className={`opt${form.attending === "no" ? " sel" : ""}`}
                  onClick={() => setForm({ ...form, attending: "no" })}
                >
                  Regretfully declines
                </button>
              </div>
            </div>

            <label>
              <span>Guests (including you)</span>
              <div className="stepper">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                  aria-label="Fewer guests"
                >
                  −
                </button>
                <strong className="serif">{form.guests}</strong>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, guests: Math.min(6, form.guests + 1) })}
                  aria-label="More guests"
                >
                  +
                </button>
              </div>
            </label>

            <label>
              <span>Song request or dietary notes</span>
              <textarea
                rows={3}
                placeholder="Song for the dance floor, allergies, anything we should know…"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </label>

            {error && <p className="iv-error">{error}</p>}

            <button type="submit" className="iv-btn gold wide">
              <Send size={15} />
              Send RSVP
            </button>
          </form>
        )}
      </section> */}

      {/* ================= FOOTER ================= */}
      <footer className="iv-footer">
        <img
          src={srLogoDark}
          alt="wax seal"
          className="block h-30 w-30 rounded-full object-cover drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
        // aria-hidden={opened}
        />
        {/* <div className="mono-mini serif">
          <span>A</span>
          <Heart size={11} fill="currentColor" strokeWidth={0} />
          <span>R</span>
        </div> */}
                <p className="iv-foot-names serif text-lg!">Your gracious presence would be our greatest honour and joy.</p>
        <p className="iv-foot-date">December 8, 2026</p>
        <p className="iv-foot-date2">08:00 PM</p>
        <button type="button" className="iv-btn ghost" onClick={onSeal}>
          <RotateCcw size={14} />
          Seal the envelope again
        </button>
        {/* <button
          type="button"
          className="iv-btn ghost"
          onClick={onToggleMusic}
          aria-pressed={musicPlaying}
        >
          <Music2 size={14} />
          {musicPlaying ? "Pause romantic music" : "Play romantic music"}
        </button> */}
        <p className="iv-fine">
          Made by{' '}
          <a href="https://coderlala.com" target="_blank" rel="noreferrer">
            Coderlala Technologies
          </a>
        </p>
      </footer>
    </div>
  );
}
