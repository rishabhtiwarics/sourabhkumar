import { Link } from "react-router-dom";
import { FacebookIcon, HeartIcon, InstagramIcon, LocationIcon, MailIcon, PhoneIcon } from "./Icons.jsx";
import MarqueeBanner from "./MarqueeBanner.jsx";

const contactItems = [
  { icon: <LocationIcon size={15} />, text: "Delhi NCR" },
  { icon: <MailIcon size={15} />,     text: "moveohealth@outlook.com", href: "mailto:moveohealth@outlook.com" },
  { icon: <PhoneIcon size={15} />,    text: "+91 70070 66934",         href: "tel:+917007066934" },
];

const socialLinks = [
  { label: "Instagram", icon: <InstagramIcon size={15} />, href: "https://instagram.com" },
  { label: "Facebook",  icon: <FacebookIcon  size={15} />, href: "https://facebook.com"  },
];



export default function Footer() {

  return (
    <div className="page-wrap footer-wrap">
      <MarqueeBanner />
      <footer className="site-footer" id="contact">

        {/* Logo — always navigates to home root */}
        <Link to="/" className="footer-logo">
          <span className="mark">
            <HeartIcon size={16} />
          </span>
          MoveO Health
        </Link>

        <p className="footer-about">
          Personalized physiotherapy, sports rehab, and recovery care designed to help you move better, heal stronger, and return to daily life with confidence.
        </p>

        {/* Contact row */}
        <div className="footer-contact-row">
          {contactItems.map((item) => {
            const content = (
              <>
                <span className="footer-contact-icon">{item.icon}</span>
                <span>{item.text}</span>
              </>
            );
            return item.href ? (
              <a key={item.text} href={item.href} className="footer-contact-item">
                {content}
              </a>
            ) : (
              <div key={item.text} className="footer-contact-item">
                {content}
              </div>
            );
          })}
        </div>

        {/* Social icons */}
        <div className="footer-socials" aria-label="Social links">
          {socialLinks.map(({ label, icon, href }) => (
            <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
              {icon}
            </a>
          ))}
        </div>

        {/* Watermark */}
        <div className="footer-watermark-vertical">MOVEO</div>
      </footer>

      {/* Copyright */}
      <div className="footer-copybar">
        <span>&copy; 2026 MoveO Health. All rights reserved.</span>
      </div>
    </div>
  );
}