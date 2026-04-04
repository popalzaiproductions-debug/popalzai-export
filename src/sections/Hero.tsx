export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          <div className="max-w-xl">
            <p className="label-text mb-6">Est. UAE • Made-to-Measure</p>
            
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.1] mb-8 tracking-tight">
              Uniform production<br />
              <span className="text-gray-400">for hospitality.</span>
            </h1>
            
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Individual pattern drafting for restaurants, hotels, and service teams. 
              No standard sizes. No minimum orders. Produced locally in the UAE.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('contact')} 
                className="px-8 py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-200"
              >
                Request Consultation
              </button>
              <button 
                onClick={() => scrollToSection('work')} 
                className="px-8 py-3.5 border border-gray-300 text-sm font-medium rounded-full hover:border-black transition-colors duration-200"
              >
                View Recent Work
              </button>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="aspect-[4/3] image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
              <span className="text-gray-400 text-sm">KIMI_REF: Hero Image</span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <p className="font-medium text-[15px] mb-0.5">La Gente</p>
                <p className="text-gray-400 text-xs">Restaurant • Dubai</p>
              </div>
              <div>
                <p className="font-medium text-[15px] mb-0.5">Sea Level Cafe</p>
                <p className="text-gray-400 text-xs">Multi-location • UAE</p>
              </div>
              <div>
                <p className="font-medium text-[15px] mb-0.5">No Cap Barbershop</p>
                <p className="text-gray-400 text-xs">Grooming • Abu Dhabi</p>
              </div>
              <div>
                <p className="font-medium text-[15px] mb-0.5">Room 5 Group</p>
                <p className="text-gray-400 text-xs">Hotels • UAE</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
