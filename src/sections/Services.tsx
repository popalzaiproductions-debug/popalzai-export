export default function Services() {
  const services = [
    {
      num: '01',
      title: 'Made-to-Measure Programs',
      description: 'Complete uniform solutions for new openings or rebrands. Individual measurement sessions, sample approvals, and full production with individual garment labeling.',
      features: ['Individual 26-point measurement', 'Pattern drafting & storage', '6-8 week production', 'No minimum order']
    },
    {
      num: '02',
      title: 'New Hire Onboarding',
      description: 'Established relationship for ongoing staffing needs. We maintain your pattern library and produce garments for new team members as needed.',
      features: ['2-week turnaround for additions', 'Consistent with existing program', 'Direct delivery to property', 'Size record maintenance']
    },
    {
      num: '03',
      title: 'Replacements & Alterations',
      description: 'Weight changes, wear-and-tear, or staff promotions. We keep patterns on file indefinitely and offer lifetime alterations on all garments.',
      features: ['Free alterations for life', 'Pattern adjustments stored', 'Individual garment replacement', 'Same-fabric matching']
    },
    {
      num: '04',
      title: 'Material Sourcing',
      description: 'In-house library of hospitality-appropriate fabrics. Industrial wash-tested, stain-resistant treatments, and climate-appropriate weights for UAE conditions.',
      features: ['Pre-washed fabrics', 'Industrial laundry tested', 'Climate-specific weights', 'Stain-resistant options']
    },
    {
      num: '05',
      title: 'Design Development',
      description: 'From concept to pattern. We develop custom styles specific to your brand, accounting for movement requirements and durability needs.',
      features: ['Custom pattern drafting', 'Sample prototyping', 'Function testing', 'Brand alignment']
    },
    {
      num: '06',
      title: 'Multi-Location Rollout',
      description: 'Coordinated uniform deployment across multiple properties. Centralized measurement coordination and consistent quality across all locations.',
      features: ['Centralized coordination', 'Consistent cross-location', 'Individual property delivery', 'Unified invoicing']
    }
  ]

  return (
    <section id="services" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="label-text text-gray-400 mb-3">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What we offer</h2>
          <p className="text-gray-600">From individual replacements to full staff rollouts, we accommodate programs of any scale.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg border border-light hover:shadow-lg transition">
              <div className="label-text text-gray-400 mb-4">{service.num}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
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
