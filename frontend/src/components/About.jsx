import { profile } from "../data/data.js";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
  const [cvLink, setCvLink] = useState("");

  useEffect(() => {
    const base =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
    setCvLink(`${base}/download-cv/`);
  }, []);

  return (
    <section id="about" className="section">
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <h2 className="text-2xl sm:text-3xl font-bold">About Me</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Background and focus
          </p>
          <div className="mt-4">
            <a
              href={cvLink}
              download="Solomon-Ferede-CV.pdf"
              className="btn btn-brand"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {profile.about.map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="text-slate-700 dark:text-slate-300"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
