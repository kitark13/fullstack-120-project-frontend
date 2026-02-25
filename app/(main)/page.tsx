// import css from "./page.module.css";
import Hero from "@/components/home/Hero/Hero";
import About from "@/components/home/About/About";
import PopularStoriesSection from "@/components/home/PopularStoriesSection/PopularStoriesSection";
import OurTravellers from "@/components/home/OurTravellers/OurTravellers";
import Join from "@/components/home/Join/Join";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PopularStoriesSection />
      <OurTravellers />
      <Join />
    </main>
  );
}
