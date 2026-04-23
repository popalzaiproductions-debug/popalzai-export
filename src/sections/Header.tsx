import { Link } from 'react-router-dom'

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <div className="fixed w-full z-50 top-0">
      <div className="bg-black text-white text-center py-2 md:py-2.5">
        <p className="text-[9px] tracking-[0.25em] font-medium uppercase opacity-90">
          Bespoke Production • UAE-Based
        </p>
      </div>
      
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-4 md:py-5 px-6 md:px-10 lg:px-16 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <p className="text-xs tracking-[0.3em] font-medium uppercase text-black">
              PCP
            </p>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/systems" className="text-[11px] text-gray-600 hover:text-black transition-colors duration-200 tracking-wide">Systems</Link>
            <Link to="/work" className="text-[11px] text-gray-600 hover:text-black transition-colors duration-200 tracking-wide">Archive</Link>
            <Link to="/about" className="text-[11px] text-gray-600 hover:text-black transition-colors duration-200 tracking-wide">About</Link>
            <Link to="/inquiry" className="ml-4 px-6 py-3 bg-black text-white text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-gray-900 transition-colors duration-200">
              Commission
            </Link>
          </nav>
          
          <button 
            className="lg:hidden text-[11px] font-medium text-gray-600 tracking-wide" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            Menu
          </button>
        </div>
        
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-white border-t border-gray-200`}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 md:py-6 space-y-4">
            <Link to="/systems" onClick={() => setMobileMenuOpen(false)} className="block text-[12px] text-gray-600 hover:text-black transition-colors tracking-wide">Systems</Link>
            <Link to="/work" onClick={() => setMobileMenuOpen(false)} className="block text-[12px] text-gray-600 hover:text-black transition-colors tracking-wide">Archive</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-[12px] text-gray-600 hover:text-black transition-colors tracking-wide">About</Link>
            <Link to="/inquiry" onClick={() => setMobileMenuOpen(false)} className="block text-[12px] font-medium text-black tracking-wide">Commission →</Link>
          </div>
        </div>
      </header>
    </div>
  )
}
