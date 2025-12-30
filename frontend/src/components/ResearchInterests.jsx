import { researchInterests } from '../data/data.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function ResearchInterests() {
  const [sectionRef, isRevealed] = useScrollReveal();

  if (!researchInterests || researchInterests.length === 0) {
    return (
      <section id="research-interests" className="section section-reveal" ref={sectionRef}>
        <div className={isRevealed ? 'revealed' : ''}>
          <h2 className="section-heading">Research Interests</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Current research focus and areas of investigation
          </p>
          <div className="mt-6">
            <p className="text-slate-600 dark:text-slate-300">[Content to be added later]</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="research-interests" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Research Interests</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Current research focus and areas of investigation
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {researchInterests.map((interest, index) => (
            <span key={index} className="tag">
              {interest.title || interest}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

