import ServiceHero from "./(service-pages)/services/ServiceHero";
import Contact from "./Contact/Contact";
import Navbar from "./Navbar/Navbar";
import Services from "./Services/Services";
import ServiceOverview from "./Services/ServiceOverview";
import ProjectPlanner from "./Services/ProjectPlanner";
import HomeCare from "./Services/HomeCare";
import HomeSupport from "./Services/HomeSupport";
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
      <HomeCare />
      <HomeSupport />
      <About />
      <ProjectPlanner />
      <ServiceAreas />
      <Contact />
    </main>
  );
}

