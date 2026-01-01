import { profile } from "../data/data.js";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiCopy } from "react-icons/fi";
import { SiGooglescholar, SiOrcid } from "react-icons/si";
import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useState } from "react";

export default function Contact() {
  const { contact } = profile;
  const [sectionRef, isRevealed] = useScrollReveal();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="section section-reveal"
      ref={sectionRef}
      aria-labelledby="contact-heading"
    >
      <div className={isRevealed ? "revealed" : ""}>
        <div className="max-w-3xl">
          {/* Header */}
          <h1 id="contact-heading" className="section-heading text-3xl mb-2">
            Contact
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 mb-8">
            Open to research collaboration, academic discussions, and
            professional opportunities.
          </p>

          {/* Affiliation Card */}
          <div className="card p-6 mb-8">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3">
              Institutional Affiliation
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Wolaita Sodo University</strong>
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
              Department of Electrical and Computer Engineering
            </p>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
              <FiMapPin />
              Ethiopia
            </div>
          </div>

          {/* Primary Contact Actions */}
          <div className="card p-6 mb-8">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Get in Touch
            </h3>

            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  <FiMail />
                  {contact.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  aria-label="Copy email address"
                >
                  <FiCopy />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Availability */}
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Typical response time: <strong>24–48 hours</strong>
              </p>
            </div>
          </div>

          {/* Academic & Social Links */}
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              className="card p-4 inline-flex items-center gap-3 hover:shadow-md transition-shadow"
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin className="text-xl" />
              <span>LinkedIn Profile</span>
            </a>

            <a
              className="card p-4 inline-flex items-center gap-3 hover:shadow-md transition-shadow"
              href={contact.github}
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub className="text-xl" />
              <span>GitHub Repositories</span>
            </a>

            {contact.google_scholar && (
              <a
                className="card p-4 inline-flex items-center gap-3 hover:shadow-md transition-shadow"
                href={contact.google_scholar}
                target="_blank"
                rel="noreferrer"
              >
                <SiGooglescholar className="text-xl" />
                <span>Google Scholar</span>
              </a>
            )}

            {contact.orcid && (
              <a
                className="card p-4 inline-flex items-center gap-3 hover:shadow-md transition-shadow"
                href={contact.orcid}
                target="_blank"
                rel="noreferrer"
              >
                <SiOrcid className="text-xl" />
                <span>ORCID</span>
              </a>
            )}
          </div>

          {/* Footer Note */}
          <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
            For students: please include your institution and research interest
            when reaching out.
          </p>
        </div>
      </div>
    </section>
  );
}
