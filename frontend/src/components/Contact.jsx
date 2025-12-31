<<<<<<< Updated upstream
import { profile } from '../data/data.jsx';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaGoogleScholar } from "react-icons/fa";
import { useScrollReveal } from '../hooks/useScrollReveal.js';
=======
import { profile } from "../data/data.js";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiGooglescholar } from "react-icons/si";
>>>>>>> Stashed changes

export default function Contact() {
  const { contact } = profile;
  const [sectionRef, isRevealed] = useScrollReveal();
  return (
    <section id="contact" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
      <div>
        <h1 className="section-heading text-3xl mb-2">Contact</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400 mb-6">
          Contact information for research collaboration and academic inquiries
        </p>
        <div className="card p-6 mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">
            Institutional Affiliation
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-2">
            <strong>Wolaita Sodo University</strong>
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Department of Electrical and Computer Engineering
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <a
            className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            href={`mailto:${contact.email}`}
          >
            <FiMail /> {contact.email}
          </a>
          <a
            className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <FiLinkedin /> LinkedIn
          </a>
          <a
            className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            href={contact.github}
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub /> GitHub
          </a>
          {contact.google_scholar && (
            <a
              className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              href={contact.google_scholar}
              target="_blank"
              rel="noreferrer"
            >
              <SiGooglescholar size={20} />
              Google Scholar
            </a>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
