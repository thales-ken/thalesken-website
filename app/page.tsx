import { SiteFrame } from "./components/SiteFrame";

const work = [
  { href: "/art", number: "01", label: "ART", image: "/images/art-preview.png", description: "Illustration of a fiery magical battle" },
  { href: "/video", number: "02", label: "VIDEO", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=85", description: "Filmmaker working on a cinematic set" },
  { href: "/code", number: "03", label: "CODE", image: "/images/code-preview.png", description: "Code editor displaying a React project" },
];

export default function Home() {
  return (
    <SiteFrame>
      <main>
        <section className="intro" aria-labelledby="intro-title">
          <span className="eyebrow"><span className="status-dot" />CREATIVE PORTFOLIO</span>
          <h1 id="intro-title">I CREATE. I DESIGN. I CODE.</h1>
          <p className="intro-highlight">Ideas into reality.</p>
          <p className="intro-copy">An independent creative showcasing art, video production, and software development.</p>
        </section>
        <section className="work-grid" aria-label="Explore my work">
          {work.map((item) => (
            <a className="work-card" href={item.href} key={item.href}>
              <div className="image-wrap" role="img" aria-label={item.description} style={{ backgroundImage: 'url("' + item.image + '")', backgroundPosition: item.label === "CODE" ? "left center" : "center" }} />
              <div className="card-caption"><span>{item.number} / {item.label}</span><span className="arrow" aria-hidden="true">&#8599;</span></div>
            </a>
          ))}
        </section>
        <section className="contact-panel">
          <div><h2>Three paths, one passion: creativity</h2><h2></h2><p>Explore my work, discover my projects, and get in touch.</p></div>
          <a href="/contact" aria-label="Get in touch">LET&apos;S TALK <span aria-hidden="true">&#8599;</span></a>
        </section>
      </main>
    </SiteFrame>
  );
}
