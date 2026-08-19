import HeroSection from "../components/home/HeroSection.jsx";
import TrustPillarsSection from "../components/home/TrustPillarsSection.jsx";
import ConsultationSection from "../components/home/ConsultationSection.jsx";
import ServiceAvailabilitySection from "../components/home/ServiceAvailabilitySection.jsx";
import FAQSection from "../components/home/FAQSection.jsx";
import RecoveryPathSection from "../components/home/RecoveryPathSection.jsx";
import SymptomReliefSection from "../components/home/SymptomReliefSection.jsx";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustPillarsSection />
      <ConsultationSection />
      <RecoveryPathSection />
      <SymptomReliefSection />
      <ServiceAvailabilitySection />
      <FAQSection />
    </>
  );
}