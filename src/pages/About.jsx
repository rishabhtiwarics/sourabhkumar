import InnerHeroSection from "../components/common/InnerHeroSection.jsx";

export default function About() {
  return (
    <>
      <InnerHeroSection
        id="about"
        eyebrow="About Moveo Health"
        title="Recovery, guided by a therapist,"
        accent="from the comfort of home."
        description="Pain, injury, surgery, or reduced mobility can make daily life difficult. We bring qualified physiotherapy care to your door, so you can recover somewhere familiar and comfortable."
        backgroundImage="/img/herobg.png"
      />
    </>
  );
}
