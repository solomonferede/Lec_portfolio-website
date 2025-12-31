import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { fetchFromAPI } from '../utils/api.js';

export default function FeaturedPublications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    fetchFromAPI('/publications/?featured=true')
      .then((data) => {
        if (!isMounted) return;
        const featured = Array.isArray(data) ? data.slice(0, 2) : [];
        setPublications(featured);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch featured publications:', error);
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

  if (loading || publications.length === 0) {
    return null;
  }

  return (
    <section id="featured-publications" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="section-heading">Featured Publications</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">A selection of recent publications</p>
          </div>
          <Link to="/publications" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors">View all</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {publications.map((pub) => (
            <div key={pub.id} className="card p-5">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{pub.title}</h3>
              {pub.authors && (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{pub.authors}</p>
              )}
              {pub.journal && (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400"><em>{pub.journal}</em></p>
              )}
              {pub.conference && (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{pub.conference}</p>
              )}
              {(pub.link || pub.doi) && (
                <div className="mt-4">
                  {pub.link ? (
                    <a href={pub.link} target="_blank" rel="noreferrer" className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors">
                      Read more
                    </a>
                  ) : (
                    <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors">
                      View DOI
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
