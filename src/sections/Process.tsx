const processSteps = [
  {
    num: '01',
    title: 'Consultation & Site Visit',
    description: 'We visit your property to understand the environment, observe staff movement, and assess fabric requirements. A kitchen requires different durability than a front desk. We discuss timeline, quantities, and design direction.',
    note: 'Duration: 1-2 hours • No charge',
    imageRef: 'KIMI_REF: Consultation/site visit photo'
  },
  {
    num: '02',
    title: 'Measurement Sessions',
    description: 'We return with portable fitting equipment to measure each staff member individually. Sessions take 15 minutes per person and can be scheduled during prep hours or between shifts to avoid service disruption. We record 26 measurements per individual.',
    note: 'On-site across all UAE emirates',
    imageRef: 'KIMI_REF: Measurement/fitting photo'
  },
  {
    num: '03',
    title: 'Pattern Drafting & Sampling',
    description: 'Individual patterns are drafted by hand in our UAE studio. For orders over 15 garments, we produce a full sample set for management approval before bulk production begins. Patterns are digitized and stored for future reference.',
    note: '2-3 weeks • Patterns archived indefinitely',
    imageRef: 'KIMI_REF: Pattern drafting or paper patterns'
  },
  {
    num: '04',
    title: 'Production & Quality Control',
    description: 'Garments are cut single-layer to ensure grain alignment, then constructed in our UAE facility. Three-stage quality control: after cutting, after construction, and after pressing. Weekly progress updates provided.',
    note: '6-8 weeks • In-house production',
    imageRef: 'KIMI_REF: Production floor, sewing, or cutting'
  },
  {
    num: '05',
    title: 'Delivery & Fitting',
    description: 'Garments are individually packaged with name labels and care instructions. We coordinate delivery to your property anywhere in the UAE. Optional on-site fitting session to address any final adjustments.',
    note: 'Delivery across all emirates',
    imageRef: 'KIMI_REF: Finished garments or delivery'
  }
]

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28 bg-white border-t border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left - Title */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <div className="lg:sticky lg:top-36">
              <p className="label-text mb-4">Process</p>
              <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-5">
                How we work
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
                A straightforward process designed around operational realities. 
                We work around service hours and minimize disruption to daily operations.
              </p>
            </div>
          </div>

          {/* Right - Steps */}
          <div className="lg:col-span-8 space-y-16">
            {processSteps.map((step, index) => (
              <div key={index} className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                
                {/* Number */}
                <div className="md:col-span-2 text-center md:text-left">
                  <span className="text-3xl font-light text-gray-300">{step.num}</span>
                </div>
                
                {/* Content */}
                <div className="md:col-span-6 text-center md:text-left">
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <p className="text-xs text-gray-400 label-text">{step.note}</p>
                </div>
                
                {/* Image */}
                <div className="md:col-span-4">
                  <div className="aspect-square image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
                    <span className="text-gray-400 text-xs text-center px-3">{step.imageRef}</span>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  )
}
