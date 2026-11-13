import { notFound } from "next/navigation";
import Navbar from "../../../Navbar/Navbar";
import ServiceHero from "../ServiceHero";
import HandymanIncluded from "../HandymanIncluded";
import About from "../../../About/About";
import ServiceFaq from "../ServiceFaq";
import BeforeAfter from "../BeforeAfter";
import Contact from "../../../Contact/Contact";

const services = {
  "handyman-services": "Handyman Services",
  "home-repairs": "Home Repairs",
  "assembly-installation": "Assembly & Installation",
  "cleaning-services": "Cleaning Services",
  "home-renovation": "Home Renovation",
};

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `${services[slug] || "Service"} | Mertin Home Services LLC` };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  if (!services[slug]) notFound();
  return (
    <main className="hero-light">
      <Navbar />
      <ServiceHero serviceSlug={slug} />
      <HandymanIncluded serviceSlug={slug} />
      <About />
      <BeforeAfter serviceSlug={slug} />
      <ServiceFaq serviceSlug={slug} />
      <Contact defaultService={slug} />
    </main>
  );
}
