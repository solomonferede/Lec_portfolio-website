import { publications } from '../data/data';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function FeaturedPublications() {
  const [sectionRef, isRevealed] = useScrollReveal();
  const featuredPublications = publications.slice(0, 2);

  if (publications.length === 0) {
    return null;
  }

  return (
    <section id="featured-publications" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="section-heading">Featured Publications</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">A selection of recent publications</p>
          </div>
          <Link to="/publications" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors">View all</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {featuredPublications.map((pub, i) => (
            <div key={i} className="card p-5">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{pub.title}</h3>
              {pub.journal && (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{pub.journal}</p>
              )}
              {pub.link && (
                <div className="mt-4">
                  <a href={pub.link} target="_blank" rel="noreferrer" className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors">
                    Read more
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
