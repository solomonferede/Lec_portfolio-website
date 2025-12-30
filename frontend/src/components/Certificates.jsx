import { awards } from '../data/data.js';

export default function Certificates() {
  return (
    <section id="certificates" className="section">
      <h2 className="text-2xl sm:text-3xl font-bold">Awards & Certifications</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Awards, certifications, and professional credentials</p>
      <div className="mt-6 space-y-4">
        {awards.map((award, index) => (
          <div key={index} className="card p-5">
            <div className="font-semibold">{award.title}</div>
            {award.issuer && (
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Issued by: {award.issuer}
              </div>
            )}
            {award.date && (
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {award.date}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}


