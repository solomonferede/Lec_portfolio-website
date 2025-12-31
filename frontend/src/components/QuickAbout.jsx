import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { fetchAll } from '../utils/api.js';

export default function QuickAbout() {
  const [skills, setSkills] = useState([]);
  const [researchInterests, setResearchInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    Promise.all([
      fetchAll('/skills/'),
      fetchAll('/research-interests/')
    ])
      .then(([skillsData, interestsData]) => {
        if (!isMounted) return;
        setSkills(skillsData);
        setResearchInterests(interestsData);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch data:', error);
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

  const displayInterests = researchInterests && researchInterests.length > 0 
    ? (researchInterests[0].description || researchInterests.slice(0, 3).map(ri => ri.title).join(', '))
    : '[Content to be added later]';

  return (
    <section id="quick-about" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="section-heading">Research Interests</h2>
            {loading ? (
              <p className="mt-4 text-slate-500 dark:text-slate-400">Loading...</p>
            ) : (
              <>
                <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {displayInterests}
                </p>
                <div className="mt-6">
                  <Link to="/about" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors">View full profile</Link>
                </div>
              </>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">Areas of Expertise</h3>
            {loading ? (
              <p className="mt-4 text-slate-500 dark:text-slate-400">Loading...</p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-3">
                {skills.length > 0 ? (
                  skills.slice(0, 6).map((skill, index) => (
                    <span
                      key={skill.id}
                      className={`tag fade-in ${isRevealed ? 'revealed' : ''}`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {skill.name}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-600 dark:text-slate-300">No skills available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
