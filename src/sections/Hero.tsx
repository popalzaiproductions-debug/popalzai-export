import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-92px)] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-6 md:mb-8">
              Est. UAE — Bespoke Production
            </p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-8 tracking-wide">
              Made to<br />
              <span className="text-gray-300">Measure.</span>
            </h1>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-xs">
              Precision tailoring for brands, hospitality, and institutions. 
              Produced in the UAE.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/inquiry" 
                className="inline-block px-8 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase font-medium rounded-none hover:bg-gray-900 transition-colors duration-300"
              >
                Start a Project
              </Link>
              <Link 
                to="/work" 
                className="inline-block px-8 py-4 border border-gray-200 text-xs tracking-[0.2em] uppercase font-medium rounded-none hover:border-gray-400 transition-colors duration-300"
              >
                View Portfolio
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/3] overflow-hidden">
                <img 
                  src="/hero-suit.jpg" 
                  alt="Tailored Excellence" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                  PCP — Popalzai Clothing Production
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
