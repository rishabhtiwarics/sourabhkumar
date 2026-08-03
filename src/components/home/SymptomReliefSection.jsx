import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import "./SymptomReliefSection.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    num: "01",
    title: "Knee & Joint Pain",
    desc: "Expert treatment for knee pain, joint stiffness, arthritis, sports injuries, and mobility improvement.",
    bg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Back & Neck Pain",
    desc: "Advanced physiotherapy for back pain, neck pain, posture correction, slipped disc, and spine-related conditions.",
    bg: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Neurological Rehabilitation",
    desc: "Specialized rehabilitation for stroke recovery, Parkinson's disease, paralysis, spinal cord injuries, and nerve disorders.",
    bg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    isDefaultActive: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18c-4.51 2-5-2-7-2M15 21v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91.5S17.73.15 15 2a13.38 13.38 0 0 0-6 0C6.27.15 5.09.5 5.09.5A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.75c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V21" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Fall Prevention & Senior Care",
    desc: "Personalized physiotherapy to improve balance, strength, flexibility, and independence for older adults.",
    bg: "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=1200&auto=format&fit=crop",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20v-8M12 12l4-4M12 12 8 8M4 20h16" />
      </svg>
    ),
  },
];

export default function SymptomReliefSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const headRef = useRef(null);
  const galleryRef = useRef(null);

  // Three.js subtle floating particles background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Particle geometry
    const particleCount = 45;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const tealColor = new THREE.Color("#0c7a65");
    const goldColor = new THREE.Color("#d9a455");

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const mixColor = Math.random() > 0.5 ? tealColor : goldColor;
      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationFrameId;
    const animate = () => {
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from(headRef.current, {
        opacity: 0,
        y: 35,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 85%",
        },
      });

      // Gallery cards stagger animation
      const cards = galleryRef.current?.querySelectorAll(".srs-pain-card");
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 45,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="page-wrap srs-wrap" ref={sectionRef}>
      <div className="srs-card-container">
        {/* ThreeJS Background Canvas */}
        <canvas ref={canvasRef} className="srs-canvas" />

        <div className="srs-content">
          {/* Header */}
          <div className="srs-head" ref={headRef}>
            <div className="srs-eyebrow">Symptom Relief</div>
            <h2>
              What's <span className="srs-accent">Bothering</span> You?
            </h2>
            <p>
              Find quick relief for your most common pain points, guided by physiotherapists who treat the cause, not just the symptom.
            </p>
          </div>

          {/* Cards Gallery */}
          <div className="srs-gallery" ref={galleryRef}>
            {CARDS.map((card) => (
              <div
                key={card.num}
                className={`srs-pain-card ${card.isDefaultActive ? "srs-default-active" : ""}`}
                style={{ backgroundImage: `url("${card.bg}")` }}
              >
                <div className="srs-badge">{card.icon}</div>
                <div className="srs-num">{card.num}</div>
                <div className="srs-card-body">
                  <div className="srs-card-title">{card.title}</div>
                  <p className="srs-card-desc">{card.desc}</p>
                  <a className="srs-card-cta" href="#book">
                    Learn more
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
