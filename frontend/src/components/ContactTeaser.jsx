import { Link } from 'react-router-dom';

export default function ContactTeaser() {
  return (
    <section id="contact-teaser" className="section text-center">
      <h2 className="text-2xl sm:text-3xl font-bold">Let's Connect</h2>
      <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out!
      </p>
      <div className="mt-8">
        <Link to="/about#contact" className="btn btn-primary">
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
