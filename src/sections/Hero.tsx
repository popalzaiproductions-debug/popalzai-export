import { Link } from 'react-router-dom'

export default function Hero() {
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
              …
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/inquiry" className="px-8 py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-200">Request Consultation</Link>
              <Link to="/work" className="px-8 py-3.5 border border-gray-300 text-sm font-medium rounded-full hover:border-black transition-colors duration-200">View Recent Work</Link>
            </div>
          </div>
          <div className="space-y-8">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img src="/hero-suit.jpg" alt="Hero" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <div><p className="font-medium text-[15px] mb-0.5">La Gente</p><p className="text-gray-400 text-xs">Specilty Coffee Roastery • Dubai</p></div>
              <div><p className="font-medium text-[15px] mb-0.5">Sea Level Cafe</p><p className="text-gray-400 text-xs">Coastal Café • UAE</p></div>
              <div><p className="font-medium text-[15px] mb-0.5">No Cap Barbershop</p><p className="text-gray-400 text-xs">Grooming • Abu Dhabi</p></div>
              <div><p className="font-medium text-[15px] mb-0.5">Lost Boys</p><p className="text-gray-400 text-xs">Abu Dhabi Based Brand • UAE</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
