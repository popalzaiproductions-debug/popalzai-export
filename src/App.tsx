import { useState } from 'react'
import Header from './sections/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Process from './sections/Process'
import Studio from './sections/Studio'
import Work from './sections/Work'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div style={{ margin: '0', padding: '0', width: '100%', minHeight: '100vh' }}>
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div style={{ height: '104px' }}></div>
      <main style={{ margin: '0', padding: '0', width: '100%' }}>
        <Hero />
        <About />
        <Services />
        <Process />
        <Studio />
        <Work />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
