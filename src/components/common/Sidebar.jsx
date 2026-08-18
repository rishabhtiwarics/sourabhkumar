import { ArrowIcon, CalendarIcon, CloseIcon, HeartIcon, LocationIcon } from "./Icons.jsx";

export default function Sidebar({ isOpen, onClose }) {
  const links = [
    ["#home", "Home"],
    ["#about", "About"],
    ["#services", "Service"],
    ["#plans", "Health Plans"],
    ["#contact", "Contact"]
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} id="sidebarOverlay" onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? "active" : ""}`} id="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <span className="mark">
              <HeartIcon size={16} />
            </span>
            <span className="sidebar-logo-text">Moveo Health</span>
          </div>
          <button className="close-btn" type="button" aria-label="Close menu" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <nav className="sidebar-nav">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={onClose}>
              {label} <ArrowIcon />
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-loc">
            <span className="icon-circle">
              <LocationIcon size={13} stroke="#F4F1E9" />
            </span>
            Delhi NCR
          </div>

          <a href="#book" className="sidebar-book" onClick={onClose}>
            <span className="icon-circle">
              <CalendarIcon size={13} />
            </span>
            Book Consultation
          </a>
        </div>
      </aside>
    </>
  );
}
