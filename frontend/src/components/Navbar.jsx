import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ onToggleTheme, isDark }) {
  const [open, setOpen] = useState(false);

  const items = [
    { type: 'route', href: '/', label: 'Home' },
    { type: 'route', href: '/about', label: 'About' },
    { type: 'route', href: '/projects', label: 'Projects' },
    { type: 'route', href: '/blogs', label: 'Blog' },
    { type: 'route', href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/70 backdrop-blur border-b border-slate-200/60 dark:border-slate-800/60">
      <nav className="section py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg tracking-tight">
          <span className="text-brand-600">Solomon</span> Ferede
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {items.map((it) => (
            <Link key={it.href} to={it.href} className="text-sm hover:text-brand-600" onClick={() => setOpen(false)}>
              {it.label}
            </Link>
          ))}
          <button aria-label="Toggle Theme" onClick={onToggleTheme} className="p-2 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button aria-label="Toggle Theme" onClick={onToggleTheme} className="p-2 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
          <button aria-label="Open Menu" onClick={() => setOpen((o) => !o)} className="p-2 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden container-px pb-4">
          <div className="card p-4 flex flex-col gap-3">
            {items.map((it) => (
              <Link key={it.href} to={it.href} className="py-1" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}