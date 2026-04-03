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
    <div className="fixed w-full z-50 top-0 left-0">
      {/* Announcement Bar - elegant, subtle */}
      <div className="bg-black text-white text-center py-2.5">
        <p className="text-[11px] tracking-[0.15em] font-medium uppercase opacity-90">
          Production units in the UAE • Serving all seven emirates
        </p>
      </div>
      
      {/* Main Navigation - clean and minimal */}
      <header className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto py-5 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-baseline gap-2">
            <span className="logo-display text-2xl tracking-tight">PCP</span>
            <span className="hidden sm:inline text-[10px] tracking-[0.1em] text-gray-400 uppercase font-medium">
              Popalzai Clothing Production
            </span>
          </div>
          
          {/* Desktop Nav - elegant spacing */}
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-[13px] text-gray-600 hover:text-black transition-colors duration-200">About</button>
            <button onClick={() => scrollToSection('services')} className="text-[13px] text-gray-600 hover:text-black transition-colors duration-200">Services</button>
            <button onClick={() => scrollToSection('work')} className="text-[13px] text-gray-600 hover:text-black transition-colors duration-200">Work</button>
            <button onClick={() => scrollToSection('process')} className="text-[13px] text-gray-600 hover:text-black transition-colors duration-200">Process</button>
            <button onClick={() => scrollToSection('studio')} className="text-[13px] text-gray-600 hover:text-black transition-colors duration-200">Studio</button>
            <button onClick={() => scrollToSection('contact')} className="ml-2 px-5 py-2.5 bg-black text-white text-[12px] font-medium rounded-full hover:bg-gray-800 transition-colors duration-200">
              Start Project
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[13px] font-medium text-gray-600" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            Menu
          </button>
        </div>
        
        {/* Mobile Menu - clean dropdown */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-white border-t border-[#e5e5e5]`}>
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            <button onClick={() => scrollToSection('about')} className="block text-[14px] text-gray-600 hover:text-black transition-colors">About</button>
            <button onClick={() => scrollToSection('services')} className="block text-[14px] text-gray-600 hover:text-black transition-colors">Services</button>
            <button onClick={() => scrollToSection('work')} className="block text-[14px] text-gray-600 hover:text-black transition-colors">Work</button>
            <button onClick={() => scrollToSection('process')} className="block text-[14px] text-gray-600 hover:text-black transition-colors">Process</button>
            <button onClick={() => scrollToSection('contact')} className="block text-[14px] font-semibold text-black">Start Project →</button>
          </div>
        </div>
      </header>
    </div>
  )
}
