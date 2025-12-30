import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/solomonferede' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/solomonferede' },
    { icon: <FiMail />, href: 'mailto:ezezsolomonferede@gmail.com' },
  ];

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blogs', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="mt-10 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="section py-8">
        <div className="grid md:grid-cols-3 gap-8 place-items-center">
          <div className="text-center md:text-left">
            <Link to="/" className="font-semibold text-lg tracking-tight">
              <span className="text-brand-600">Solomon</span> Ferede
            </Link>
          </div>
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-sm hover:text-brand-600">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xl">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} Solomon Ferede. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}