import { researchInterests } from '../data/data.js';

export default function ResearchInterests() {
  if (!researchInterests || researchInterests.length === 0) {
    return (
      <section id="research-interests" className="section">
        <h2 className="text-2xl sm:text-3xl font-bold">Research Interests</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Current research focus and areas of investigation
        </p>
        <div className="mt-6">
          <p className="text-slate-600 dark:text-slate-300">[Content to be added later]</p>
        </div>
      </section>
    );
  }

  return (
    <section id="research-interests" className="section">
      <h2 className="text-2xl sm:text-3xl font-bold">Research Interests</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Current research focus and areas of investigation
      </p>
      <div className="mt-6 space-y-4">
        {researchInterests.map((interest, index) => (
          <div key={index} className="card p-5">
            <h3 className="font-semibold text-lg">{interest.title}</h3>
            {interest.description && (
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {interest.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

