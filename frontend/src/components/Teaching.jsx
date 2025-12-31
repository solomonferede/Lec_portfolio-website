import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { fetchAll } from '../utils/api.js';

export default function Teaching() {
  const [teaching, setTeaching] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    fetchAll('/teaching/')
      .then((data) => {
        if (!isMounted) return;
        setTeaching(data);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch teaching:', error);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section id="teaching" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <h2 className="section-heading">Teaching</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Courses and teaching experience
        </p>
        {loading ? (
          <div className="mt-6 text-slate-500 dark:text-slate-400">Loading teaching experience...</div>
        ) : teaching.length === 0 ? (
          <div className="mt-6">
            <p className="text-slate-600 dark:text-slate-300">[Content to be added later]</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {teaching.map((course) => (
              <div key={course.id} className="card p-5">
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="font-semibold text-slate-900 dark:text-slate-50">
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
        )}
      </div>
    </section>
  );
}

