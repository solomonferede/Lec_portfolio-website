export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="text-2xl sm:text-3xl font-bold">Experience</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Roles and responsibilities</p>
      <div className="mt-6 space-y-4">
        <div className="card p-5">
          <div className="flex flex-wrap justify-between gap-2">
            <div className="font-semibold">Website Administrator • Ethiopian Electric Power</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Dec 2023 – Present</div>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">📍 Ethiopian Electric Power</div>
          <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-1">
            <li>Managing daily operations of the company’s website.</li>
            <li>Ensuring the website is up-to-date, user-friendly, and functioning smoothly.</li>
            <li>Implementing website security measures to protect against cyber threats and ensure data integrity.</li>
            <li>Optimizing website performance for improved user experience.</li>
          </ul>
        </div>

        <div className="card p-5">
          <div className="flex flex-wrap justify-between gap-2">
            <div className="font-semibold">Database Administrator • Wolaita Sodo University</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Oct 2021 – Sep 2022</div>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">📍 Wolaita Sodo University, Wolaita Sodo, Ethiopia</div>
          <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-1">
            <li>Created and maintained databases using SQL and Python.</li>
            <li>Protected data through encryption, authentication, and backup systems.</li>
            <li>Collaborated with IT professionals, trained users, and documented database procedures.</li>
            <li>Presented database reports and findings.</li>
          </ul>
        </div>

        <div className="card p-5">
          <div className="flex flex-wrap justify-between gap-2">
            <div className="font-semibold">Junior Electrical Engineer • Ethiopian Electric Power</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Dec 2018 – Jan 2021</div>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">📍 Fincha, Ethiopia</div>
          <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-1">
            <li>Designed, planned, and developed controllers.</li>
            <li>Operated computer-aided engineering and design software.</li>
            <li>Installed, configured, and maintained network devices and IT equipment.</li>
            <li>Determined appropriate circuit types, insulation, and breakers.</li>
            <li>Tested and assessed electrical equipment performance.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}


