import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Activities from "@/components/home/Activities";
import Leadership from "@/components/home/Leadership";
import Statistics from "@/components/home/Statistics";
import Gallery from "@/components/home/Gallery";
import Events from "@/components/home/Events";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Activities />
      <Leadership />
      <Statistics />
      <Gallery />
      <Events />
      <CTA />
    </>
  );
}