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
      <div className={isRevealed ? "revealed" : ""}>
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
              I am a Lecturer in Electrical and Computer Engineering at Wolaita
              Sodo University with a strong academic foundation and applied
              industry experience. I hold a Bachelor of Science degree in
              Electrical and Computer Engineering from Hawassa University and a
              Master of Science degree in Control Systems Engineering from Bahir
              Dar University.
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              My professional background spans both academia and industry,
              including hands-on experience in Ethiopia’s electric power
              generation sector, which enhances the practical relevance of my
              teaching and research. I am also a certified software engineer
              from ALX, with strong programming skills in Python and C,
              reflecting my commitment to continuous learning and technical
              excellence.
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              My research and professional interests focus on control systems,
              fuzzy logic and neural network–based control, embedded systems,
              robotics and soft robotics for medical applications, renewable
              energy control, and the development of applied technical systems
              for academic and industrial environments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
