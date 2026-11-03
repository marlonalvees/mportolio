import { MotionConfig } from "framer-motion";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import Contact from "./sections/Contact";
import HeroAbout from "./sections/HeroAbout";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Stack from "./sections/Stack";
import Statement from "./sections/Statement";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Navbar />
        <main>
          <HeroAbout />
          <Statement />
          <Services />
          <Projects />
          <Stack />
          <Contact />
        </main>
        <Footer />
        <div className="grain" aria-hidden />
      </SmoothScroll>
    </MotionConfig>
  );
}
