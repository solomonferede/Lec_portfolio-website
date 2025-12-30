import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';

export default function AboutPage() {
  return (
    <div className="container-px">
      <About />
      <Experience />
      <Skills />
      <Education />
    </div>
  );
}
