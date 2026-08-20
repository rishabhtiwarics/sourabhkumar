import InnerHeroSection from "../components/common/InnerHeroSection.jsx";
import FAQSection from "../components/home/FAQSection.jsx";

export default function Services() {
  return (
    <>
      <InnerHeroSection
        id="services"
        eyebrow="Our Services"
        title="Personalised therapy for pain,"
        accent="mobility, recovery, and strength."
        description="From physiotherapy and chiropractic care to post-surgery rehabilitation, MoveO Health brings focused treatment plans to your home with experienced therapists."
        backgroundImage="/img/herobg.png"
      />
      <FAQSection />
    </>
  );
}
