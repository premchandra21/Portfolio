import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import AboutMe from './components/About'
import Contact from './components/Contact'
import Bridge from './components/Bridge'
import Footer from './components/Footer'
import Lab from './components/Lab'

function App() {

  return (
    <>
      <div className="">
        <Navbar />
        <Hero />
        <AboutMe />
        <Bridge direction="to-dark" />
        <Projects />
        <Bridge direction="to-light" />
        <Skills />
        <Lab />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App


// Navbar → Hero → About → [Bridge] → Projects → [Bridge] → Skills → Achievements → Lab → Contact → Footer