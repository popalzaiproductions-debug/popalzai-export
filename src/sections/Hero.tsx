import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="max-w-xl">
            <p className="label-text mb-6">Made-to-Measure Production</p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-tight mb-8">
              Made-to-Measure Production
            </h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Individual pattern drafting for hospitality groups, independent brands, and private clients. No standard sizes. No minimums. Produced locally in the UAE with direct oversight from first measurement to final press.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/inquiry" className="px-8 py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-200">Request Consultation</Link>
              <Link to="/work" className="px-8 py-3.5 border border-gray-300 text-sm font-medium rounded-full hover:border-black transition-colors duration-200">View Recent Work</Link>
            </div>
          </div>
          <div className="space-y-8">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img src="/hero-suit.jpg" alt="PCP" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div><strong>La Gente</strong><div className="text-xs text-gray-500">Specilty Coffee Roastery • Dubai</div></div>
              <div><strong>Sea Level Cafe</strong><div className="text-xs text-gray-500">Coastal Café • UAE</div></div>
              <div><strong>No Cap Barbershop</strong><div className="text-xs text-gray-500">Grooming • Abu Dhabi</div></div>
              <div><strong>Room 5</strong><div className="text-xs text-gray-500">Hotels • UAE</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
