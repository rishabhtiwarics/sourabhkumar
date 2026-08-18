import { useEffect, useState } from "react";
import { CalendarIcon } from "../common/Icons.jsx";
import "./ServiceAvailabilitySection.css";

const typingPhrases = [
  "book your call today.",
  "request a visit today.",
  "start your recovery today.",
  "talk to our care team.",
];

export default function ServiceAvailabilitySection() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    const isComplete = !isDeleting && typedText === currentPhrase;
    const isEmpty = isDeleting && typedText === "";
    const delay = isComplete ? 1650 : isEmpty ? 260 : isDeleting ? 42 : 72;

    const timeoutId = window.setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty) {
        setIsDeleting(false);
        setPhraseIndex((index) => (index + 1) % typingPhrases.length);
        return;
      }

      setTypedText((text) => (
        isDeleting
          ? currentPhrase.slice(0, Math.max(0, text.length - 1))
          : currentPhrase.slice(0, text.length + 1)
      ));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, phraseIndex, typedText]);

  return (
    <section className="service-availability-section" aria-labelledby="service-availability-title">
      <div className="service-availability-inner">
        <div className="service-availability-eyebrow">Service Availability</div>
        <h2 id="service-availability-title" className="service-availability-statement">
          <span className="service-availability-line">
            We're on the ground in{" "}
            <span className="service-availability-chip"><span className="dot" />Delhi NCR</span>{" "}
            and{" "}
            <span className="service-availability-chip"><span className="dot" />Gurugram</span>
          </span>
          <span className="service-availability-typing-line">
            <span className="typing-text">{typedText}</span>
            <span className={`typing-cursor ${typedText === typingPhrases[phraseIndex] && !isDeleting ? "visible" : ""}`} aria-hidden="true" />
          </span>
        </h2>

        <div className="service-availability-action">
          <a href="tel:+917007066934" className="btn-book">
            <span className="icon-circle">
              <CalendarIcon />
            </span>
            <span className="label">Request Call</span>
          </a>
        </div>
      </div>
    </section>
  );
}