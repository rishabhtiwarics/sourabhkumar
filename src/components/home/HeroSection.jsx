import { useEffect, useRef } from "react";
import { CalendarIcon, PhoneIcon } from "../common/Icons.jsx";

export default function HeroSection() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  // --- 2D Animated Wave & Interactive Pills ---
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const lineCount = 4;
    const lineColors = ["#2DD4BF", "#A78BFA", "#FBBF24", "#FB7185"];
    const baseReach = [0.3, 0.35, 0.35, 0.3];
    const activeReach = 0.7;
    const pillLabels = ["Knee pain", "Back & Neck pain", "Sports injury", "Senior care"];
    const phases = ["grow", "pillopen", "hold", "pillclose", "shrink", "pause"];
    const durations = { grow: 700, pillopen: 260, hold: 1300, pillclose: 220, shrink: 650, pause: 260 };
    const rgbCache = {};

    let lines = [];
    let cssWidth = 0;
    let cssHeight = 0;
    let rafId = null;
    let paused = false;
    let resizeTimeout = null;

    const seq = {
      activeIndex: 0,
      phase: "grow",
      phaseStart: 0
    };

    function easeInOutCubic(x) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    function hexToRgb(hex) {
      const value = hex.replace("#", "");
      const num = parseInt(value, 16);
      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }

    function rgba(hex, alpha) {
      if (!rgbCache[hex]) rgbCache[hex] = hexToRgb(hex);
      const color = rgbCache[hex];
      return `rgba(${color.r},${color.g},${color.b},${alpha})`;
    }

    function makeLine(index, total) {
      return {
        color: lineColors[index % lineColors.length],
        alpha: 0.5 + (index % 2 === 0 ? 0.06 : 0),
        lineWidth: 1.3 + Math.random() * 0.9,
        baseY: (index + 1) / (total + 1),
        amp1: 12 + Math.random() * 12,
        amp2: 5 + Math.random() * 7,
        freq1: 0.9 + Math.random() * 0.6,
        freq2: 2.1 + Math.random() * 1.2,
        speed: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        baseReach: baseReach[index % baseReach.length],
        reach: baseReach[index % baseReach.length],
        fade: 0.16,
        label: pillLabels[index % pillLabels.length]
      };
    }

    function updateSequence(timestamp) {
      if (seq.phaseStart === 0) seq.phaseStart = timestamp;
      const elapsed = timestamp - seq.phaseStart;
      const duration = durations[seq.phase];
      if (elapsed >= duration) {
        const index = phases.indexOf(seq.phase);
        seq.phase = phases[(index + 1) % phases.length];
        seq.phaseStart = timestamp;
        if (seq.phase === "grow") {
          seq.activeIndex = (seq.activeIndex + 1) % lines.length;
        }
      }
    }

    function computeLineReach(line, index, timestamp) {
      if (index !== seq.activeIndex) {
        line.reach = line.baseReach;
        return;
      }
      const elapsed = timestamp - seq.phaseStart;
      const duration = durations[seq.phase];
      const progress = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(progress);

      if (seq.phase === "grow") {
        line.reach = line.baseReach + (activeReach - line.baseReach) * eased;
      } else if (seq.phase === "shrink") {
        line.reach = activeReach - (activeReach - line.baseReach) * eased;
      } else if (seq.phase === "pause") {
        line.reach = line.baseReach;
      } else {
        line.reach = activeReach;
      }
    }

    function getPillScale(timestamp) {
      const elapsed = timestamp - seq.phaseStart;
      const duration = durations[seq.phase];
      const progress = Math.min(1, elapsed / Math.max(duration, 1));
      if (seq.phase === "pillopen") return easeInOutCubic(progress);
      if (seq.phase === "hold") return 1;
      if (seq.phase === "pillclose") return 1 - easeInOutCubic(progress);
      return 0;
    }

    function waveY(line, x, time) {
      const nx = x / Math.max(cssWidth, 1);
      const waveOne = Math.sin(nx * Math.PI * 2 * line.freq1 + time * line.speed + line.phase) * line.amp1;
      const waveTwo = Math.sin(nx * Math.PI * 2 * line.freq2 - time * line.speed * 1.4 + line.phase) * line.amp2;
      return line.baseY * cssHeight + waveOne + waveTwo;
    }

    function roundRect(context, x, y, width, height, radius) {
      context.beginPath();
      context.moveTo(x + radius, y);
      context.arcTo(x + width, y, x + width, y + height, radius);
      context.arcTo(x + width, y + height, x, y + height, radius);
      context.arcTo(x, y + height, x, y, radius);
      context.arcTo(x, y, x + width, y, radius);
      context.closePath();
    }

    function drawLine(line, time) {
      const step = 6;
      const reachPx = line.reach * cssWidth;
      const fadeStartPx = reachPx * (1 - line.fade);
      let prevX = -step;
      let prevY = waveY(line, prevX, time);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = line.lineWidth;

      for (let x = 0; x <= reachPx + step; x += step) {
        const clampedX = Math.min(x, reachPx);
        const y = waveY(line, clampedX, time);
        let segAlpha = line.alpha;

        if (clampedX > fadeStartPx) {
          const fadeProgress = (clampedX - fadeStartPx) / Math.max(reachPx - fadeStartPx, 1);
          segAlpha = line.alpha * (1 - Math.min(1, fadeProgress));
        }

        if (segAlpha > 0.003) {
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(clampedX, y);
          ctx.strokeStyle = rgba(line.color, segAlpha);
          ctx.shadowColor = rgba(line.color, segAlpha * 0.9);
          ctx.shadowBlur = 6;
          ctx.stroke();
        }

        prevX = clampedX;
        prevY = y;
        if (clampedX >= reachPx) break;
      }
      ctx.shadowBlur = 0;
    }

    function drawTipDot(line, time) {
      const reachPx = line.reach * cssWidth;
      const y = waveY(line, reachPx, time);
      const pulse = 0.7 + Math.sin(time * 1.6 + line.phase) * 0.3;

      ctx.beginPath();
      ctx.fillStyle = rgba(line.color, Math.min(1, (line.alpha + 0.3) * pulse));
      ctx.shadowColor = rgba(line.color, 0.95);
      ctx.shadowBlur = 9;
      ctx.arc(reachPx, y, 2.6 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function drawPill(line, time, scale) {
      if (scale <= 0.01) return;

      const reachPx = activeReach * cssWidth;
      const x = reachPx;
      const y = waveY(line, reachPx, time);
      ctx.font = "600 12px 'Plus Jakarta Sans', sans-serif";

      const padL = 22;
      const padR = 14;
      const pillW = ctx.measureText(line.label).width + padL + padR;
      const pillH = 26;
      const gap = 12;
      let pillX = x + gap;
      if (pillX + pillW > cssWidth - 4) pillX = x - gap - pillW;
      let pillY = y - pillH / 2;
      pillY = Math.max(2, Math.min(cssHeight - pillH - 2, pillY));

      const cx = pillX + pillW / 2;
      const cy = pillY + pillH / 2;

      ctx.save();
      ctx.globalAlpha = scale;
      ctx.translate(cx, cy);
      ctx.scale(0.72 + 0.28 * scale, 0.72 + 0.28 * scale);
      ctx.translate(-cx, -cy);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(pillX < x ? pillX + pillW : pillX, y);
      ctx.strokeStyle = rgba(line.color, 0.55);
      ctx.lineWidth = 1;
      ctx.stroke();

      roundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
      ctx.fillStyle = "rgba(1,47,37,0.92)";
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = rgba(line.color, 0.9);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = line.color;
      ctx.shadowColor = rgba(line.color, 0.9);
      ctx.shadowBlur = 6;
      ctx.arc(pillX + 13, cy, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#F4F1E9";
      ctx.font = "600 12px 'Plus Jakarta Sans', sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(line.label, pillX + padL, cy + 0.5);
      ctx.restore();
    }

    function resize() {
      cssWidth = wrapper.clientWidth;
      cssHeight = wrapper.clientHeight;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      lines = Array.from({ length: lineCount }, (_, index) => makeLine(index, lineCount));
      seq.activeIndex = 0;
      seq.phase = "grow";
      seq.phaseStart = 0;
    }

    function frame(timestamp) {
      if (!paused) {
        const time = timestamp * 0.001;
        updateSequence(timestamp);
        ctx.clearRect(0, 0, cssWidth, cssHeight);

        lines.forEach((line, index) => {
          computeLineReach(line, index, timestamp);
          drawLine(line, time);
          drawTipDot(line, time);
        });

        const activeLine = lines[seq.activeIndex];
        const pillScale = getPillScale(timestamp);
        if (activeLine && pillScale > 0) drawPill(activeLine, time, pillScale);
      }
      rafId = requestAnimationFrame(frame);
    }

    function handleResize() {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resize, 120);
    }

    function handleVisibility() {
      paused = document.hidden;
    }

    resize();
    rafId = requestAnimationFrame(frame);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("resize", handleResize);

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            paused = !entry.isIntersecting || document.hidden;
          });
        })
      : null;

    if (observer) observer.observe(wrapper);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div className="page-wrap">
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">Physiotherapy & Moveo Health</span>
            <h1>
              Rebuild Movement,
              <br />
              Recover <span className="accent">Without Limits</span>
            </h1>
            <p>
              Moveo Health pairs licensed physiotherapists with tailored recovery plans - from sports injuries to post-surgical rehab - so you get back to your life, not just your feet.
            </p>

            <div className="hero-cta">
              <a href="#book" className="btn-book">
                <span className="icon-circle">
                  <CalendarIcon stroke="#012F25" />
                </span>
                <span className="label">Book Consultation</span>
              </a>
              <a href="tel:+917007066934" className="btn-ghost">
                <span className="icon-circle">
                  <PhoneIcon size={16} stroke="#F4F1E9" />
                </span>
                <span className="call-now-text">
                  Call Now
                  <br />
                  +91 70070 66934
                </span>
              </a>
            </div>
          </div>
        </div>

        <div id="hero-animation-wrapper" ref={wrapperRef}>
          <canvas id="hero-animation" ref={canvasRef}></canvas>
        </div>
      </section>
    </div>
  );
}
