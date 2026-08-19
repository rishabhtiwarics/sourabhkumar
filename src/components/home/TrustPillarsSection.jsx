import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom icons for the 3 pillars
const MessageIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CertificateIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const HeartHandIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const PILLARS = [
  {
    id: 1,
    icon: <MessageIcon />,
    title: "Good Communicators",
    desc: "Clear communication to ensure you understand every step of treatment.",
  },
  {
    id: 2,
    icon: <CertificateIcon />,
    title: "Certified & Experienced",
    desc: "Expert physiotherapists bringing relevant clinical training and hands-on rehabilitation experience.",
  },
  {
    id: 3,
    icon: <HeartHandIcon />,
    title: "Caring & Patient-Centered",
    desc: "Dedicated care ensuring your comfort and recovery remain top priority.",
  },
];

export default function TrustPillarsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tps-item", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="page-wrap tps-wrap" ref={sectionRef}>
      <div className="tps-container">
        <div className="tps-row">
          {PILLARS.map((pillar, index) => (
            <div key={pillar.id} style={{ display: "contents" }}>
              <div className="tps-item">
                <div className="tps-icon-wrapper">{pillar.icon}</div>
                <div className="tps-text-wrap">
                  <h3 className="tps-title">{pillar.title}</h3>
                  <p className="tps-desc">{pillar.desc}</p>
                </div>
              </div>
              {index < PILLARS.length - 1 && <div className="tps-divider" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
