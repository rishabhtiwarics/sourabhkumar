import { FacebookIcon, HeartIcon, InstagramIcon, LinkedInIcon, LocationIcon, MailIcon, PhoneIcon, YouTubeIcon } from "./Icons.jsx";
import MarqueeBanner from "./MarqueeBanner.jsx";

const contactItems = [
  { icon: <LocationIcon size={15} />, text: "Sector 21, Gurugram, Delhi NCR" },
  { icon: <MailIcon size={15} />, text: "hello@physiog.in", href: "mailto:hello@physiog.in" },
  { icon: <PhoneIcon size={15} />, text: "+91 76919 07845", href: "tel:+917691907845" }
];

const socialLinks = [
  { label: "Instagram", icon: <InstagramIcon size={15} />, href: "#" },
  { label: "Facebook",  icon: <FacebookIcon  size={15} />, href: "#" },
  { label: "LinkedIn",  icon: <LinkedInIcon  size={15} />, href: "#" },
  { label: "YouTube",   icon: <YouTubeIcon   size={15} />, href: "#" },
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
          Sourabh Kumar
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
        <div className="footer-watermark-vertical">SOURABH</div>
      </footer>

      {/* Copyright below the footer card */}
      <div className="footer-copybar">
        <span>&copy; 2026 Sourabh Kumar. All rights reserved.</span>
      </div>
    </div>
  );
}