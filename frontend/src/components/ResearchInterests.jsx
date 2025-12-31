import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { fetchAll } from '../utils/api.js';

export default function ResearchInterests() {
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
    <section id="research-interests" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Research Interests</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Current research focus and areas of investigation
        </p>
        {loading ? (
          <div className="mt-6 text-slate-500 dark:text-slate-400">Loading research interests...</div>
        ) : researchInterests.length === 0 ? (
          <div className="mt-6">
            <p className="text-slate-600 dark:text-slate-300">[Content to be added later]</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {researchInterests.map((interest) => (
              <div key={interest.id} className="card p-5">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  {interest.title}
                </h3>
                {interest.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {interest.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

