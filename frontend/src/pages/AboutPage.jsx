import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Teaching from '../components/Teaching';
import ResearchInterests from '../components/ResearchInterests';
import Certificates from '../components/Certificates';

export default function AboutPage() {
  return (
    <div className="container-px">
      <About />
      <ResearchInterests />
      <Experience />
      <Teaching />
      <Skills />
      <Education />
      <Certificates />
    </div>
  );
}
