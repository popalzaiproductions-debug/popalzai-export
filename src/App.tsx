import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './sections/Header'
import Home from './pages/Home'
import InquiryPage from './pages/InquiryPage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import WorkPage from './pages/WorkPage'
import ProcessPage from './pages/ProcessPage'
import StudioPage from './pages/StudioPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'
import Footer from './sections/Footer'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      {/* Offset for fixed header */}
      <div style={{ height: 'var(--header-h)' }} />
      <main className="flex-1">
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/inquiry"  element={<InquiryPage />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work"     element={<WorkPage />} />
          <Route path="/process"  element={<ProcessPage />} />
          <Route path="/studio"   element={<StudioPage />} />
          <Route path="/faq"      element={<FAQPage />} />
          <Route path="/contact"  element={<ContactPage />} />
          <Route path="*"         element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
