import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useEffect, useRef, useState } from "react";
import { fetchAll } from "../utils/api.js";

function TimelineItem({ exp, index }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  // Parse responsibilities if it's a string (comma or newline separated)
  const responsibilities = exp.responsibilities 
    ? (typeof exp.responsibilities === 'string' 
        ? exp.responsibilities.split(/[,\n]/).map(r => r.trim()).filter(Boolean)
        : Array.isArray(exp.responsibilities) ? exp.responsibilities : [])
    : [];

  return (
    <div className="timeline-item-wrapper">
      <div 
        ref={itemRef}
        className={`timeline-item card p-5 ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="flex flex-wrap justify-between gap-2 mb-2">
          <div className="font-semibold text-slate-900 dark:text-slate-50">
            {exp.role}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {exp.start_date && exp.end_date ? `${exp.start_date} – ${exp.end_date}` : exp.start_date || exp.end_date || ''}
          </div>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          {exp.organisation}
          {exp.location && ` • ${exp.location}`}
        </div>
        {exp.description && (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {exp.description}
          </p>
        )}
        {responsibilities.length > 0 && (
          <ul className="mt-3 list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-1 text-sm">
            {responsibilities.map((resp, i) => (
              <li key={i}>{resp}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    fetchAll('/experience/')
      .then((data) => {
        if (!isMounted) return;
        setExperience(data);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch experience:', error);
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
    <section id="experience" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Experience</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Professional experience and roles
        </p>
        {loading ? (
          <div className="mt-8 text-slate-500 dark:text-slate-400">Loading experience...</div>
        ) : (
          <div className="mt-8 timeline">
            {experience.length > 0 ? (
              experience.map((exp, index) => (
                <TimelineItem key={exp.id} exp={exp} index={index} />
              ))
            ) : (
              <p className="text-slate-600 dark:text-slate-300">No experience records available</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
