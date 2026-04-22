import { Link } from 'react-router-dom'

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <div className="fixed w-full z-50 top-0">
      <div className="bg-black text-white text-center py-2.5">
        <p className="text-[11px] tracking-[0.15em] font-medium uppercase opacity-90">
          Production units in the UAE • Serving all seven emirates
        </p>
      </div>

      <header className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto py-5 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="PCP Logo" className="h-12" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/about" className="text-[13px] text-gray-600 hover:text-black transition-colors duration-200">About</Link>
            <Link to="/services" className="text-[13px] text-gray-600 hover:text-black transition-colors duration-200">Services</Link>
            <Link to="/work" className="text-[13px] text-gray-600 hover:text-black transition-colors duration-200">Work</Link>
            <Link to="/process" className="text-[13px] text-gray-600 hover:text-black transition-colors duration-200">Process</Link>
            <Link to="/studio" className="text-[13px] text-gray-600 hover:text-black transition-colors duration-200">Studio</Link>
            <Link to="/clients" className="ml-2 px-5 py-2.5 bg-black text-white text-[12px] font-medium rounded-full hover:bg-gray-800 transition-colors duration-200">Start Project</Link>
          </nav>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Menu</button>
        </div>

        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-white border-t border-[#e5e5e5]`}>
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            <Link to="/about" className="block text-[14px] text-gray-600 hover:text-black transition-colors">About</Link>
            <Link to="/services" className="block text-[14px] text-gray-600 hover:text-black transition-colors">Services</Link>
            <Link to="/work" className="block text-[14px] text-gray-600 hover:text-black transition-colors">Work</Link>
            <Link to="/process" className="block text-[14px] text-gray-600 hover:text-black transition-colors">Process</Link>
            <Link to="/inquiry" className="ml-2 px-5 py-2.5 bg-black text-white text-[12px] font-medium rounded-full hover:bg-gray-800 transition-colors duration-200">Start Project</Link>
          </div>
        </div>
      </header>
    </div>
  )
}
