import { Link } from 'react-router-dom';
import { skills, researchInterests } from '../data/data.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function QuickAbout() {
  const [sectionRef, isRevealed] = useScrollReveal();
  const displayInterests = researchInterests && researchInterests.length > 0 
    ? researchInterests.slice(0, 3).map(ri => ri.title || ri).join(', ')
    : '[Content to be added later]';

  return (
    <section id="quick-about" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="section-heading">Research Interests</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              {researchInterests && researchInterests.length > 0 && researchInterests[0].description
                ? researchInterests[0].description
                : displayInterests}
            </p>
            <div className="mt-6">
              <Link to="/about" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors">View full profile</Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">Areas of Expertise</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {skills.slice(0, 6).map((skill, i) => (
                <span key={i} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
