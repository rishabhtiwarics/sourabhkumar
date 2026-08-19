import { useEffect, useState } from "react";
import { ArrowIcon, CloseIcon } from "./Icons.jsx";

export default function ConsultationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <div
      className="consultation-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* SVG Filter for Electric Border Turbulence */}
      <svg className="eb-svg-container" aria-hidden="true">
        <defs>
          <filter id="turbulent-displace-cta" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed="2" />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed="2" />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="18" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      {/* Electric Border Card Wrapper */}
      <div className="eb-card-container modal-eb-wrapper">
        <div className="eb-inner-container">
          <div className="eb-border-outer" />
          <div className="eb-main-card" />
          <div className="eb-glow-layer-1" />
          <div className="eb-glow-layer-2" />
        </div>

        {/* Modal Form Content */}
        <div className="eb-content-container">
          <div className="modal-white-card">
            {/* Close Button */}
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-header">
                <span className="modal-free-badge">100% FREE</span>
                <h2 id="modal-title" className="modal-form-title">
                  Book your free consultation
                </h2>
                <p className="modal-form-sub">
                  Fill in your details below and we&apos;ll call you back within 2 hours.
                </p>
              </div>

              <div className="modal-field">
                <label htmlFor="modal-name">Your name *</label>
                <input
                  id="modal-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  required
                />
              </div>

              <div className="modal-field">
                <label htmlFor="modal-phone">Mobile number *</label>
                <div className="modal-tel-wrap">
                  <span className="modal-tel-code">+91</span>
                  <input
                    id="modal-phone"
                    name="phone"
                    type="tel"
                    placeholder="98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="modal-field">
                <label htmlFor="modal-issue">Issue *</label>
                <textarea
                  id="modal-issue"
                  name="issue"
                  placeholder="Tell us about your pain, injury, or recovery need"
                  rows="3"
                  required
                />
              </div>

              <div className="modal-actions">
                <button className="modal-submit-btn" type="submit" disabled={submitted}>
                  {submitted ? "Thanks, we'll call you shortly!" : "Get Free Consultation Call"}
                  <span className="modal-submit-icon">
                    <ArrowIcon size={16} stroke="currentColor" />
                  </span>
                </button>

                <p className="modal-fine-text">No commitment, no payment required.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
