import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useEffect, useRef, useState } from "react";
import { fetchAll } from "../utils/api.js";

function TimelineItem({ edu, index }) {
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

  return (
    <div className="timeline-item-wrapper">
      <div 
        ref={itemRef}
        className={`timeline-item card p-5 ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="flex flex-wrap justify-between gap-2 mb-2">
          <div className="font-semibold text-slate-900 dark:text-slate-50">
            {edu.degree}
            {edu.field_of_study && ` - ${edu.field_of_study}`}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {edu.start_date && edu.end_date ? `${edu.start_date} – ${edu.end_date}` : edu.start_date || edu.end_date || ''}
          </div>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {edu.institution}
        </div>
        {edu.description && (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {edu.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    fetchAll('/education/')
      .then((data) => {
        if (!isMounted) return;
        setEducation(data);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch education:', error);
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
    <section id="education" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Academic Background</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Educational qualifications and certifications
        </p>
        {loading ? (
          <div className="mt-8 text-slate-500 dark:text-slate-400">Loading education...</div>
        ) : (
          <div className="mt-8 timeline">
            {education.length > 0 ? (
              education.map((edu, index) => (
                <TimelineItem key={edu.id} edu={edu} index={index} />
              ))
            ) : (
              <p className="text-slate-600 dark:text-slate-300">No education records available</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
