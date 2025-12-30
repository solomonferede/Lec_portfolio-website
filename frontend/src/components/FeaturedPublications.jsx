import { publications } from '../data/data';
import { Link } from 'react-router-dom';

export default function FeaturedPublications() {
  const featuredPublications = publications.slice(0, 2);

  return (
    <section id="featured-publications" className="section">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Featured Publications</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">A selection of my recent publications.</p>
        </div>
        <Link to="/publications" className="text-brand-600 hover:underline">View all</Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {featuredPublications.map((pub, i) => (
          <div key={i} className="card p-5">
            <h3 className="text-lg font-semibold">{pub.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{pub.journal}</p>
            <div className="mt-4">
              <a href={pub.link} target="_blank" rel="noreferrer" className="text-sm text-brand-600 hover:underline">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
