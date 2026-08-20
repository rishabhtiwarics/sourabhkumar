import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { CalendarIcon, ClockIcon, HeartIcon, LocationIcon, MailIcon, MenuIcon, PhoneIcon, StarIcon } from "./Icons.jsx";

/* ── Logo: always goes to home root ─────────────────────────── */
function Logo() {
  return (
    <Link to="/" className="logo">
      <img src="/img/moveO_logo.png" alt="MoveO Health Logo" className="header-logo-img" />
    </Link>
  );
}

/* ── Top bar rotating messages + contact ────────────────────── */
function TopBar() {
  const messages = useMemo(
    () => [
      { icon: <PhoneIcon />,                              text: "Call Now: +91 70070 66934" },
      { icon: <CalendarIcon stroke="currentColor" />,     text: "Free First Consultation This Week" },
      { icon: <ClockIcon />,                              text: "Same-Day Appointments Available" },
      { icon: <StarIcon />,                               text: "500+ Five-Star Patient Reviews" },
    ],
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % messages.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [messages.length]);

  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <span className="topbar-item">
            <span className="rotator" id="topRotator">
              {messages.map((msg, idx) => (
                <span key={msg.text} className={`rotator-item ${idx === activeIndex ? "active" : ""}`}>
                  {msg.icon}
                  <span>{msg.text}</span>
                </span>
              ))}
            </span>
          </span>
        </div>
        <div className="topbar-right">
          <span className="topbar-item">
            <LocationIcon />
            Delhi NCR
          </span>
          <a href="mailto:moveohealth@outlook.com" className="topbar-item">
            <MailIcon />
            moveohealth@outlook.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Header({ onMenuClick }) {
  const headerRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  /* "Book Consultation" scrolls to #book on home, navigates to /#book otherwise */
  const bookHref = isHome ? "#book" : "/#book";

  useEffect(() => {
    const syncTopbarHeight = () => {
      const topbar = document.querySelector(".topbar");
      if (topbar) {
        document.documentElement.style.setProperty("--topbar-h", `${topbar.offsetHeight}px`);
      }
    };

    syncTopbarHeight();
    window.addEventListener("resize", syncTopbarHeight);

    let isShrunk = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const header = headerRef.current;
      if (!header) return;

      const isMobile = window.innerWidth <= 768;

      if (scrollY > 35 && !isShrunk) {
        isShrunk = true;
        header.classList.add("scrolled");
        gsap.to(header, {
          width: isMobile ? "90%" : "60%",
          top: "16px",
          duration: 0.85,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      } else if (scrollY <= 35 && isShrunk) {
        isShrunk = false;
        header.classList.remove("scrolled");
        const topbarH = document.querySelector(".topbar")?.offsetHeight || 41;
        gsap.to(header, {
          width: isMobile ? "calc(100% - 28px)" : "calc(100% - 44px)",
          top: `${topbarH}px`,
          duration: 0.85,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", syncTopbarHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <TopBar />
      <header className="site-header" ref={headerRef}>
        <div className="header-inner">
          <Logo />
          <div className="header-actions">
            <a href={bookHref} className="btn-book">
              <span className="icon-circle">
                <CalendarIcon />
              </span>
              <span className="label">Book Consultation</span>
            </a>
            <button className="burger-btn" type="button" aria-label="Open menu" onClick={onMenuClick}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
