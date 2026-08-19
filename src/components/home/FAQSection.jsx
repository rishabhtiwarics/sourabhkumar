import { useState } from "react";
import { ArrowIcon } from "../common/Icons.jsx";

const faqs = [
  {
    question: "What is home visit physiotherapy?",
    answer: "It's physiotherapy treatment given at your home instead of a clinic - the same assessment, hands-on treatment, and exercise guidance, just without the travel. It's especially useful if you're dealing with pain, recovering from surgery, or find it hard to get around.",
  },
  {
    question: "Is this only for elderly or seriously ill patients?",
    answer: "No. Home visits work well for anyone - a working professional with back pain from long desk hours, a new mother with post-delivery aches, an athlete recovering from a sprain, or a senior citizen who simply prefers not to travel. If getting to a clinic is inconvenient, home visits make sense.",
  },
  {
    question: "Do I need a doctor's prescription to book?",
    answer: "Not usually. You can book directly for most common issues like back pain, neck pain, or joint pain. If you're recovering from surgery or have a specific medical condition, sharing your doctor's notes or reports helps the therapist plan your treatment more safely - but it's not a strict requirement to get started.",
  },
  {
    question: "How much does a home visit cost, and how do I pay?",
    answer: "Charges depend on the condition, session duration, and number of sessions needed - this is confirmed with you before booking, with no hidden costs. Payment can usually be made via UPI, card, or cash after the session.",
  },
  {
    question: "Do you offer packages for multiple sessions?",
    answer: "Yes, if your treatment plan needs several sessions, a package works out more affordable than paying per visit, and it's better for consistent recovery. Your therapist will recommend one based on your condition.",
  },
  {
    question: "What areas do you cover?",
    answer: "We currently serve Delhi NCR and Gurugram. Share your location while booking and we'll confirm availability right away.",
  },
  {
    question: "Can I choose a male or female therapist?",
    answer: "Yes, you can mention your preference while booking and we'll try to match you accordingly, based on availability in your area.",
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer: "Life happens - just let us know a few hours in advance through the booking channel and we'll reschedule at no extra cost. Last-minute cancellations on the day of the visit may be treated differently, so check the policy shared at booking.",
  },
  {
    question: "What should I keep ready before the therapist arrives?",
    answer: "Keep any medical reports, scan results, or prescriptions handy, clear a small open space, and wear comfortable, loose clothing that lets you move freely.",
  },
  {
    question: "Do I need to buy any equipment?",
    answer: "No, not for the first visit. The therapist brings whatever's needed for assessment and treatment. If your recovery calls for a simple tool later - like a resistance band or a stick - they'll tell you exactly what to get.",
  },
  {
    question: "How long does a session take, and will it hurt?",
    answer: "Most sessions run 45-60 minutes. Treatment is adjusted to what you can tolerate. Some exercises may feel slightly uncomfortable as you regain movement, but sharp or unusual pain should always be flagged to the therapist right away.",
  },
  {
    question: "Can a family member stay in the room during the session?",
    answer: "Yes, and it's often encouraged - especially for elderly patients or anyone recovering from a stroke or surgery, so a family member also learns how to help with exercises and daily movement safely between visits.",
  },
  {
    question: "Is it safe to have a therapist visit my home?",
    answer: "Yes. Therapists are verified and trained professionals, and follow standard hygiene practices during every visit. If you have any safety concerns, you're welcome to raise them before booking.",
  },
  {
    question: "How many sessions will I actually need?",
    answer: "It depends on your condition and how consistently you follow the home exercises in between visits. Simple issues like a mild strain may need just a handful of sessions; post-surgical or neurological recovery usually takes longer. Your therapist will give you a realistic estimate after the first assessment.",
  },
  {
    question: "Will I get exercises to do on my own?",
    answer: "Yes. Every plan includes a personalized home exercise routine, because consistent practice between visits is what actually drives recovery, not just the session itself.",
  },
  {
    question: "What if I don't see any improvement?",
    answer: "Tell your therapist directly - plans are adjusted based on how you're responding. If progress genuinely stalls, they'll be upfront about it and may suggest further tests or a specialist referral rather than continuing sessions that aren't helping.",
  },
  {
    question: "Can I book on behalf of a parent or relative who lives elsewhere?",
    answer: "Yes, you can book and coordinate the visit even if you're not physically present. Just share their address and contact number, and we'll keep you updated on their progress if you'd like.",
    full: true,
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-inner">
        <div className="faq-head">
          <div className="faq-eyebrow">Frequently Asked</div>
          <h2 id="faq-title">Everything you might want to know before your first session</h2>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div className={`faq-item ${faq.full ? "full" : ""} ${isOpen ? "active" : ""}`} key={faq.question}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                >
                  <span className="faq-num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="faq-qtext">{faq.question}</span>
                  <span className="faq-chev" aria-hidden="true">
                    <ArrowIcon size={14} stroke="currentColor" />
                  </span>
                </button>
                <div className="faq-answer-wrap" id={answerId}>
                  <div className="faq-answer">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}