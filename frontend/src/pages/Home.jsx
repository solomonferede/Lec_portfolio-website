import Hero from '../components/Hero.jsx';
import FeaturedProjects from '../components/FeaturedProjects.jsx';
import QuickAbout from '../components/QuickAbout.jsx';
import LatestBlogPosts from '../components/LatestBlogPosts.jsx';
import ContactTeaser from '../components/ContactTeaser.jsx';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProjects />
      <QuickAbout />
      <LatestBlogPosts />
      <ContactTeaser />
    </div>
  );
}