import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectCard } from './Projects.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation.js';
import { fetchFromAPI, getBaseUrl } from '../utils/api.js';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();
  const [containerRef, revealedItems] = useStaggeredAnimation({ delay: 150 });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    fetchFromAPI('/projects/?featured=true')
      .then((data) => {
        if (!isMounted) return;
        const base = getBaseUrl().replace('/api', '');
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
            image: p.featured_image 
              ? (p.featured_image.startsWith('http') ? p.featured_image : `${base}${p.featured_image}`)
              : '/vite.svg',
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
          <Link to="/research-projects" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors">View all</Link>
        </div>
        {loading ? (
          <div className="text-slate-500 dark:text-slate-400">Loading projects...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={containerRef}>
            {projects.map((p, index) => (
              <div
                key={p.id}
                className={`animate-item ${revealedItems.has(index) ? 'revealed' : ''}`}
              >
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
