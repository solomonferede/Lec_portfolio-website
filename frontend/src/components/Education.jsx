export default function Education() {
  return (
    <section id="education" className="section">
      <h2 className="text-2xl sm:text-3xl font-bold">Education</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Academic background</p>
      <div className="mt-6 space-y-4">
        <div className="card p-5">
          <div className="flex flex-wrap justify-between gap-2">
            <div className="font-semibold">MSc in Control System Engineering • Bahir Dar University</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">2022</div>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">📍 Bahir Dar University, Bahir Dar, Ethiopia</div>
        </div>

        <div className="card p-5">
          <div className="flex flex-wrap justify-between gap-2">
            <div className="font-semibold">BSc in Electrical and Computer Engineering • Hawassa University</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">2018</div>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">📍 Hawassa University, Hawassa, Ethiopia</div>
        </div>

        <div className="card p-5">
          <div className="flex flex-wrap justify-between gap-2">
            <div className="font-semibold">Software Engineering (in progress) • ALX Africa</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Attending</div>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">📍 ALX Africa</div>
        </div>
      </div>
    </section>
  );
}


