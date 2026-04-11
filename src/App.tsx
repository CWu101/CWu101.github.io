import { useEffect, useRef, useState, type MouseEvent } from "react";
import { profile } from "./data/profile";

const sections = [
  { id: "about", label: "About" },
  { id: "internship", label: "Internship" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

function App() {
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]["id"]>("about");
  const contentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);
    const isMobile = window.matchMedia("(max-width: 960px)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id as (typeof sections)[number]["id"]);
        }
      },
      {
        root: isMobile ? contentRef.current : null,
        rootMargin: isMobile ? "0px -55% 0px -20%" : "-20% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: (typeof sections)[number]["id"],
  ) => {
    event.preventDefault();

    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 960px)").matches;

    if (isMobile && contentRef.current) {
      contentRef.current.scrollTo({
        left: target.offsetLeft,
        behavior: "smooth",
      });
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="layout-shell">
      <aside className="sidebar">
        <div className="sidebar-inner">
          <div className="sidebar-copy">
            <h1>{profile.sidebar.name}</h1>
            <p className="sidebar-intro">{profile.sidebar.tagline}</p>
          </div>

          <nav className="sidebar-nav" aria-label="Section navigation">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                key={section.id}
                className={activeSection === section.id ? "is-active" : ""}
                aria-label={section.label}
                onClick={(event) => handleNavClick(event, section.id)}
              >
                <span className="nav-label">{section.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <main className="content" ref={contentRef}>
        <section className="content-section" id="about">
          <p className="section-label">About</p>
          <div className="rich-copy">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="content-section" id="internship">
          <p className="section-label">Internship</p>
          <div className="timeline-list">
            {profile.internships.map((entry) => (
              <article className="timeline-item" key={`${entry.company}-${entry.period}`}>
                <div className="timeline-period">{entry.period}</div>
                <div className="timeline-body">
                  <div className="internship-heading">
                    {entry.logo ? (
                      <img
                        className="company-logo"
                        src={entry.logo}
                        alt={`${entry.company} logo`}
                      />
                    ) : null}
                    <h2>{entry.company}</h2>
                  </div>
                  <p>{entry.role}</p>
                  <p>{entry.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="projects">
          <p className="section-label">Projects</p>
          <div className="timeline-list">
            {profile.projects.map((project) => (
              <article className="timeline-item project-item" key={project.name}>
                <div className="timeline-period">{project.period}</div>
                <div className="timeline-body">
                  <div className="project-heading">
                    <h2>{project.name}</h2>
                    <span>{project.status}</span>
                  </div>
                  <p className="project-tagline">{project.tagline}</p>
                  <p>{project.summary}</p>
                  <ul className="tag-list">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="contact">
          <p className="section-label">Contact</p>
          <div className="contact-block">
            <p>{profile.contact.description}</p>
            <div className="contact-links">
              <a href={`mailto:${profile.contact.email}`} className="contact-link-item">
                <span className="contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path
                      d="M4 6.5h16a1 1 0 0 1 1 1v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5v-9a1 1 0 0 1 1-1Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="m4 8 8 6 8-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{profile.contact.email}</span>
              </a>
              <a
                href={profile.contact.github.href}
                target="_blank"
                rel="noreferrer"
                className="contact-link-item"
              >
                <span className="contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path
                      d="M12 3.5a8.5 8.5 0 0 0-2.69 16.57c.42.08.58-.18.58-.41 0-.2-.01-.87-.01-1.57-2.13.39-2.68-.52-2.85-1-.1-.25-.51-1-.87-1.2-.29-.15-.7-.53-.01-.54.65-.01 1.11.59 1.27.84.74 1.24 1.93.89 2.4.68.07-.54.29-.89.52-1.09-1.89-.21-3.87-.95-3.87-4.2 0-.93.33-1.7.88-2.3-.09-.21-.38-1.08.08-2.24 0 0 .72-.23 2.36.88a8.2 8.2 0 0 1 4.3 0c1.64-1.12 2.36-.88 2.36-.88.46 1.16.17 2.03.08 2.24.55.6.88 1.37.88 2.3 0 3.26-1.99 3.99-3.88 4.2.3.26.57.77.57 1.56 0 1.12-.01 2.02-.01 2.3 0 .23.16.5.58.41A8.5 8.5 0 0 0 12 3.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>{profile.contact.github.label}</span>
              </a>
            </div>
            <div className="contact-link-item contact-meta">
              <span className="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path
                    d="M12 20.4 4.9 13.8a4.7 4.7 0 0 1 6.6-6.7L12 7.6l.5-.5a4.7 4.7 0 0 1 6.6 6.7Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="contact-meta-text">Made this page with love | ©2026 Qinkun</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
