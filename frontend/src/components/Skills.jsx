import { skills } from '../data/data.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function Skills() {
  const [sectionRef, isRevealed] = useScrollReveal();

  return (
    <section id="skills" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Skills & Expertise</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Technical skills and areas of expertise</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {skills.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}


