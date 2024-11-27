import LatestNews from 'features/root/latestNews';
import './Root.scss';
import FeaturedNews from 'features/root/featuredNews';

const Hero = () => (
  <section className="hero">
    <article className="container--hero">
      <h1>
        Lorem ipsum dolor <span>sit amet</span>
      </h1>
      <div className="divider" />
      <p>
        Donec non massa auctor, dictum ante eu, ultrices eros. Sed sit amet
        augue nec diam tempor placerat. Integer dignissim lacinia turpis.
      </p>
    </article>
  </section>
);

const Root = () => {
  return (
    <>
      <main>
        <Hero />
        <FeaturedNews />
        <LatestNews />
      </main>
    </>
  );
};

export default Root;
