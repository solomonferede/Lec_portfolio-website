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
            <h2 className="section-heading">Academic Biography</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Professional background and academic focus
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
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Solomon Ferede Ezez is a Lecturer in Electrical and Computer Engineering at Wolaita Sodo University. He holds a Bachelor of Science degree in Electrical and Computer Engineering from Hawassa University and a Master of Science degree in Control Systems Engineering from Bahir Dar University.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              His professional experience spans both academia and industry, including roles in Ethiopia's electric power generation sector. He has completed software engineering certification programs, developing expertise in Python, C, and related technologies. His research interests focus on control systems, embedded systems, and their applications in industrial and academic settings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
