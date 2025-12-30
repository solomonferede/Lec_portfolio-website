import { profile } from '../data/data.jsx';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaGoogleScholar } from "react-icons/fa";

export default function Contact() {
  const { contact } = profile;
  return (
    <section id="contact" className="section">
      <div>
        <h2 className="section-heading">Contact</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Contact information for research collaboration and academic inquiries</p>
        <div className="mt-6 flex flex-col gap-3">
          <a className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" href={`mailto:${contact.email}`}>
            <FiMail /> {contact.email}
          </a>
          <a className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" href={contact.linkedin} target="_blank" rel="noreferrer">
            <FiLinkedin /> LinkedIn
          </a>
          <a className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" href={contact.github} target="_blank" rel="noreferrer">
            <FiGithub /> GitHub
          </a>
          {contact.google_scholar && (
            <a className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" href={contact.google_scholar} target="_blank" rel="noreferrer">
              <FaGoogleScholar /> Google Scholar
            </a>
          )}
        </div>
      </div>
    </section>
  );
}


