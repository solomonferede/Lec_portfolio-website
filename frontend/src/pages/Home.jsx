import Hero from '../components/Hero.jsx';
import FeaturedProjects from '../components/FeaturedProjects.jsx';
import QuickAbout from '../components/QuickAbout.jsx';
import FeaturedPublications from '../components/FeaturedPublications.jsx';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProjects />
      <QuickAbout />
      <FeaturedPublications />
    </div>
  );
}