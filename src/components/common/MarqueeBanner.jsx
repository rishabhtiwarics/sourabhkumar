import "./MarqueeBanner.css";

/* inline SVG icons — no extra import needed */
const HeartPulseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.2s-7.6-4.6-9.9-9.4C.6 7.1 2.6 3.6 6.2 3c2.2-.4 4.3.7 5.8 2.7C13.5 3.7 15.6 2.6 17.8 3c3.6.6 5.6 4.1 4.1 7.8-2.3 4.8-9.9 9.4-9.9 9.4Z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l2.9 6.3 6.8.9-5 4.6 1.2 6.8L12 17.3l-5.9 3.3 1.2-6.8-5-4.6 6.8-.9Z"/>
  </svg>
);

const RunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13" cy="4" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M7 21l3.5-6 3 3 2-4.5"/>
    <path d="M5 12l4-1.5 3 2.5 4-2 2-4"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

/* items that loop */
const ITEMS = [
  { icon: <HeartPulseIcon />, text: <>Move Better, <span className="mqb-gold">Live Better</span></> },
  { icon: <StarIcon />,       text: "Your Health Is Our Mission" },
  { icon: <RunIcon />,        text: <>Move Better with <span className="mqb-gold">Sourabh Kumar</span></> },
  { icon: <ShieldIcon />,     text: "Certified Home Physiotherapy" },
  { icon: <HeartPulseIcon />, text: <>Heal Stronger, <span className="mqb-gold">Live Freely</span></> },
  { icon: <StarIcon />,       text: "500+ Five-Star Patient Reviews" },
  { icon: <RunIcon />,        text: "Same-Day Appointments Available" },
  { icon: <ShieldIcon />,     text: <>Expert Care, <span className="mqb-gold">At Your Doorstep</span></> },
];

function MarqueeSet() {
  return (
    <div className="mqb-set" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <span key={i} className="mqb-item">
          <span className="mqb-icon">{item.icon}</span>
          {item.text}
          {i < ITEMS.length - 1 && <span className="mqb-dot" />}
        </span>
      ))}
    </div>
  );
}

export default function MarqueeBanner() {
  return (
    <div className="mqb-wrap">
      <div className="mqb-strip" aria-label="Marquee banner">
        {/* Two sets = seamless loop (second set picks up where first ends) */}
        <div className="mqb-track">
          <MarqueeSet />
          <MarqueeSet />
        </div>
      </div>
    </div>
  );
}
