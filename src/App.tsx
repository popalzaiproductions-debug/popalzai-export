import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './sections/Header'
import Footer from './sections/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import WorkPage from './pages/WorkPage'
import ProcessPage from './pages/ProcessPage'
import FAQPage from './pages/FAQPage'
import InquiryPage from './pages/InquiryPage'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <Header />

      {/* Spacer for the fixed header */}
      <div style={{ height: 'var(--header-h)' }} aria-hidden="true" />

      <main id="main" className="flex-1">
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work"     element={<WorkPage />} />
          <Route path="/process"  element={<ProcessPage />} />
          <Route path="/faq"      element={<FAQPage />} />
          <Route path="/inquiry"  element={<InquiryPage />} />
          {/* /contact used to be a second, competing form — one funnel now */}
          <Route path="/contact"  element={<Navigate to="/inquiry" replace />} />
          <Route path="/studio"   element={<Navigate to="/about" replace />} />
          <Route path="*"         element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
