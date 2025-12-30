import { profile } from "../data/data.js";
import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function About() {
  const [cvLink, setCvLink] = useState("");
  const [sectionRef, isRevealed] = useScrollReveal();

  useEffect(() => {
    const base =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
    setCvLink(`${base}/download-cv/`);
  }, []);

  return (
    <section id="about" className="section section-reveal" ref={sectionRef}>
      <div className={isRevealed ? 'revealed' : ''}>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <h2 className="section-heading">About</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Background and focus
            </p>
            <div className="mt-4">
              <a
                href={cvLink}
                download="Solomon-Ferede-CV.pdf"
                className="btn-primary"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {profile.about.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
