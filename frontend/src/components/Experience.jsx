import { experience } from "../data/data.js";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="text-2xl sm:text-3xl font-bold">Experience</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Roles and responsibilities
      </p>
      <div className="mt-6 space-y-4">
        {experience.map((exp, index) => (
          <div key={index} className="card p-5">
            <div className="flex flex-wrap justify-between gap-2">
              <div className="font-semibold">
                {exp.role} • {exp.organisation}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {exp.startDate} – {exp.endDate}
              </div>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              📍 {exp.organisation}
            </div>
            <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-1">
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
