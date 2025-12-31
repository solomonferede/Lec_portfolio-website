import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { fetchAll } from '../utils/api.js';

export default function Certificates() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    fetchAll('/awards/')
      .then((data) => {
        if (!isMounted) return;
        setAwards(data);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch awards:', error);
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
    <section id="certificates" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Awards & Certifications</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Awards, certifications, and professional credentials</p>
        {loading ? (
          <div className="mt-6 text-slate-500 dark:text-slate-400">Loading awards...</div>
        ) : (
          <div className="mt-6 space-y-4">
            {awards.length > 0 ? (
              awards.map((award) => (
                <div key={award.id} className="card p-5">
                  <div className="font-semibold text-slate-900 dark:text-slate-50">{award.title}</div>
                  {award.issuer && (
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Issued by: {award.issuer}
                    </div>
                  )}
                  {award.date && (
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {award.date}
                    </div>
                  )}
                  {award.description && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      {award.description}
                    </p>
                  )}
                  {award.certificate_file && (
                    <div className="mt-3">
                      <a 
                        href={award.certificate_file} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors"
                      >
                        View Certificate
                      </a>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-slate-600 dark:text-slate-300">No awards available</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}


