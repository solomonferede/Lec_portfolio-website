import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectCard } from './Projects.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    fetch(`${base}/projects/?featured=true`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
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
      .catch((err) => {
        if (err.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch featured projects:', err);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section id="featured-projects" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="section-heading">Featured Projects</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Selected research and development projects</p>
          </div>
          <Link to="/projects" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors">View all</Link>
        </div>
        {loading ? (
          <div className="text-slate-500 dark:text-slate-400">Loading projects...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard project={p} key={p.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
