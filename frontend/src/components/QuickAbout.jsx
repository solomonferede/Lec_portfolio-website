import { Link } from 'react-router-dom';
import { skills } from '../data/data.js';

export default function QuickAbout() {
  return (
    <section id="quick-about" className="section">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">About Me</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            I'm a passionate and results-driven software engineer with a focus on building beautiful and functional web applications. I have a strong foundation in both frontend and backend development, and I'm always eager to learn new technologies.
          </p>
          <div className="mt-6">
            <Link to="/about" className="text-brand-600 hover:underline">Learn more about me</Link>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Core Technologies</h3>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {skills.slice(0, 6).map((skill, i) => (
              <div key={i} className="card px-4 py-3 text-sm text-center">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
