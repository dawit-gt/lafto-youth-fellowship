import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import Statistics from "@/components/home/Statistics";
import Gallery from "@/components/home/Gallery";
import Events from "@/components/home/Events";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Statistics />
      <AboutSection />
      <Gallery />
      <Events />
      <CTA />
    </>
  );
}