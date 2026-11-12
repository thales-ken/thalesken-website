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
        <section className="contact-details">
          <div><span className="detail-label">EMAIL</span><a className="email-link" href="mailto:thales_ken@hotmail.com">thales_ken@hotmail.com<span aria-hidden="true">↗</span></a></div>
          <p className="detail-note"></p>
        </section>
        <a className="back-link" href="/">← Back to home</a>
      </main>
    </SiteFrame>
  );
}
