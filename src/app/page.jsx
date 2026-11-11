import EdgeBannerCard from "./Hero/EdgeBannerCard";
import Contact from "./Contact/Contact";
import Navbar from "./Navbar/Navbar";
import Services from "./Services/Services";
import About from "./About/About";
import ServiceAreas from "./ServiceAreas/ServiceAreas";

export default function Home() {
  return (
    <main>
      <div className="hero-dark">
        <Navbar />
        <EdgeBannerCard />
      </div>
      <Services />
      <About />
      <ServiceAreas />
      <Contact />
    </main>
  );
}

