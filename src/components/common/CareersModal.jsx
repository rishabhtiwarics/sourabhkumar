import { useEffect, useRef, useState } from "react";
import { ArrowIcon, CloseIcon } from "./Icons.jsx";

export default function CareersModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const formRef = useRef(null);
  const scrollThumbRef = useRef(null);

  const updateFormScrollProgress = () => {
    const form = formRef.current;
    const thumb = scrollThumbRef.current;
    if (!form || !thumb) return;

    const scrollableHeight = form.scrollHeight - form.clientHeight;
    const progress = scrollableHeight > 0 ? form.scrollTop / scrollableHeight : 0;
    thumb.style.transform = `translateY(${Math.min(progress, 1) * 100 - 100}%)`;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const frameId = window.requestAnimationFrame(updateFormScrollProgress);
    window.addEventListener("resize", updateFormScrollProgress);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateFormScrollProgress);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setResumeName("");
      onClose();
    }, 2400);
  };

  return (
    <div
      className="consultation-modal-overlay careers-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="careers-modal-title"
    >
      <div className="modal-card-wrapper careers-modal-card-wrapper">
        <svg className="eb-svg-container" aria-hidden="true">
          <defs>
            <filter id="turbulent-displace-careers" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="3" />
              <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
              </feOffset>
              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="3" />
              <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
              </feOffset>
              <feComposite in="offsetNoise1" in2="offsetNoise2" result="combinedNoise" />
              <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="18" xChannelSelector="R" yChannelSelector="B" />
            </filter>
          </defs>
        </svg>

        <div className="eb-card-container modal-eb-wrapper careers-modal-eb-wrapper">
          <div className="eb-inner-container">
            <div className="eb-border-outer" />
            <div className="eb-main-card careers-eb-main-card" />
            <div className="eb-glow-layer-1" />
            <div className="eb-glow-layer-2" />
          </div>

          <div className="eb-content-container">
            <div className="modal-white-card careers-modal-card">
              <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close careers application">
                <CloseIcon />
              </button>

              <form className="modal-form careers-form" ref={formRef} onScroll={updateFormScrollProgress} onSubmit={handleSubmit}>
                <div className="modal-header">
                  <span className="modal-free-badge careers-badge">Careers</span>
                  <h2 id="careers-modal-title" className="modal-form-title">Apply as a physiotherapist</h2>
                  <p className="modal-form-sub">Share your resume and a few details - we'll follow up if it's a fit.</p>
                </div>

                <div className="modal-field careers-upload-field">
                  <label htmlFor="careers-resume">Resume *</label>
                  <label className="careers-upload-box" htmlFor="careers-resume">
                    <span className="careers-upload-title">{resumeName || "Drop your resume here, or click to browse"}</span>
                    <span className="careers-upload-note">PDF or DOCX, up to 10MB</span>
                  </label>
                  <input
                    id="careers-resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => setResumeName(e.target.files?.[0]?.name || "")}
                    required
                  />
                </div>

                <div className="careers-field-grid">
                  <div className="modal-field">
                    <label htmlFor="careers-name">Full name *</label>
                    <input id="careers-name" name="name" type="text" placeholder="Your full name" required />
                  </div>

                  <div className="modal-field">
                    <label htmlFor="careers-contact">Contact info *</label>
                    <input id="careers-contact" name="contact" type="text" placeholder="Phone or email" required />
                  </div>

                  <div className="modal-field">
                    <label htmlFor="careers-experience">Years of experience *</label>
                    <input id="careers-experience" name="experience" type="text" placeholder="e.g. 3 years" required />
                  </div>

                  <div className="modal-field">
                    <label htmlFor="careers-expertise">Field of expertise *</label>
                    <input id="careers-expertise" name="expertise" type="text" placeholder="Ortho, neuro, sports..." required />
                  </div>
                </div>

                <div className="modal-field">
                  <label htmlFor="careers-portfolio">Portfolio / LinkedIn link</label>
                  <input id="careers-portfolio" name="portfolio" type="url" placeholder="https://linkedin.com/in/your-profile" />
                </div>

                <div className="modal-actions">
                  <button className="modal-submit-btn" type="submit" disabled={submitted}>
                    {submitted ? "Application received" : "Submit application"}
                    <span className="modal-submit-icon">
                      <ArrowIcon size={16} stroke="currentColor" />
                    </span>
                  </button>
                  <p className="modal-fine-text">We review every application with care.</p>
                </div>
              </form>

              <div className="careers-modal-scroll-indicator" aria-hidden="true">
                <div className="careers-modal-scroll-indicator__thumb" ref={scrollThumbRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
