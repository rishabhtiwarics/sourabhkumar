import { CalendarIcon, PhoneIcon } from "../common/Icons.jsx";


export default function AboutHeroSection() {
  return (
    <div className="page-wrap">
      <section className="hero" id="about">
        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">About Moveo Health</span>

            <h1>
              Recovery, guided by a therapist,
              <br />
              <span className="accent">from the comfort of home.</span>
            </h1>

            <p>
              Pain, injury, surgery, or reduced mobility can make daily life difficult.
              We bring qualified physiotherapy care to your door, so you can recover
              somewhere familiar and comfortable.
            </p>

            <div className="hero-cta">
              <a href="/#book" className="btn-book">
                <span className="icon-circle">
                  <CalendarIcon stroke="#012F25" />
                </span>
                <span className="label">Book Consultation</span>
              </a>
              <a href="tel:+917007066934" className="btn-ghost">
                <span className="icon-circle">
                  <PhoneIcon size={16} stroke="#F4F1E9" />
                </span>
                <span className="call-now-text">
                  Call Now
                  <br />
                  +91 70070 66934
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
