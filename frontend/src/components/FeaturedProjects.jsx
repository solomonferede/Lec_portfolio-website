import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectCard } from './Projects.jsx';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    fetch(`${base}/projects/?featured=true`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const normalized = (Array.isArray(data) ? data : [])
          .map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            tech: (p.technologies || '')
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean),
            live_link: p.live_link,
            github_link: p.github_link,
            image: p.featured_image || '/vite.svg',
          }));
        setProjects(normalized);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <section id="featured-projects" className="section">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Featured Projects</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">A selection of my best work.</p>
        </div>
        <Link to="/projects" className="text-brand-600 hover:underline">View all</Link>
      </div>
      {loading ? (
        <div className="text-slate-500 dark:text-slate-400">Loading projects...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard project={p} i={i} key={p.id} />
          ))}
        </div>
      )}
    </section>
  );
}
