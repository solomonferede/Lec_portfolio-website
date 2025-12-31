import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useEffect, useRef, useState } from "react";
import { fetchAll, getBaseUrl } from "../utils/api.js";

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

  // Format date for display (month and year)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return dateString;
    }
  };

  const startDateFormatted = formatDate(exp.start_date);
  const endDateFormatted = exp.end_date ? formatDate(exp.end_date) : 'Current';

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
            {startDateFormatted && endDateFormatted ? `${startDateFormatted} – ${endDateFormatted}` : startDateFormatted || endDateFormatted || ''}
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
        {exp.attachment && (
          <div className="mt-3">
            <a
              href={exp.attachment.startsWith('http') ? exp.attachment : `${getBaseUrl().replace('/api', '')}${exp.attachment}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Attachment
            </a>
          </div>
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
