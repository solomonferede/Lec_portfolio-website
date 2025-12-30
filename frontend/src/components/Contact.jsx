import { profile } from '../data/data.js';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Contact() {
  const { contact } = profile;
  return (
    <section id="contact" className="section">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Contact</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Let’s build something impactful</p>
          <div className="mt-6 flex flex-col gap-3">
            <a className="inline-flex items-center gap-2 hover:text-brand-600" href={`mailto:${contact.email}`}>
              <FiMail /> {contact.email}
            </a>
            <a className="inline-flex items-center gap-2 hover:text-brand-600" href={contact.linkedin} target="_blank" rel="noreferrer">
              <FiLinkedin /> LinkedIn
            </a>
            <a className="inline-flex items-center gap-2 hover:text-brand-600" href={contact.github} target="_blank" rel="noreferrer">
              <FiGithub /> GitHub
            </a>
          </div>
        </div>
        <div className="card p-6">
          <form className="grid gap-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-transparent px-3 py-2" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-transparent px-3 py-2" placeholder="Your email" />
            </div>
            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea rows="4" className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-transparent px-3 py-2" placeholder="Say hello..." />
            </div>
            <button type="button" className="btn-primary w-fit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}


