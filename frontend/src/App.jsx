import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import ProjectDetail from './pages/ProjectDetail.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ResearchProjectsPage from './pages/ResearchProjectsPage.jsx';
import PublicationsPage from './pages/PublicationsPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function App() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme !== 'light';

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div>
      <Navbar onToggleTheme={toggleTheme} isDark={isDark} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/research-projects" element={<ResearchProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
