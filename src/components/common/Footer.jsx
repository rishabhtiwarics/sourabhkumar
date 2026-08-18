import { FacebookIcon, HeartIcon, InstagramIcon, LocationIcon, MailIcon, PhoneIcon } from "./Icons.jsx";
import MarqueeBanner from "./MarqueeBanner.jsx";

const contactItems = [
  { icon: <LocationIcon size={15} />, text: "Delhi NCR" },
  { icon: <MailIcon size={15} />, text: "hello@moveohealth.in", href: "mailto:hello@moveohealth.in" },
  { icon: <PhoneIcon size={15} />, text: "+91 70070 66934", href: "tel:+917007066934" }
];

const socialLinks = [
  { label: "Instagram", icon: <InstagramIcon size={15} />, href: "#" },
  { label: "Facebook",  icon: <FacebookIcon  size={15} />, href: "#" },
];

export default function Footer() {
  return (
    <div className="page-wrap footer-wrap">
      <MarqueeBanner />
      <footer className="site-footer" id="contact">

        <a href="#home" className="footer-logo">
          <span className="mark">
            <HeartIcon size={16} />
          </span>
          Moveo Health
        </a>

        <p className="footer-about">
          Personalized physiotherapy, sports rehab, and recovery care designed to help you move better, heal stronger, and return to daily life with confidence.
        </p>

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

        <div className="footer-socials" aria-label="Social links">
          {socialLinks.map(({ label, icon, href }) => (
            <a key={label} href={href} aria-label={label}>
              {icon}
            </a>
          ))}
        </div>


        {/* Watermark vertical on left side */}
        <div className="footer-watermark-vertical">MOVEO</div>
      </footer>

      {/* Copyright below the footer card */}
      <div className="footer-copybar">
        <span>&copy; 2026 Moveo Health. All rights reserved.</span>
      </div>
    </div>
  );
}