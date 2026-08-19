import { useEffect, useState } from "react";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import AboutHeroSection from "../components/about/AboutHeroSection.jsx";

export default function About() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    const handleKeyDown = (e) => { if (e.key === "Escape") setIsSidebarOpen(false); };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <AboutHeroSection />
      <Footer />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
