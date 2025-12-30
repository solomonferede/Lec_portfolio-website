import { education } from "../data/data.js";
import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useEffect, useRef, useState } from "react";

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
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {edu.startDate} – {edu.endDate}
          </div>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {edu.institution}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const [sectionRef, isRevealed] = useScrollReveal();

  return (
    <section id="education" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Academic Background</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Educational qualifications and certifications
        </p>
        <div className="mt-8 timeline">
          {education.map((edu, index) => (
            <TimelineItem key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
