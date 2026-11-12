import { SiteFrame } from "../components/SiteFrame";

export const metadata = { title: "Art - Thales Ken Portfolio" };
export const revalidate = 300;

type ArtStationProject = {
  title: string;
  url: string;
  image: string | null;
  description: string;
};

function decodeXml(value: string) {
  return value
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function tagValue(xml: string, tag: string) {
  const match = xml.match(new RegExp("<" + tag + "\\b[^>]*>([\\s\\S]*?)</" + tag + ">", "i"));
  return match ? decodeXml(match[1].trim()) : "";
}

async function getArtStationProjects(): Promise<ArtStationProject[] | null> {
  try {
    const response = await fetch("https://www.artstation.com/thalesken.rss", {
      headers: { Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8" },
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;

    const feed = await response.text();
    const items = [...feed.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)];
    if (!items.length) return null;

    return items.flatMap((match) => {
      const item = match[1];
      const title = tagValue(item, "title");
      const url = tagValue(item, "link");
      const rawDescription = tagValue(item, "description");
      const content = tagValue(item, "content:encoded");
      const description = (rawDescription || content).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      const imageMatch = item.match(/<(?:media:content|media:thumbnail|enclosure)\b[^>]*\burl=["']([^"']+)["']/i)
        ?? rawDescription.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i)
        ?? content.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
      const image = imageMatch?.[1].replace(/&amp;/g, "&").replace(/^http:/i, "https:") ?? null;

      if (!title || !url || !url.startsWith("https://")) return [];
      return [{ title, url, image, description }];
    });
  } catch {
    return null;
  }
}

export default async function ArtPage() {
  const projects = await getArtStationProjects();

  return (
    <SiteFrame>
      <main>
        <section className="intro category-intro">
          <span className="eyebrow"><span className="status-dot" />01 / ARTSTATION PORTFOLIO</span>
          <h1>ART &amp; VISUAL DESIGN</h1>
          <p className="intro-highlight">Making ideas visible.</p>
          <p className="intro-copy">Selected work from my ArtStation portfolio.</p>
        </section>

        {projects === null ? (
          <section className="repository-message" role="status">
            <h2>ArtStation projects are temporarily unavailable.</h2>
            <p>Visit my profile to browse the latest artwork.</p>
            <a href="https://www.artstation.com/thalesken" target="_blank" rel="noreferrer">OPEN ARTSTATION <span aria-hidden="true">&#8599;</span></a>
          </section>
        ) : projects.length === 0 ? (
          <section className="repository-message">
            <h2>No public projects found.</h2>
            <p>Visit my ArtStation profile to see my portfolio.</p>
            <a href="https://www.artstation.com/thalesken" target="_blank" rel="noreferrer">OPEN ARTSTATION <span aria-hidden="true">&#8599;</span></a>
          </section>
        ) : (
          <section className="project-grid" aria-label="ArtStation projects">
            {projects.map((project, index) => (
              <a className="project-card" href={project.url} target="_blank" rel="noreferrer" key={project.url}>
                <div
                  className="project-image"
                  role="img"
                  aria-label={project.title}
                  style={project.image ? { backgroundImage: 'url("' + project.image + '")' } : undefined}
                />
                <div className="project-caption">
                  <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><h2>{project.title}</h2><p>{project.description || "View project on ArtStation"}</p></div>
                </div>
              </a>
            ))}
          </section>
        )}

        <section className="contact-panel">
          <div><h2>Want to create something together?</h2><p>Get in touch about an art or design project.</p></div>
          <a href="/contact">CONTACT <span aria-hidden="true">&#8599;</span></a>
        </section>
      </main>
    </SiteFrame>
  );
}
