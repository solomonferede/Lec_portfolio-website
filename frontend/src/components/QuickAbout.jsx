import { Link } from 'react-router-dom';
import { skills, researchInterests } from '../data/data.js';

export default function QuickAbout() {
  const displayInterests = researchInterests && researchInterests.length > 0 
    ? researchInterests.slice(0, 3).map(ri => ri.title || ri).join(', ')
    : '[Content to be added later]';

  return (
    <section id="quick-about" className="section">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Research Interests</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            {researchInterests && researchInterests.length > 0 && researchInterests[0].description
              ? researchInterests[0].description
              : displayInterests}
          </p>
          <div className="mt-6">
            <Link to="/about" className="text-brand-600 hover:underline">View full profile</Link>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Areas of Expertise</h3>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {skills.slice(0, 6).map((skill, i) => (
              <div key={i} className="card px-4 py-3 text-sm text-center">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
