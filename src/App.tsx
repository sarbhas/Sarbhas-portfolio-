import { About } from './components/About'
import { Contact } from './components/Contact'
import { Coursework } from './components/Coursework'
import { Education } from './components/Education'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Languages } from './components/Languages'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { TechBackground } from './components/ui/TechBackground'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <div className="relative min-h-screen bg-ink text-cloud">
      {/* Global Fluid Animated Background (Particles + Neural Links + Ambient Glowing Mesh) */}
      <TechBackground />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-cloud focus:ring-2 focus:ring-cyan-400"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Coursework />
        <Languages />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
