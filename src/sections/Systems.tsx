export default function Systems() {
  const modules = [
    {
      id: 1,
      name: 'Chef',
      category: 'Hospitality',
      specifications: {
        fabric: 'Cotton Poplin',
        weight: '180gsm',
        origin: 'EU',
        washCycles: '60°C',
        lead: '3–4 weeks'
      },
      description: 'Double-breasted service coat. Custom placket width. Reinforced seams at stress points.'
    },
    {
      id: 2,
      name: 'Waiter',
      category: 'Hospitality',
      specifications: {
        fabric: 'Cotton Twill',
        weight: '200gsm',
        origin: 'EU',
        washCycles: '60°C',
        lead: '3–4 weeks'
      },
      description: 'Tailored waistcoat + trousers system. Side-vents. Custom button placement.'
    },
    {
      id: 3,
      name: 'Host',
      category: 'Retail/F&B',
      specifications: {
        fabric: 'Wool-Cotton Blend',
        weight: '220gsm',
        origin: 'Italy',
        washCycles: '40°C',
        lead: '4–5 weeks'
      },
      description: 'Single-breasted jacket. Minimal branding. Unstructured shoulder.'
    },
    {
      id: 4,
      name: 'Studio',
      category: 'Institutional',
      specifications: {
        fabric: 'Linen Cotton',
        weight: '190gsm',
        origin: 'Portugal',
        washCycles: '60°C',
        lead: '3–4 weeks'
      },
      description: 'Unisex smock. Dropped sleeve. Patch pockets with hidden stitching.'
    },
  ]

  return (
    <section className="bg-white py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <p className="text-[9px] tracking-[0.4em] text-gray-400 uppercase mb-6">
            Modular Archive
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-black">
            Systems
          </h1>
          <p className="text-sm text-gray-500 mt-8 max-w-2xl leading-relaxed">
            Each system is engineered for precision. Specifications are exact. Lead times reflect quality. All patterns are individually drafted to your team's proportions.
          </p>
        </div>

        {/* Systems Grid */}
        <div className="space-y-24 md:space-y-32">
          {modules.map((module, idx) => (
            <div key={module.id} className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
              
              {/* Image */}
              <div className={`lg:col-span-1 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="bg-gray-50 aspect-[3/4] overflow-hidden">
                  <img 
                    src={`/system-${module.id}.jpg`} 
                    alt={module.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Details */}
              <div className={`lg:col-span-2 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="mb-8">
                  <p className="text-[9px] tracking-[0.4em] text-gray-400 uppercase mb-3">
                    {module.category}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-light text-black mb-4">
                    {module.name}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md">
                    {module.description}
                  </p>
                </div>

                {/* Specifications Table */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {Object.entries(module.specifications).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-2">
                          {key}
                        </p>
                        <p className="text-sm md:text-base text-black font-light">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="border-t border-gray-200 mt-24 md:mt-32 pt-12">
          <p className="text-sm text-gray-500 mb-6">
            Custom specifications available. Each piece is made-to-measure.
          </p>
        </div>
      </div>
    </section>
  )
}
