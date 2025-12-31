import { profile } from "../data/data.js";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiGooglescholar } from "react-icons/si";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function Hero() {
  const [sectionRef, isRevealed] = useScrollReveal();

  return (
    <section id="home" className="section section-reveal" ref={sectionRef}>
      <div className={`grid md:grid-cols-2 gap-10 items-center ${isRevealed ? 'revealed' : ''}`}>
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {profile.name}
          </h1>
          <p className="mt-2 text-slate-700 dark:text-slate-300 font-medium text-lg">
            {profile.role}
          </p>
          <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Lecturer in Electrical and Computer Engineering at Wolaita Sodo University. Research focuses on control systems, embedded systems, and their applications in industrial automation and academic settings.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Control Systems</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Embedded Systems</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">System Modeling</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Robotics</span>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <Link className="btn-primary" to="/research-projects">
              Research & Projects
            </Link>
            <Link className="btn-secondary" to="/publications">
              Publications
            </Link>
            <Link className="btn-secondary" to="/contact">
              Contact
            </Link>
            <div className="flex items-center gap-3 text-xl">
              <a
                aria-label="LinkedIn"
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
              >
                <FiLinkedin />
              </a>
              <a
                aria-label="GitHub"
                href={profile.contact.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
              >
                <FiGithub />
              </a>
              {profile.contact.google_scholar && (
                <a
                  aria-label="Google Scholar"
                  href={profile.contact.google_scholar}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                >
                  <SiGooglescholar size={20} />
                </a>
              )}
              <a
                aria-label="Email"
                href={`mailto:${profile.contact.email}`}
                className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
              >
                <FiMail />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="card p-2 md:p-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200/60 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-800">
              {/* eslint-disable-next-line */}
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
