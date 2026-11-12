import { SiteFrame } from "../components/SiteFrame";

export const metadata = { title: "Video - Thales Ken Portfolio" };

export default function VideoPage() {
  return (
    <SiteFrame>
      <main>
        <section className="intro category-intro">
          <span className="eyebrow"><span className="status-dot" />02 / VIDEO PORTFOLIO</span>
          <h1>VIDEO &amp; FILM</h1>
          <p className="intro-highlight">Stories in motion.</p>
          <p className="intro-copy">A selection of video work and behind-the-scenes projects.</p>
        </section>

        <section className="video-feature" aria-label="Featured video">
          <div className="video-frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/1sXIqV8_uiM"
              title="Featured YouTube Short"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="video-caption">
            <div>
              <span className="project-number">FEATURED VIDEO</span>
              <h2>Watch my latest Short</h2>
              <p>Watch the video on YouTube or play it here.</p>
            </div>
            <a href="https://youtube.com/shorts/1sXIqV8_uiM?feature=share" target="_blank" rel="noreferrer">
              WATCH ON YOUTUBE <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </section>

        <section className="contact-panel">
          <div><h2>Have a story to tell?</h2><p>Get in touch about a video or creative project.</p></div>
          <a href="/contact">CONTACT <span aria-hidden="true">&#8599;</span></a>
        </section>
      </main>
    </SiteFrame>
  );
}
