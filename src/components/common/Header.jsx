import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { CalendarIcon, ClockIcon, HeartIcon, LocationIcon, MailIcon, MenuIcon, PhoneIcon, StarIcon } from "./Icons.jsx";

function Logo() {
  return (
    <a href="#home" className="logo">
      <span className="mark">
        <HeartIcon />
      </span>
      MoveO Health
    </a>
  );
}

function TopBar() {
  const messages = useMemo(
    () => [
      { icon: <PhoneIcon />, text: "Call Now: +91 70070 66934" },
      { icon: <CalendarIcon stroke="currentColor" />, text: "Free First Consultation This Week" },
      { icon: <ClockIcon />, text: "Same-Day Appointments Available" },
      { icon: <StarIcon />, text: "500+ Five-Star Patient Reviews" }
    ],
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % messages.length);
    }, 3200);
    return () => window.clearInterval(intervalId);
  }, [messages.length]);

  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <span className="topbar-item">
            <span className="rotator" id="topRotator">
              {messages.map((message, index) => (
                <span key={message.text} className={`rotator-item ${index === activeIndex ? "active" : ""}`}>
                  {message.icon}
                  <span>{message.text}</span>
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
          overwrite: "auto"
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
          overwrite: "auto"
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
            <a href="#book" className="btn-book">
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

