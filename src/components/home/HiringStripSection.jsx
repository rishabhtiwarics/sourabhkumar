import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "../common/Icons.jsx";
import "./HiringStripSection.css";

const expertiseOptions = [
  "Orthopedic",
  "Sports",
  "Neuro",
  "Pediatric",
  "Geriatric",
  "Post-Surgical",
];

function UploadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <path d="m8 11 4 4 4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

export default function HiringStripSection() {
  const dropdownRef = useRef(null);
  const [resumeName, setResumeName] = useState("Resume");
  const [expertise, setExpertise] = useState("");
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExpertiseOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setResumeName("Resume");
      return;
    }

    setResumeName(file.name.length > 16 ? `${file.name.slice(0, 14)}...` : file.name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    window.setTimeout(() => {
      event.currentTarget.reset();
      setResumeName("Resume");
      setExpertise("");
      setIsExpertiseOpen(false);
      setSubmitted(false);
    }, 2200);
  };

  return (
    <section className="hiring-strip-section" aria-labelledby="hiring-strip-title">
      <div className="hiring-strip-shell">
        <div className="hiring-strip-head">
          <div>
            <span className="hiring-strip-eyebrow">We're hiring</span>
            <h2 id="hiring-strip-title">Physiotherapists - join us</h2>
            <p>Fill this quick strip and our hiring team will reach out within 48 hours.</p>
          </div>
          <span className="hiring-strip-badge">Takes less than a minute</span>
        </div>

        <form className="hiring-strip-form" onSubmit={handleSubmit}>
          <div className="hiring-strip-field">
            <input type="text" name="name" placeholder="Full name" required />
          </div>
          <div className="hiring-strip-field">
            <input type="tel" name="phone" placeholder="Contact number" required />
          </div>
          <div className="hiring-strip-field hiring-strip-field-small">
            <input type="number" name="experience" placeholder="Yrs experience" min="0" required />
          </div>
          <div className="hiring-strip-field hiring-strip-select-field" ref={dropdownRef}>
            <input type="hidden" name="expertise" value={expertise} required />
            <button
              className={`hiring-strip-select ${isExpertiseOpen ? "open" : ""} ${expertise ? "selected" : ""}`}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isExpertiseOpen}
              onClick={() => setIsExpertiseOpen((open) => !open)}
            >
              <span>{expertise || "Expertise"}</span>
              <ArrowIcon size={14} stroke="currentColor" />
            </button>
            {isExpertiseOpen && (
              <div className="hiring-strip-options" role="listbox">
                {expertiseOptions.map((option) => (
                  <button
                    className={`hiring-strip-option ${expertise === option ? "active" : ""}`}
                    type="button"
                    role="option"
                    aria-selected={expertise === option}
                    key={option}
                    onClick={() => {
                      setExpertise(option);
                      setIsExpertiseOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="hiring-strip-field">
            <input type="url" name="portfolio" placeholder="Portfolio link" />
          </div>
          <label className="hiring-strip-file-btn">
            <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            <UploadIcon />
            <span>{resumeName}</span>
          </label>
          <button className="hiring-strip-submit" type="submit" aria-label="Submit application" disabled={submitted}>
            {submitted ? "Sent" : <ArrowIcon size={16} stroke="currentColor" />}
          </button>
        </form>
      </div>
    </section>
  );
}