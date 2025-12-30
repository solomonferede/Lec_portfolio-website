import { publications } from '../data/data';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function Publications() {
  const [sectionRef, isRevealed] = useScrollReveal();

  return (
    <section id="publications" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Publications</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Selected publications and articles</p>
        <div className="mt-6 space-y-4">
          {publications.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-300">[Content to be added later]</p>
          ) : (
            publications.map((pub, index) => (
              <div key={index} className="card p-5">
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="font-semibold text-slate-900 dark:text-slate-50">{pub.title}</div>
                </div>
                {pub.journal && (
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{pub.journal}</div>
                )}
                {pub.link && (
                  <div className="mt-2">
                    <a href={pub.link} target="_blank" rel="noreferrer" className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:underline transition-colors">
                      View Publication
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
