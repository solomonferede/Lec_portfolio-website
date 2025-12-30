import { experience } from "../data/data.js";
import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useEffect, useRef, useState } from "react";

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
            {exp.startDate} – {exp.endDate}
          </div>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          {exp.organisation}
        </div>
        {exp.responsibilities && exp.responsibilities.length > 0 && (
          <ul className="mt-3 list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-1 text-sm">
            {exp.responsibilities.map((resp, i) => (
              <li key={i}>{resp}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const [sectionRef, isRevealed] = useScrollReveal();

  return (
    <section id="experience" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Experience</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Professional experience and roles
        </p>
        <div className="mt-8 timeline">
          {experience.map((exp, index) => (
            <TimelineItem key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
