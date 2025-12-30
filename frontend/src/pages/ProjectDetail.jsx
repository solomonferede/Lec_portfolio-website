import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Move base definition here — outside useEffect
  const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${base}/projects/${id}/`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [id, base]); // ✅ include base in dependency array

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
          {/* ✅ base now accessible here */}
          <img
            src={project.featured_image}
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
