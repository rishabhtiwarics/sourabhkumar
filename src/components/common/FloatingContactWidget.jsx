import { useEffect, useState } from "react";
import { CheckIcon, CloseIcon, CopyIcon, LocationIcon, PhoneIcon, WhatsAppIcon } from "./Icons.jsx";

export default function FloatingContactWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPhonePopupOpen, setIsPhonePopupOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        // Show floating icons after scrolling past hero section
        setIsVisible(heroBottom < 100);
      } else {
        setIsVisible(window.scrollY > 400);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+91 70070 66934");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="floating-contact-container">
      {/* Phone Contact Modal / Card */}
      {isPhonePopupOpen && (
        <div className="contact-popup-card">
          <div className="contact-popup-header">
            <div className="contact-popup-badge">
              <span className="dot-pulse" />
              CONTACT MoveO Health
            </div>
            <button
              className="popup-close-btn"
              onClick={() => setIsPhonePopupOpen(false)}
              aria-label="Close popup"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="contact-popup-timing">Working Hours: 9:00 AM - 5:30 PM</div>

          <div className="contact-popup-body">
            {/* Call Now Box */}
            <div className="popup-info-box">
              <a href="tel:+917007066934" className="popup-icon-btn phone-btn">
                <PhoneIcon size={20} stroke="#FFFFFF" />
              </a>
              <div className="popup-info-text">
                <span className="popup-label">Call now</span>
                <a href="tel:+917007066934" className="popup-value">
                  +91 70070 66934
                </a>
              </div>
              <button
                className="popup-copy-btn"
                onClick={handleCopyPhone}
                title="Copy Phone Number"
              >
                {copiedPhone ? <CheckIcon size={18} stroke="#035D4E" /> : <CopyIcon size={18} />}
              </button>
            </div>

            {/* Address Box */}
            <div className="popup-info-box">
              <div className="popup-icon-btn location-btn">
                <LocationIcon size={20} stroke="#FFFFFF" />
              </div>
              <div className="popup-info-text">
                <span className="popup-label">Visit our clinic</span>
                <p className="popup-value address-text">
                  Delhi NCR
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vertical Stack Icons */}
      <div className="floating-icons-stack">
        {/* WhatsApp Icon */}
        <div className="floating-btn-wrapper">
          <span className="floating-btn-label whatsapp-label">Chat on WhatsApp</span>
          <a
            href="https://wa.me/917007066934?text=Hello%20MoveO%20Health,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn whatsapp-btn"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon size={26} fill="#FFFFFF" />
          </a>
        </div>

        {/* Phone / Contact Hover & Click Icon */}
        <div className="floating-btn-wrapper">
          <span className="floating-btn-label">Call &amp; Address</span>
          <button
            className={`floating-btn phone-trigger-btn ${isPhonePopupOpen ? "active" : ""}`}
            onClick={() => setIsPhonePopupOpen(!isPhonePopupOpen)}
            title="Call & Clinic Info"
          >
            <PhoneIcon size={22} stroke="#FFFFFF" />
          </button>
        </div>
      </div>
    </div>
  );
}
