import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { fetchAll } from '../utils/api.js';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    fetchAll('/skills/')
      .then((data) => {
        if (!isMounted) return;
        setSkills(data);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch skills:', error);
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
    <section id="skills" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Skills & Expertise</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Technical skills and areas of expertise</p>
        {loading ? (
          <div className="mt-6 text-slate-500 dark:text-slate-400">Loading skills...</div>
        ) : (
          <div className="mt-6 flex flex-wrap gap-3">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <span key={skill.id} className="tag">
                  {skill.name}
                </span>
              ))
            ) : (
              <p className="text-slate-600 dark:text-slate-300">No skills available</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}


