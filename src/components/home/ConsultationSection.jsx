import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowIcon, CheckIcon } from "../common/Icons.jsx";

gsap.registerPlugin(ScrollTrigger);

const points = ["Serving Delhi NCR", "No payment to book", "We respect your privacy"];

export default function ConsultationSection() {
  const [submitted, setSubmitted] = useState(false);
  const infoRef = useRef(null);

  useEffect(() => {
    const infoEl = infoRef.current;
    if (!infoEl) return;

    // Smooth ScrollTrigger entrance animation for Consultation Info
    gsap.fromTo(
      infoEl,
      { backgroundPosition: "0% 0%" },
      {
        backgroundPosition: "100% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: infoEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    // Subtle parallax on mouse move over consultation-info
    const handleMouseMove = (e) => {
      const rect = infoEl.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.04;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.04;

      gsap.to(infoEl, {
        "--circle-x": `${x}px`,
        "--circle-y": `${y}px`,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    infoEl.addEventListener("mousemove", handleMouseMove);
    return () => infoEl.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    window.setTimeout(() => {
      event.currentTarget.reset();
      setSubmitted(false);
    }, 2400);
  };

  return (
    <section className="consultation-section" id="book">
      <div className="consultation-card">
        <div className="consultation-info" ref={infoRef}>
          <span className="consultation-eyebrow">Free Consultation</span>
          <h2>
            We'll call you back
            <br />
            within the hour
          </h2>
          <p>
            Leave your name and number. We'll call to understand your problem and guide the next step. No commitment, no payment.
          </p>

          <div className="consultation-points">
            {points.map((point) => (
              <div className="consultation-point" key={point}>
                <CheckIcon size={16} stroke="currentColor" />
                {point}
              </div>
            ))}
          </div>
        </div>

        <form className="consultation-form" onSubmit={handleSubmit}>
          <span className="consultation-free-badge">100% FREE</span>
          <span className="consultation-form-title">Book your free consultation</span>

          <div className="consultation-field">
            <label htmlFor="consultation-name">Your name *</label>
            <input id="consultation-name" name="name" type="text" placeholder="e.g. Priya Sharma" required />
          </div>

          <div className="consultation-field">
            <label htmlFor="consultation-phone">Mobile number *</label>
            <div className="consultation-tel-wrap">
              <span className="consultation-tel-code">+91</span>
              <input id="consultation-phone" name="phone" type="tel" placeholder="98765 43210" required />
            </div>
          </div>

          <div className="consultation-actions">
            <button className="consultation-submit" type="submit" disabled={submitted}>
              {submitted ? "Thanks, we'll call you shortly" : "Get Free Consultation Call"}
              <span className="consultation-submit-icon">
                <ArrowIcon size={16} stroke="currentColor" />
              </span>
            </button>

            <p className="consultation-fine">No commitment, no payment.</p>
          </div>
        </form>
      </div>
    </section>
  );
}