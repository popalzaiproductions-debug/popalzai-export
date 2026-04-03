interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="fixed w-full z-50 top-0">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2 px-4">
        <p className="text-[11px] tracking-widest uppercase">Production units in the UAE • Serving all seven emirates</p>
      </div>
      
      {/* Main Navigation */}
      <header className="bg-white/95 backdrop-blur border-b border-light">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-baseline gap-3">
            <span className="logo-display text-3xl">PCP</span>
            <span className="hidden sm:inline text-[10px] tracking-widest text-gray-500 uppercase">Popalzai Clothing Production</span>
          </div>
          
          <nav className="hidden md:flex gap-8 text-[13px] font-medium text-gray-600">
            <button onClick={() => scrollToSection('about')} className="hover:text-black transition">About</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-black transition">Services</button>
            <button onClick={() => scrollToSection('work')} className="hover:text-black transition">Work</button>
            <button onClick={() => scrollToSection('process')} className="hover:text-black transition">Process</button>
            <button onClick={() => scrollToSection('studio')} className="hover:text-black transition">Studio</button>
            <button onClick={() => scrollToSection('contact')} className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition text-[12px]">Start Project</button>
          </nav>
          
          <button 
            className="md:hidden text-sm font-medium" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            Menu
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div id="mobile-menu" className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-b border-light px-6 py-4 space-y-3`}>
          <button onClick={() => scrollToSection('about')} className="block py-2 text-sm w-full text-left">About</button>
          <button onClick={() => scrollToSection('services')} className="block py-2 text-sm w-full text-left">Services</button>
          <button onClick={() => scrollToSection('work')} className="block py-2 text-sm w-full text-left">Work</button>
          <button onClick={() => scrollToSection('process')} className="block py-2 text-sm w-full text-left">Process</button>
          <button onClick={() => scrollToSection('contact')} className="block py-2 text-sm font-bold w-full text-left">Start Project →</button>
        </div>
      </header>
    </div>
  )
}
