import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const ConsultationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const TherapyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DoorstepIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const STORY_STEPS = [
  {
    id: "consultation",
    icon: <ConsultationIcon />,
    title: "Free consultation",
    desc: "Not sure what you need? Tell us what's going on and get a professional recommendation, at no cost.",
    image: "https://images.unsplash.com/photo-1645005512942-a17817fb7c11?fm=jpg&q=80&w=800&auto=format&fit=crop",
    alt: "Free consultation call",
  },
  {
    id: "therapy",
    icon: <TherapyIcon />,
    title: "Choose your therapy",
    desc: "Physiotherapy, chiropractic care, or dry needling — matched to what will actually help.",
    image: "https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?fm=jpg&q=80&w=800&auto=format&fit=crop",
    alt: "Therapist assessing a patient",
  },
  {
    id: "doorstep",
    icon: <DoorstepIcon />,
    title: "We come to you",
    desc: "A therapist visits your home, at your desired time, to help you recalibrate and get back on pace.",
    image: "https://images.unsplash.com/photo-1540205895360-4ad4cffb3aa8?fm=jpg&q=80&w=800&auto=format&fit=crop",
    alt: "Home therapy session",
  },
];

export default function StackedStorySection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);

  /* Three.js 3D Background Canvas Effect */
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const handleResize = () => {
      if (!canvas || !renderer || !camera) return;
      const width = section.clientWidth;
      const height = section.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    handleResize();

    // 3D Particles Mesh
    const count = 20;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const goldColor = new THREE.Color("#d9a455");
    const tealColor = new THREE.Color("#0c7a65");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const c = Math.random() > 0.5 ? goldColor : tealColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      particles.rotation.y += 0.0015;
      particles.rotation.x += 0.0008;

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const ro = new ResizeObserver(handleResize);
    ro.observe(section);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  /* GSAP Scroll Animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".about-services-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-services-section" ref={sectionRef}>
      <canvas ref={canvasRef} className="about-services-canvas" aria-hidden="true" />
      <div className="about-services-wrap">
        <div className="about-services-header" ref={headRef}>
          <span className="about-services-eyebrow">About Our Services</span>
          <h2>From confused about pain to back on pace, in three visits.</h2>
          <p>
            We know finding the right therapist and getting to a clinic is hard when
            you&apos;re already in pain — so here&apos;s how we bring the clinic to you.
          </p>
        </div>

        <div className="about-services-grid" ref={gridRef}>
          {STORY_STEPS.map((step) => (
            <div key={step.id} className="about-services-card">
              <div className="about-services-card-image">
                <img src={step.image} alt={step.alt} loading="lazy" />
              </div>
              <div className="about-services-card-body">
                <span className="about-services-icon-badge">{step.icon}</span>
                <h3 className="about-services-card-title">{step.title}</h3>
                <p className="about-services-card-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="about-services-cta-row">
          <a href="/#book" className="about-services-cta-btn">
            Book a free consultation
            <span className="about-services-cta-arrow">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
