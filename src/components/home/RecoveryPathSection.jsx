import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── SVG icon paths ───────────────────────────────── */
const HomeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11.5 12 4l9 7.5"/>
    <path d="M5.5 10v9a1 1 0 0 0 1 1H10v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3.5a1 1 0 0 0 1-1v-9"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8.5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.2s-7.6-4.6-9.9-9.4C.6 7.1 2.6 3.6 6.2 3c2.2-.4 4.3.7 5.8 2.7C13.5 3.7 15.6 2.6 17.8 3c3.6.6 5.6 4.1 4.1 7.8-2.3 4.8-9.9 9.4-9.9 9.4Z"/>
  </svg>
);

const CertIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="5.4"/>
    <path d="M8.4 13.3 7 21l5-2.4L17 21l-1.4-7.7"/>
  </svg>
);

const STEPS = [
  {
    num: "01",
    icon: <TargetIcon />,
    title: "Personalized Plan",
    desc: "Designed around your condition, lifestyle, and recovery goals.",
  },
  {
    num: "02",
    icon: <CertIcon />,
    title: "Certified Therapists",
    desc: "Trusted, licensed experts guiding every stage of rehabilitation.",
  },
  {
    num: "03",
    icon: <HomeIcon />,
    title: "Home Physiotherapy",
    desc: "Convenient treatment and comfortable recovery, right at your home.",
  },
  {
    num: "04",
    icon: <HeartIcon />,
    title: "Comfortable Recovery",
    desc: "Evidence-based care that supports faster, stress-free healing.",
  },
];

/* ── Animated SVG dashed line with travelling dot ── */
function RecoveryLine({ rowRef }) {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    const row = rowRef.current;
    if (!svg || !path || !dot || !row) return;

    const updateGeometry = () => {
      const cards = row.querySelectorAll(".rp-icon-circle");
      if (cards.length < 2) return;

      const rowRect = row.getBoundingClientRect();
      const points = Array.from(cards).map((c) => {
        const r = c.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - rowRect.left,
          y: r.top + r.height / 2 - rowRect.top,
        };
      });

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        if (Math.abs(p1.y - p2.y) < 10) {
          // Horizontal line segment
          d += ` C ${mx} ${p1.y - 10}, ${mx} ${p1.y + 10}, ${p2.x} ${p2.y}`;
        } else {
          // Curve connecting rows (S-curve)
          d += ` C ${p1.x} ${my}, ${p2.x} ${my}, ${p2.x} ${p2.y}`;
        }
      }
      path.setAttribute("d", d);

      // travelling dot along the path
      const len = path.getTotalLength();
      gsap.killTweensOf(dot);

      const progress = { t: 0 };
      gsap.to(progress, {
        t: 1,
        duration: 3.2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        onUpdate() {
          const pt = path.getPointAtLength(progress.t * len);
          dot.setAttribute("cx", pt.x);
          dot.setAttribute("cy", pt.y);
        },
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
        },
      });

      // draw-in animation
      gsap.fromTo(
        path,
        { strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          },
        }
      );
    };

    // set initial dasharray to total length
    const len = pathRef.current?.getTotalLength?.() || 1000;
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    const ro = new ResizeObserver(updateGeometry);
    ro.observe(row);
    updateGeometry();

    return () => {
      ro.disconnect();
      gsap.killTweensOf(dot);
    };
  }, [rowRef]);

  return (
    <svg
      ref={svgRef}
      className="rp-line-svg"
      aria-hidden="true"
    >
      <path ref={pathRef} className="rp-line-path" />
      <circle ref={dotRef} className="rp-line-dot" r="5" cx="0" cy="0" />
    </svg>
  );
}

/* ── Main Section ── */
export default function RecoveryPathSection() {
  const sectionRef = useRef(null);
  const rowRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // heading fade-in
      gsap.from(headRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 85%",
        },
      });

      // cards stagger
      gsap.to(".rp-card", {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.13,
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 82%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="rp-section" ref={sectionRef}>
      <div className="rp-inner">
        {/* heading */}
        <div className="rp-head" ref={headRef}>
          <span className="rp-eyebrow">Your Recovery Path</span>
          <h2>From your doorstep&nbsp;to full mobility.</h2>
          <p>
            A seamless journey — personalised physiotherapy delivered
            at home by certified experts, so you heal faster and stress-free.
          </p>
        </div>

        {/* row with animated SVG line */}
        <div style={{ position: "relative" }}>
          <div className="rp-row" ref={rowRef}>
            {STEPS.map((step) => (
              <div className="rp-card-wrap" key={step.num}>
                <div className="rp-card">
                  <div className="rp-icon-circle">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* animated dashed line between icon centres */}
          <RecoveryLine rowRef={rowRef} />
        </div>
      </div>
    </section>
  );
}
