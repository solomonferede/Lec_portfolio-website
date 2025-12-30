import { profile } from "../data/data.js";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiGooglescholar } from "react-icons/si";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function Hero() {
  const [sectionRef, isRevealed] = useScrollReveal();

  return (
    <section id="home" className="section section-reveal" ref={sectionRef}>
      <div className={`grid md:grid-cols-2 gap-10 items-center ${isRevealed ? 'revealed' : ''}`}>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 dark:border-slate-800/60 px-3 py-1 text-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"></span>
            Seeking research opportunities
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {profile.name}
          </h1>
          <p className="mt-3 text-slate-700 dark:text-slate-300 font-medium">
            {profile.role}
          </p>
          <p className="mt-6 text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            {profile.tagline}
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a className="btn-primary" href="#featured-projects">
              View Research
            </a>
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
