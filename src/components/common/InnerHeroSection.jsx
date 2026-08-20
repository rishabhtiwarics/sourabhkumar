export default function InnerHeroSection({
  id,
  eyebrow,
  title,
  accent,
  description,
  backgroundImage = "/img/herobg.png",
  mobileBackgroundImage = backgroundImage,
}) {
  return (
    <div className="page-wrap">
      <section
        className="inner-hero"
        id={id}
        style={{
          "--inner-hero-bg": `url('${backgroundImage}')`,
          "--inner-hero-mobile-bg": `url('${mobileBackgroundImage}')`,
        }}
      >
        <div className="inner-hero-content">
          <div className="inner-hero-copy">
            <span className="inner-hero-eyebrow">{eyebrow}</span>

            <h1>
              {title}
              {accent ? (
                <>
                  <br />
                  <span className="accent">{accent}</span>
                </>
              ) : null}
            </h1>

            <p>{description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
