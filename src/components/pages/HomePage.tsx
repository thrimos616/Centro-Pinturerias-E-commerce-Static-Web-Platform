import { Hero } from "../Hero";
import { Services } from "../Services";
import { Products } from "../Products";
import { About } from "../About";
import { Contact } from "../Contact";
import { MapSection } from "../MapSection";

export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Products />
      <About />
      <MapSection />
      <Contact />
    </>
  );
}