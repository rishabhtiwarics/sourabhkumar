import { Link, useLocation } from "react-router-dom";
import { ArrowIcon, CalendarIcon, CloseIcon, HeartIcon, LocationIcon } from "./Icons.jsx";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Links: [href, label, isExternal]
  const links = [
    { label: "Home",     to: "/",       type: "route" },
    { label: "About",    to: "/about",  type: "route" },
    { label: "Services", to: "/services", type: "route" },
    { label: "Contact",  to: "/contact",  type: "route" },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} id="sidebarOverlay" onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? "active" : ""}`} id="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <img src="/img/moveO_logo.png" alt="MoveO Health Logo" className="sidebar-logo-img" />
          </div>
          <button className="close-btn" type="button" aria-label="Close menu" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <nav className="sidebar-nav">
          {links.map(({ label, to, type }) =>
            type === "route" ? (
              <Link key={label} to={to} onClick={onClose}>
                {label} <ArrowIcon />
              </Link>
            ) : (
              <a key={label} href={to} onClick={onClose}>
                {label} <ArrowIcon />
              </a>
            )
          )}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-loc">
            <span className="icon-circle">
              <LocationIcon size={13} stroke="#F4F1E9" />
            </span>
            Delhi NCR
          </div>

          <a href={isHome ? "#book" : "/#book"} className="sidebar-book" onClick={onClose}>
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

