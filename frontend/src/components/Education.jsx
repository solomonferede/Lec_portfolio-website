import { education } from "../data/data.js";

export default function Education() {
  return (
    <section id="education" className="section">
      <h2 className="text-2xl sm:text-3xl font-bold">Education</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Academic background
      </p>
      <div className="mt-6 space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="card p-5">
            <div className="flex flex-wrap justify-between gap-2">
              <div className="font-semibold">
                {edu.degree} • {edu.institution}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {edu.startDate} – {edu.endDate}
              </div>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              📍 {edu.institution}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
