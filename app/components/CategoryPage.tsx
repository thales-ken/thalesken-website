import { SiteFrame } from "./SiteFrame";

type Project = { title: string; description: string; image: string; alt: string };

export function CategoryPage({
  number, title, subtitle, description, projects,
}: {
  number: string; title: string; subtitle: string; description: string; projects: Project[];
}) {
  return (
    <SiteFrame>
      <main>
        <section className="intro category-intro">
          <span className="eyebrow"><span className="status-dot" />{number} / PORTFOLIO</span>
          <h1>{title}</h1><p className="intro-highlight">{subtitle}</p>
          <p className="intro-copy">{description}</p>
        </section>
        <section className="project-grid" aria-label={`${title} projects`}>
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="project-image" role="img" aria-label={project.alt} style={{ backgroundImage: `url("${project.image}")` }} />
              <div className="project-caption">
                <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                <div><h2>{project.title}</h2><p>{project.description}</p></div>
              </div>
            </article>
          ))}
        </section>
        <section className="contact-panel">
          <div><h2>Have a project in mind?</h2><p>Let&apos;s make something together.</p></div>
          <a href="/contact">GET IN TOUCH <span aria-hidden="true">↗</span></a>
        </section>
      </main>
    </SiteFrame>
  );
}
