export default function Services() {
  const services = [
    {
      num: '01',
      title: 'Made-to-Measure Programs',
      description: 'Complete garment solutions for new openings, brand launches, or private wardrobe builds. Individual measurement sessions, sample approvals, and full production with individual labeling.',
      features: ['Individual 26-point measurement', 'Pattern drafting & storage', '2-6 week production', 'No minimum order']
    },
    {
      num: '02',
      title: 'Private Client Tailoring',
      description: 'Individual commissions for clients who require precise fit and personal oversight. From single garments to seasonal wardrobe development.',
      features: ['2-week turnaround for additions', 'Consistent with existing program', 'Direct delivery to property', 'Size record maintenance']
    },
    {
      num: '03',
      title: 'Brand Production',
      description: 'Small-batch production for independent labels and emerging brands. Pattern development, sampling, and controlled runs with consistent quality.',
      features: ['Free alterations for life', 'Pattern adjustments stored', 'Individual garment replacement', 'Same-fabric matching']
    },
    {
      num: '04',
      title: 'New Hire & Team Onboarding',
      description: 'Maintain your pattern library for ongoing staffing needs. Two-week turnaround for additions.',
      features: ['Pre-washed fabrics', 'Industrial laundry tested', 'Climate-specific weights', 'Stain-resistant options']
    },
    {
      num: '05',
      title: 'Replacements, Alterations & Maintenance',
      description: 'Lifetime alterations on all garments we produce. Pattern adjustments stored indefinitely.',
      features: ['Custom pattern drafting', 'Sample prototyping', 'Function testing', 'Brand alignment']
    },
    {
      num: '06',
      title: 'Material Sourcing & Development',
      description: 'In-house fabric library spanning technical hospitality cloths to premium shirtings and coating. Industrial-tested and climate-appropriate for UAE conditions.',
      features: ['Centralized coordination', 'Consistent cross-location', 'Individual property delivery', 'Unified invoicing']
    }
  ]

  return (
    <section id="services" className="py-20 md:py-28 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label-text mb-4">Services</p>
          <h2 className="text-2xl md:text-3xl font-semibold mb-5">What we offer</h2>
          <p className="text-gray-500">
            From individual replacements to full staff rollouts, we accommodate programs of any scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg border border-[#e5e5e5] hover:shadow-md transition-shadow duration-200">
              <p className="label-text mb-5">{service.num}</p>
              <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="text-xs text-gray-400 space-y-1.5">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
