import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchById, getBaseUrl } from "../utils/api.js";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    fetchById('/projects/', id)
      .then((data) => {
        if (!isMounted) return;
        setProject(data);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch project:', error);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  if (loading) return <section className="section">Loading...</section>;
  if (!project) return <section className="section">Not found</section>;

  const tech = (project.technologies || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <section className="section">
      <div className="mb-4">
        <Link to="/projects" className="text-sm text-brand-600 hover:underline">
          ← Back to Projects
        </Link>
      </div>

      {project.featured_image && (
        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden mb-6">
          <img
            src={
              project.featured_image.startsWith('http')
                ? project.featured_image
                : `${getBaseUrl().replace('/api', '')}${project.featured_image}`
            }
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl font-bold">{project.title}</h1>

      {tech.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded-full bg-brand-600/10 text-brand-700 dark:text-brand-300 border border-brand-600/20"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <article className="prose dark:prose-invert mt-6 max-w-none">
        {project.description}
      </article>

      <div className="mt-6 flex gap-3">
        {project.live_link && (
          <a
            href={project.live_link}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Live
          </a>
        )}
        {project.github_link && (
          <a
            href={project.github_link}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            GitHub
          </a>
        )}
      </div>
    </section>
  );
}
