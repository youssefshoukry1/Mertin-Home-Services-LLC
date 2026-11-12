import EdgeBannerCard from "./Hero/EdgeBannerCard";
import Contact from "./Contact/Contact";
import Navbar from "./Navbar/Navbar";
import Services from "./Services/Services";
import AboutIntro from "./About/AboutIntro";
import About from "./About/About";
import ServiceAreas from "./ServiceAreas/ServiceAreas";

export default function Home() {
  return (
    <main>
      <div className="hero-light">
        <Navbar />
        <EdgeBannerCard />
      </div>
      <Services />
      <AboutIntro />
      <About />
      <ServiceAreas />
      <Contact />
    </main>
  );
}

