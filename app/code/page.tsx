import { SiteFrame } from "../components/SiteFrame";

export const metadata = { title: "Code - Thales Ken Portfolio" };
export const revalidate = 300;

// Add or remove entries here to choose which repositories appear on this page.
const featuredRepositories = [
  {
    owner: "thales-ken",
    name: "ExperimentalCameraTweaks",
    description:
      "A World of Warcraft addon that automatically enables experimental camera options, with an in-game settings panel.",
    language: "Lua",
  },
  {
    owner: "thales-ken",
    name: "fiap-hackathon-edulearn",
    description: "EduLearn, a project created for a FIAP hackathon.",
    language: null,
  },
  {
    owner: "thales-ken",
    name: "thalesken-website",
    description: "Personal portfolio website built with React and Next.js.",
    language: "TypeScript",
  },
];

type GitHubRepository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

type Project = {
  id: string | number;
  name: string;
  description: string;
  html_url: string;
  language: string | null;
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
};

async function getFeaturedRepositories(): Promise<Project[]> {
  return Promise.all(
    featuredRepositories.map(async (project) => {
      const fallback: Project = {
        id: project.owner + "/" + project.name,
        name: project.name,
        description: project.description,
        html_url: "https://github.com/" + project.owner + "/" + project.name,
        language: project.language,
      };

      try {
        const response = await fetch(
          "https://api.github.com/repos/" + project.owner + "/" + project.name,
          {
            headers: { Accept: "application/vnd.github+json" },
            next: { revalidate: 300 },
          },
        );
        if (!response.ok) return fallback;

        const repository = (await response.json()) as GitHubRepository;
        return {
          ...fallback,
          ...repository,
          description: repository.description || project.description,
          language: repository.language || project.language,
        };
      } catch {
        return fallback;
      }
    }),
  );
}

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short" }).format(new Date(value));
}

export default async function CodePage() {
  const projects = await getFeaturedRepositories();

  return (
    <SiteFrame>
      <main>
        <section className="intro category-intro">
          <span className="eyebrow"><span className="status-dot" />03 / SELECTED PROJECTS</span>
          <h1>CODE &amp; DEVELOPMENT</h1>
          <p className="intro-highlight">Building useful things.</p>
          <p className="intro-copy">A hand-picked selection of software projects and experiments.</p>
        </section>

        {projects.length === 0 ? (
          <section className="repository-message">
            <h2>No projects added yet.</h2>
            <p>Add a repository to the featuredRepositories list in this page to show it here.</p>
          </section>
        ) : (
          <>
            <p className="repository-count">{projects.length} SELECTED {projects.length === 1 ? "PROJECT" : "PROJECTS"}</p>
            <section className="repository-grid" aria-label="Selected coding projects">
              {projects.map((project) => (
                <article className="repository-card" key={project.id}>
                  <div className="repository-card-top">
                    <span className="repository-icon" aria-hidden="true">&lt;/&gt;</span>
                    <span className="fork-label">GITHUB PROJECT</span>
                  </div>
                  <h2><a href={project.html_url} target="_blank" rel="noreferrer">{project.name}<span aria-hidden="true"> &#8599;</span></a></h2>
                  <p className="repository-description">{project.description}</p>
                  <div className="repository-meta">
                    {project.language && <span><i className="language-dot" />{project.language}</span>}
                    {project.stargazers_count !== undefined && <span>&#9733; {project.stargazers_count}</span>}
                    {project.forks_count !== undefined && <span>FORKS {project.forks_count}</span>}
                    {project.updated_at && <time dateTime={project.updated_at}>Updated {formatUpdatedAt(project.updated_at)}</time>}
                  </div>
                </article>
              ))}
            </section>
          </>
        )}

        <section className="contact-panel">
          <div><h2>Want to build something together?</h2><p>Get in touch about a project or collaboration.</p></div>
          <a href="/contact">CONTACT <span aria-hidden="true">&#8599;</span></a>
        </section>
      </main>
    </SiteFrame>
  );
}
