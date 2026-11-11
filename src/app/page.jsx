import Contact from "./Contact/Contact";
import Navbar from "./Navbar/Navbar";
import Services from "./Services/Services";
import About from "./About/About";
import ServiceAreas from "./ServiceAreas/ServiceAreas";

export default function Home() {
  return (
    <main>
      <section className="hero-dark relative isolate flex min-h-svh w-full flex-col overflow-hidden" aria-labelledby="hero-title">
        <Navbar />
        <div className="relative z-10 mx-auto my-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <h1 id="hero-title" className="font-serif text-3xl font-normal tracking-tight text-balance sm:text-4xl md:text-5xl">A gallery for the work<br />you are proud of.</h1>
            <p className="max-w-md text-sm text-neutral-400 sm:text-base">Collect, arrange, and publish your art in a space<br className="hidden lg:inline" /> that feels like a studio, not a spreadsheet.</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
              <button type="button" className="hero-button hero-primary">Start your gallery</button>
              <button type="button" className="hero-button text-neutral-200 underline-offset-4 hover:underline">See examples</button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-neutral-900/10 opacity-40 blur-3xl" />
            <div className="relative aspect-[4/5] w-[82%] overflow-hidden rounded-2xl shadow-xl outline outline-black/10">
              <img src="/images/hero-cleaning.png" alt="Woman in a charcoal polo and beige work trousers cleaning a kitchen countertop with professional cleaning supplies" fetchPriority="high" className="size-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
            </div>
            <div className="absolute -right-2 bottom-6 aspect-square w-[42%] rotate-3 overflow-hidden rounded-[14px] shadow-lg outline outline-black/10 sm:-right-4">
              <img src="/images/hero-assembly-cool.png" alt="Man in a matching charcoal polo and beige work trousers assembling a white cabinet with tools and instructions" className="size-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      <Services />
      <About />
      <ServiceAreas />
      <Contact />
    </main>
  );
}

