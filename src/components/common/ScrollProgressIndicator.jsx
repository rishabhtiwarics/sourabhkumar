import { useEffect, useRef } from "react";

export default function ScrollProgressIndicator() {
  const thumbRef = useRef(null);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;
      const thumb = thumbRef.current;
      if (!thumb) return;

      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollableHeight = scrollHeight - clientHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      thumb.style.transform = `translateY(${Math.min(progress, 1) * 100 - 100}%)`;
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="scroll-indicator" aria-hidden="true">
      <div className="scroll-indicator__thumb" ref={thumbRef} />
    </div>
  );
}