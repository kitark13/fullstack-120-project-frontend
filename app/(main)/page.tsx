// import css from "./page.module.css";
import About from "@/components/home/About/About";
import Hero from "@/components/home/Hero/Hero";
import Join from "@/components/home/Join/Join";
import IstoriiAndRegister from "@/components/IstoriiAndRegister/IstoriiAndRegister";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Join />
      <IstoriiAndRegister />
    </main>
  );
}
