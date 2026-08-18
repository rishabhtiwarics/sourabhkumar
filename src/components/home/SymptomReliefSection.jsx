import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import "./SymptomReliefSection.css";

gsap.registerPlugin(ScrollTrigger);

function ConditionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" />
      <path d="M5 8h14" />
      <path d="M6 16h12" />
      <path d="M8 3c-2 2.5-3 5.5-3 9s1 6.5 3 9" />
      <path d="M16 3c2 2.5 3 5.5 3 9s-1 6.5-3 9" />
    </svg>
  );
}

const CARDS = [
  {
    num: "01",
    title: "Head, Face & Neck Disorders",
    desc: "Temporomandibular Joint (TMJ) Disorders, Bell's Palsy & Facial Palsy, sinus-related musculoskeletal problems, cervical pain, and neck stiffness.",
    bg: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop",
    icon: <ConditionIcon />,
  },
  {
    num: "02",
    title: "Spine & Nerve Disorders",
    desc: "Cervical, thoracic & lumbar spondylosis, slip disc, spinal canal stenosis, sciatica, piriformis syndrome, SI joint dysfunction, nerve compression, and radiculopathy.",
    bg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
    isDefaultActive: true,
    icon: <ConditionIcon />,
  },
  {
    num: "03",
    title: "Shoulder & Upper Limb Conditions",
    desc: "Frozen shoulder, recurrent shoulder dislocation, shoulder instability, rotator cuff disorders, nerve-related shoulder pain, tennis elbow, golfer's elbow, wrist pain, carpal tunnel, and hand disorders.",
    bg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    icon: <ConditionIcon />,
  },
  {
    num: "04",
    title: "Hip, Knee & Lower Limb Conditions",
    desc: "Hip pain, hip joint dysfunction, knee pain, osteoarthritis, arthritis, heel pain, plantar fasciitis, foot & ankle pain, joint stiffness, and mobility problems.",
    bg: "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=1200&auto=format&fit=crop",
    icon: <ConditionIcon />,
  },
  {
    num: "05",
    title: "Rehabilitation Services",
    desc: "Pre-operative rehabilitation, post-operative rehabilitation, sports injury rehabilitation, fracture & trauma rehabilitation, neurological rehabilitation, and geriatric rehabilitation.",
    bg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop",
    icon: <ConditionIcon />,
  },
  {
    num: "06",
    title: "Posture & Lifestyle Care",
    desc: "Posture assessment & correction, ergonomic evaluation, workplace modification, gait & movement analysis, balance training, and functional training.",
    bg: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    icon: <ConditionIcon />,
  },
  {
    num: "07",
    title: "Pain Management & Wellness",
    desc: "Chronic pain management, muscle weakness, joint deformities, stress-related physical symptoms, abdominal pain, core muscle dysfunction, women's health, and general musculoskeletal conditions.",
    bg: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop",
    icon: <ConditionIcon />,
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
            <div className="srs-eyebrow">Complete Care Coverage</div>
            <h2>
              Conditions <span className="srs-accent">We Treat</span>
            </h2>
            <p>
              Moveo Health treats a wide range of pain, posture, nerve, joint, rehabilitation, and wellness conditions with focused physiotherapy care.
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
