// import css from "./page.module.css";
import About from '@/components/home/About/About';
import Hero from '@/components/home/Hero/Hero';
import Join from '@/components/home/Join/Join';
import Istorii from '@/components/Istorii/Istorii';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Join />
      <Istorii />
    </main>
  );
}
