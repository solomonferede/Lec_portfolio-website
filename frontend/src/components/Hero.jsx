import { motion } from "framer-motion";
import { profile } from "../data/data.js";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Hero() {
  return (
    <section id="home" className="section">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 dark:border-slate-800/60 px-3 py-1 text-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
            Available for collaboration
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {profile.name}
          </h1>
          <p className="mt-3 text-brand-700 dark:text-brand-300 font-medium">
            {profile.role}
          </p>
          <p className="mt-6 text-slate-600 dark:text-slate-300 max-w-xl">
            {profile.tagline}
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a className="btn-primary" href="#projects">
              View Projects
            </a>
            <div className="flex items-center gap-3 text-xl">
              <a
                aria-label="LinkedIn"
                href="https://linkedin.com/in/solomonferede"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600"
              >
                <FiLinkedin />
              </a>
              <a
                aria-label="GitHub"
                href="https://github.com/solomonferede"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600"
              >
                <FiGithub />
              </a>
              <a
                aria-label="Email"
                href="mailto:ezezsolomonferede@gmail.com"
                className="hover:text-brand-600"
              >
                <FiMail />
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="card p-2 md:p-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-800">
              {/* eslint-disable-next-line */}
              <img src="/images/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
