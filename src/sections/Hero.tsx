import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Hero Image Grid */}
      <div className="flex-1 grid lg:grid-cols-2 gap-0">
        {/* Left Column - Main Image */}
        <div className="hidden lg:block bg-gray-50 overflow-hidden">
          <img 
            src="/hero-suit.jpg" 
            alt="Standard Issue" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Column - Text + Secondary Image */}
        <div className="bg-white flex flex-col">
          {/* Mobile Full-Width Image */}
          <div className="lg:hidden w-full aspect-[3/2] overflow-hidden">
            <img 
              src="/hero-suit.jpg" 
              alt="Standard Issue" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-16 md:py-20 lg:py-24">
            <p className="text-[9px] tracking-[0.4em] text-gray-400 uppercase mb-12">
              Est. 2024 • UAE
            </p>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1] mb-8 tracking-tight text-black">
              Standard<br />
              Issue.
            </h1>
            
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-12 max-w-sm font-light">
              Bespoke workwear systems for hospitality, retail, and institutional environments. 
              Individual pattern drafting. Zero minimums.
            </p>
            
            <div className="flex flex-col gap-8">
              <Link 
                to="/systems" 
                className="text-xs tracking-[0.15em] text-black uppercase font-medium border-b border-black pb-3 hover:opacity-60 transition-opacity"
              >
                Explore Systems →
              </Link>
              <Link 
                to="/inquiry" 
                className="text-xs tracking-[0.15em] text-gray-400 uppercase font-medium border-b border-gray-300 pb-3 hover:text-black hover:border-black transition-all"
              >
                Commission →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
