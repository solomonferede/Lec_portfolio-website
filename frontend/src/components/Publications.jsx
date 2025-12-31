import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { fetchAll } from '../utils/api.js';

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    fetchAll('/publications/')
      .then((data) => {
        if (!isMounted) return;
        setPublications(data);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch publications:', error);
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
    <section id="publications" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Publications</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Selected publications and articles</p>
        {loading ? (
          <div className="mt-6 text-slate-500 dark:text-slate-400">Loading publications...</div>
        ) : (
          <div className="mt-6 space-y-4">
            {publications.length === 0 ? (
              <div className="card p-5">
                <p className="text-slate-600 dark:text-slate-300">Working Papers / In Preparation</p>
              </div>
            ) : (
              publications.map((pub) => (
                <div key={pub.id} className="card p-5">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <div className="font-semibold text-slate-900 dark:text-slate-50">{pub.title}</div>
                    {pub.year && (
                      <div className="text-sm text-slate-500 dark:text-slate-400">{pub.year}</div>
                    )}
                  </div>
                  {pub.authors && (
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {pub.authors}
                    </div>
                  )}
                  {pub.journal && (
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                      <em>{pub.journal}</em>
                    </div>
                  )}
                  {pub.conference && (
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                      {pub.conference}
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap gap-3">
                    {pub.doi && (
                      <a 
                        href={`https://doi.org/${pub.doi}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors"
                      >
                        DOI: {pub.doi}
                      </a>
                    )}
                    {pub.link && (
                      <a 
                        href={pub.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors"
                      >
                        View Publication
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
