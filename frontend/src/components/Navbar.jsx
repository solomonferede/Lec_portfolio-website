import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ onToggleTheme, isDark }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // For route-based navigation, highlight based on current path
    const path = location.pathname;
    if (path === '/') setActiveSection('home');
    else if (path === '/about') setActiveSection('about');
    else if (path === '/research-projects' || path.startsWith('/projects/')) setActiveSection('research-projects');
    else if (path === '/publications') setActiveSection('publications');
    else if (path === '/contact') setActiveSection('contact');
  }, [location]);

  const items = [
    { type: 'route', href: '/', label: 'Home', id: 'home' },
    { type: 'route', href: '/about', label: 'About', id: 'about' },
    { type: 'route', href: '/research-projects', label: 'Research & Projects', id: 'research-projects' },
    { type: 'route', href: '/publications', label: 'Publications', id: 'publications' },
    { type: 'route', href: '/contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/70 backdrop-blur border-b border-slate-200/60 dark:border-slate-800/60">
      <nav className="section py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg tracking-tight text-slate-900 dark:text-slate-50">
          <span className="text-slate-700 dark:text-slate-300">Solomon</span> Ferede
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {items.map((it) => (
            <Link 
              key={it.href} 
              to={it.href} 
              className={`text-sm transition-colors ${
                activeSection === it.id 
                  ? 'text-slate-900 dark:text-slate-50 font-medium' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
              }`}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </Link>
          ))}
          <button aria-label="Toggle Theme" onClick={onToggleTheme} className="p-2 rounded-lg border border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button aria-label="Toggle Theme" onClick={onToggleTheme} className="p-2 rounded-lg border border-slate-200/60 dark:border-slate-800/60">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
          <button aria-label="Open Menu" onClick={() => setOpen((o) => !o)} className="p-2 rounded-lg border border-slate-200/60 dark:border-slate-800/60">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden container-px pb-4">
          <div className="card p-4 flex flex-col gap-3">
            {items.map((it) => (
              <Link 
                key={it.href} 
                to={it.href} 
                className={`py-1 ${
                  activeSection === it.id 
                    ? 'text-slate-900 dark:text-slate-50 font-medium' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}
                onClick={() => setOpen(false)}
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}