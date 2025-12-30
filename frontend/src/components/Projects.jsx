import { Link } from 'react-router-dom';

export function ProjectCard({ project }) {
  return (
    <div className="card overflow-hidden">
      {project.image && (
        <div className="relative">
          <div className="aspect-video bg-slate-100 dark:bg-slate-800">
            {/* eslint-disable-next-line */}
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
        {project.tech && project.tech.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="tag text-xs">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center gap-4">
          <Link to={`/projects/${project.id}`} className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:underline">View details</Link>
          {project.live_link && (
            <a href={project.live_link} target="_blank" rel="noreferrer" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:underline">Live Demo</a>
          )}
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noreferrer" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:underline">View on GitHub</a>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    fetch(`${base}/projects/`, { signal: controller.signal })
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
    <section id="projects" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="section-heading">Projects</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Research and development projects</p>
          </div>
        </div>
        {loading ? (
          <div className="text-slate-500 dark:text-slate-400">Loading projects...</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


