import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './sections/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Process from './sections/Process'
import Work from './sections/Work'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="h-[92px]"></div>
      <main>
        <Routes>
          <Route path="/" element={<><Hero /></>} />
          <Route path="/about" element={<><Hero /><About /></>} />
          <Route path="/services" element={<><Hero /><Services /></>} />
          <Route path="/work" element={<><Hero /><Work /></>} />
          <Route path="/process" element={<><Hero /><Process /></>} />
          <Route path="/inquiry" element={<><Hero /><Contact /></>} />
          <Route path="/faq" element={<><Hero /><FAQ /></>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
