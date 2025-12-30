import { teaching } from '../data/data.js';

export default function Teaching() {
  if (!teaching || teaching.length === 0) {
    return (
      <section id="teaching" className="section">
        <h2 className="text-2xl sm:text-3xl font-bold">Teaching</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Courses and teaching experience
        </p>
        <div className="mt-6">
          <p className="text-slate-600 dark:text-slate-300">[Content to be added later]</p>
        </div>
      </section>
    );
  }

  return (
    <section id="teaching" className="section">
      <h2 className="text-2xl sm:text-3xl font-bold">Teaching</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Courses and teaching experience
      </p>
      <div className="mt-6 space-y-4">
        {teaching.map((course, index) => (
          <div key={index} className="card p-5">
            <div className="flex flex-wrap justify-between gap-2">
              <div className="font-semibold">
                {course.course_title}
                {course.course_code && ` (${course.course_code})`}
              </div>
              {(course.semester || course.year) && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {course.semester && course.year ? `${course.semester} ${course.year}` : course.year || course.semester}
                </div>
              )}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {course.institution}
              {course.level && ` • ${course.level}`}
            </div>
            {course.description && (
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">
                {course.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

