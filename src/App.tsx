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
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <div className="relative min-h-screen bg-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-cloud focus:ring-2 focus:ring-brand-2"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
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
