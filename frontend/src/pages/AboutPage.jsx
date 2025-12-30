import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';

export default function AboutPage() {
  return (
    <div className="container-px">
      <About />
      <Experience />
      <Skills />
      <Education />
      <Certificates />
      <Contact />
    </div>
  );
}
