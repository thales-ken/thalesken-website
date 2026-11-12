import { SiteFrame } from "../components/SiteFrame";

export const metadata = { title: "Contact — Thales Ken Portfolio" };

export default function ContactPage() {
  return (
    <SiteFrame>
      <main className="contact-page">
        <section className="intro">
          <span className="eyebrow"><span className="status-dot" />CONTACT</span>
          <h1>LET&apos;S MAKE SOMETHING.</h1>
          <p className="intro-highlight">Have an idea? Get in touch.</p>
          <p className="intro-copy">For collaborations, project inquiries, or just to say hello, send me a message.</p>
        </section>
        <section className="linkedin-card" aria-labelledby="linkedin-name">
          <div className="profile-avatar" aria-hidden="true">TK</div>
          <div className="profile-copy">
            <span className="detail-label">LINKEDIN</span>
            <h2 id="linkedin-name">Thales Ken Gazieri Kojima</h2>
            <p>Based in Itaquaquecetuba, São Paulo, Brazil</p>
            <p>Vivo (Telefônica Brasil) · FIAP alumnus</p>
          </div>
          <a className="linkedin-link" href="https://www.linkedin.com/in/thalesken/" target="_blank" rel="noreferrer">VIEW LINKEDIN <span aria-hidden="true">&#8599;</span></a>
        </section>
        <section className="contact-details">
          <div><span className="detail-label">EMAIL</span><a className="email-link" href="mailto:thales_ken@hotmail.com">thales_ken@hotmail.com<span aria-hidden="true">&#8599;</span></a></div>
        </section>
        <a className="back-link" href="/">&#8592; Back to home</a>
      </main>
    </SiteFrame>
  );
}
