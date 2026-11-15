import ServiceHero from "./(service-pages)/services/ServiceHero";
import Contact from "./Contact/Contact";
import Navbar from "./Navbar/Navbar";
import Services from "./Services/Services";
import ServiceOverview from "./Services/ServiceOverview";
import AboutIntro from "./About/AboutIntro";
import About from "./About/About";
import ServiceAreas from "./ServiceAreas/ServiceAreas";

export default function Home() {
  return (
    <main>
      <div className="hero-light">
        <Navbar />
        <ServiceHero homepage />
      </div>
      <ServiceOverview />
      <Services />
      <AboutIntro />
      <About />
      <ServiceAreas />
      <Contact />
    </main>
  );
}

