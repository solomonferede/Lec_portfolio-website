import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { fetchAll } from '../utils/api.js';
import Projects from '../components/Projects.jsx';

export default function ResearchProjectsPage() {
  const [researchInterests, setResearchInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    fetchAll('/research-interests/')
      .then((data) => {
        if (!isMounted) return;
        setResearchInterests(data);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch research interests:', error);
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
    <div className="container-px">
      <section id="research-interests" className="section section-reveal" ref={sectionRef}>
        <div className={isRevealed ? 'revealed' : ''}>
          <h1 className="section-heading text-3xl mb-2">Research Interests</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 mb-8">
            Current research focus and areas of investigation
          </p>
          {loading ? (
            <div className="text-slate-500 dark:text-slate-400">Loading research interests...</div>
          ) : researchInterests.length === 0 ? (
            <div className="card p-6">
              <p className="text-slate-600 dark:text-slate-300">[Content to be added later]</p>
            </div>
          ) : (
            <div className="space-y-4">
              {researchInterests.map((interest) => (
                <div key={interest.id} className="card p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                    {interest.title}
                  </h3>
                  {interest.description && (
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {interest.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Projects />
    </div>
  );
}

