import Navbar from './components/Navbar.jsx';
import Projects from './components/Projects.jsx';
import Blogs from './components/Blogs.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import BlogDetail from './pages/BlogDetail.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import AboutPage from './pages/AboutPage.jsx';
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
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
