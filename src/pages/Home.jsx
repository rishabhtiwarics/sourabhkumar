import HeroSection from "../components/home/HeroSection.jsx";
import TrustPillarsSection from "../components/home/TrustPillarsSection.jsx";
import ConsultationSection from "../components/home/ConsultationSection.jsx";
import StackedStorySection from "../components/home/StackedStorySection.jsx";
import ServiceAvailabilitySection from "../components/home/ServiceAvailabilitySection.jsx";
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
      <StackedStorySection />
    </>
  );
}
