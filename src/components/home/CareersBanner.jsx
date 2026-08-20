import { ArrowIcon } from "../common/Icons.jsx";

export default function CareersBanner() {
  return (
    <section className="career-banner-section" aria-labelledby="career-banner-title">
      <div className="career-banner">
        <div className="career-banner-photo" aria-hidden="true" />
        <div className="career-banner-copy">
          <span className="career-banner-eyebrow">We're Hiring</span>
          <h2 id="career-banner-title">Are you a physiotherapist? Come grow with us.</h2>
          <p>We're expanding our care team with flexible schedules, mentorship, and a practice that invests in you.</p>
        </div>
        <div className="career-banner-actions">
          <button className="career-banner-btn" type="button" data-open-modal="careers">
            Join Us
            <span className="icon-circle">
              <ArrowIcon size={14} stroke="currentColor" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}