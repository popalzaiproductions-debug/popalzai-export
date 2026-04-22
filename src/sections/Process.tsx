const processSteps = [
  {
    num: '01',
    title: 'Consultation',
    description: 'We meet to understand your environment, your brand, or your personal requirements. A kitchen demands different durability than a concierge desk; a private client demands different discretion than a group rollout. We discuss timeline, proportion, and design direction.',
    note: 'Duration: 1-2 hours • No charge',
    image: '/consultation.jpg'
  },
  {
    num: '02',
    title: 'Measurement',
    description: 'Individual sessions using portable fitting equipment. We record 26 measurements per person, scheduled at your convenience. Available across all UAE emirates.',
    note: 'On-site or in-studio',
    image: '/measurment.jpg'
  },
  {
    num: '03',
    title: 'Pattern & Sampling',
    description: 'Patterns drafted by hand in our UAE studio. For orders over 15 garments or multi-piece private commissions, we produce approval samples before full production. All patterns are digitized and archived.',
    note: '3-6 Days • Patterns archived indefinitely',
    image: '/pattern.jpg'
  },
  {
    num: '04',
    title: 'Production & Quality Control',
    description: 'Single-layer cutting for grain alignment. Three-stage QC: after cutting, after construction, after pressing. Weekly progress updates.',
    note: '2-3 weeks • In-house production',
    image: '/pexels-cottonbro-studio-4622397.jpg'
  },
  {
    num: '05',
    title: 'Delivery & Fitting',
    description: 'Individually packaged with labeling and care instructions. Optional on-site fitting for final adjustments.',
    note: 'Delivery across all emirates',
    image: '/delivery.jpg'
  }
]

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28 bg-white border-t border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
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

          <div className="lg:col-span-8 space-y-16">
            {processSteps.map((step, index) => (
              <div key={index} className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                
                <div className="md:col-span-2 text-center md:text-left">
                  <span className="text-3xl font-light text-gray-300">{step.num}</span>
                </div>
                
                <div className="md:col-span-6 text-center md:text-left">
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <p className="text-xs text-gray-400 label-text">{step.note}</p>
                </div>
                
                <div className="md:col-span-4">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover brightness-50"
                    />
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
