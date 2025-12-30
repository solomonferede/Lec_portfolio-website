import { publications } from '../data/data';

export default function Publications() {
  return (
    <section id="publications" className="section">
      <h2 className="text-2xl sm:text-3xl font-bold">Publications</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Selected publications and articles</p>
      <div className="mt-6 space-y-4">
        {publications.map((pub, index) => (
          <div key={index} className="card p-5">
            <div className="flex flex-wrap justify-between gap-2">
              <div className="font-semibold">{pub.title}</div>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{pub.journal}</div>
            <div className="mt-2">
              <a href={pub.link} target="_blank" rel="noreferrer" className="text-sm text-brand-600 hover:underline">
                View Publication
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
