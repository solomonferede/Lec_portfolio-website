import { skills } from '../data/data.js';
import { motion } from 'framer-motion';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="text-2xl sm:text-3xl font-bold">Tech Stack</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Core technologies and tools</p>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="card px-4 py-3 text-sm"
          >
            {s}
          </motion.div>
        ))}
      </div>
    </section>
  );
}


