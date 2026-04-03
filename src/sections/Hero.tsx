export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <div className="label-text text-gray-400 mb-4">Est. UAE • Made-to-Measure</div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8">
            Uniform production<br />
            <span className="text-gray-400">for hospitality.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
            Individual pattern drafting for restaurants, hotels, and service teams. 
            No standard sizes. No minimum orders. Produced locally in the UAE with 
            direct oversight from measurement to delivery.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollToSection('contact')} className="inline-block px-8 py-4 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition">
              Request Consultation
            </button>
            <button onClick={() => scrollToSection('work')} className="inline-block px-8 py-4 border border-gray-300 text-sm font-semibold rounded-full hover:border-black transition">
              View Recent Work
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-5 space-y-6">
          {/* KIMI_REF: Hero image - Replace with actual production/facility photo */}
          <div className="aspect-[4/3] image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-sm">KIMI_REF: Hero Image</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">La Gente</p>
              <p className="text-gray-500 text-xs">Restaurant • Dubai</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Sea Level Cafe</p>
              <p className="text-gray-500 text-xs">Multi-location • UAE</p>
            </div>
            <div>
              <p className="font-semibold mb-1">No Cap Barbershop</p>
              <p className="text-gray-500 text-xs">Grooming • Abu Dhabi</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Room 5 Group</p>
              <p className="text-gray-500 text-xs">Hotels • UAE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
