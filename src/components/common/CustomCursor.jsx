import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return undefined;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");

    let ringX = mouseX;
    let ringY = mouseY;
    const LERP = 0.16;

    const ticker = gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;
      setRingX(ringX);
      setRingY(ringY);
    });

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotX(mouseX);
      setDotY(mouseY);
    };

    // Hover animations
    const onEnterInteractive = () => {
      gsap.to(ring, {
        scale: 2.2,
        borderColor: "rgba(217,164,85,0.9)",
        backgroundColor: "rgba(217,164,85,0.12)",
        backdropFilter: "brightness(112%)",
        boxShadow: "0 0 20px rgba(217,164,85,0.3)",
        duration: 0.35,
        ease: "power2.out"
      });
      gsap.to(dot, { scale: 0.5, opacity: 0.6, duration: 0.25 });
    };

    const onEnterText = (e) => {
      if (e.target.closest("a, button, [role='button']")) return;
      gsap.to(ring, {
        scale: 1.65,
        borderColor: "rgba(217,164,85,0.95)",
        backgroundColor: "rgba(244,241,233,0.18)",
        backdropFilter: "contrast(140%) brightness(122%) saturate(120%)",
        boxShadow: "inset 0 1px 3px rgba(255,255,255,0.4), 0 4px 16px rgba(217,164,85,0.35)",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(dot, { scale: 0.3, opacity: 0.5, duration: 0.2 });
    };

    const onLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(217,164,85,0.65)",
        backgroundColor: "transparent",
        backdropFilter: "none",
        boxShadow: "none",
        duration: 0.35,
        ease: "power2.out"
      });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.25 });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.15 });
      gsap.to(dot, { scale: 1.4, duration: 0.15 });
    };
    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const interactiveTargets = "a, button, [role='button'], input, label, select, textarea, .btn-book, .btn-ghost, .burger-btn, .footer-socials a, .sidebar-nav a";
    const textTargets = "h1, h2, h3, h4, h5, h6, p, span, li";

    const bindEvents = () => {
      document.querySelectorAll(interactiveTargets).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeave);
      });

      document.querySelectorAll(textTargets).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterText);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnterText);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    bindEvents();

    const mutationObserver = new MutationObserver(bindEvents);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const onLeaveWindow = () => gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
    const onEnterWindow = () => gsap.to([ring, dot], { opacity: 1, duration: 0.2 });
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Lagging Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          border: "1.5px solid rgba(217,164,85,0.65)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform"
        }}
      />
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          background: "rgba(217,164,85,0.95)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 100000,
          willChange: "transform",
          boxShadow: "0 0 8px rgba(217,164,85,0.8)"
        }}
      />
    </>
  );
}
