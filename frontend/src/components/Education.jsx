import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useEffect, useRef, useState } from "react";
import { fetchAll, getBaseUrl } from "../utils/api.js";

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
        {edu.certificate_file && (
          <div className="mt-3">
            <a
              href={edu.certificate_file.startsWith('http') ? edu.certificate_file : `${getBaseUrl().replace('/api', '')}${edu.certificate_file}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Certificate
            </a>
          </div>
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
