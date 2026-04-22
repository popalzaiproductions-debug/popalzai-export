import { useState } from 'react'
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
