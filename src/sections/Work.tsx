export default function Work() {
  return (
    <section id="work" className="py-20 md:py-32 bg-white border-t border-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <div>
            <p className="label-text text-gray-400 mb-3">Selected Work</p>
            <h2 className="text-3xl font-bold">Recent partnerships</h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            A selection of recent commissions across hospitality sectors in the UAE.
          </p>
        </div>

        <div className="space-y-20">
          {/* La Gente Detailed */}
          <div className="grid lg:grid-cols-12 gap-12 items-start border-t border-light pt-12">
            <div className="lg:col-span-4">
              {/* KIMI_REF: La Gente uniform detail or restaurant interior */}
              <div className="aspect-[4/5] image-placeholder rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-xs text-center px-2">KIMI_REF: La Gente</span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="flex justify-between items-baseline mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1">La Gente</h3>
                  <p className="text-sm text-gray-500">Contemporary Latin Restaurant • Dubai</p>
                </div>
                <span className="label-text text-gray-400">2024</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="label-text text-gray-400 mb-2">The Brief</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Full front-of-house uniform program for new opening. Required breathable 
                    fabrics for high-energy service environment and easy movement for table-side 
                    presentations.
                  </p>
                </div>
                <div>
                  <p className="label-text text-gray-400 mb-2">Solution</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Washed linen-blend service shirts with reinforced underarm gussets. 
                    Cross-back apron design to distribute weight evenly during long shifts. 
                    Individual sizing for 24 staff members.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 text-sm border-t border-light pt-6">
                <div>
                  <span className="label-text text-gray-400 block mb-1">Scope</span>
                  <span className="font-medium">FOH Service Team</span>
                </div>
                <div>
                  <span className="label-text text-gray-400 block mb-1">Materials</span>
                  <span className="font-medium">Linen-Cotton Blend</span>
                </div>
                <div>
                  <span className="label-text text-gray-400 block mb-1">Timeline</span>
                  <span className="font-medium">8 Weeks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sea Level Detailed */}
          <div className="grid lg:grid-cols-12 gap-12 items-start border-t border-light pt-12">
            <div className="lg:col-span-4">
              {/* KIMI_REF: Sea Level uniform or cafe interior */}
              <div className="aspect-[4/5] image-placeholder rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-xs text-center px-2">KIMI_REF: Sea Level Cafe</span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="flex justify-between items-baseline mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Sea Level Cafe</h3>
                  <p className="text-sm text-gray-500">Coastal Café • Multiple UAE Locations</p>
                </div>
                <span className="label-text text-gray-400">2023-2024</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="label-text text-gray-400 mb-2">The Brief</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Uniform program for 12-location rollout. Required industrial laundry 
                    durability, coastal color palette, and consistent sizing across all 
                    locations for staff transfers.
                  </p>
                </div>
                <div>
                  <p className="label-text text-gray-400 mb-2">Solution</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Heavyweight cotton twill, pre-shrunk and industrial wash-tested to 150 cycles. 
                    Individual name embroidery. Coordinated rollout across three emirates.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 text-sm border-t border-light pt-6">
                <div>
                  <span className="label-text text-gray-400 block mb-1">Scope</span>
                  <span className="font-medium">12 Locations</span>
                </div>
                <div>
                  <span className="label-text text-gray-400 block mb-1">Materials</span>
                  <span className="font-medium">Cotton Twill</span>
                </div>
                <div>
                  <span className="label-text text-gray-400 block mb-1">Service</span>
                  <span className="font-medium">Ongoing Replenishment</span>
                </div>
              </div>
            </div>
          </div>

          {/* No Cap & Room 5 Summaries */}
          <div className="grid md:grid-cols-2 gap-12 border-t border-light pt-12">
            <div>
              {/* KIMI_REF: No Cap barbershop */}
              <div className="aspect-[16/9] image-placeholder rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-xs text-center px-2">KIMI_REF: No Cap Barbershop</span>
              </div>
              <h3 className="text-xl font-bold mb-1">No Cap Barbershop</h3>
              <p className="text-sm text-gray-500 mb-4">Modern Grooming Studio • Abu Dhabi</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Heavyweight canvas vests with tool-specific pocketing and chemical-resistant 
                treatment. Streetwear aesthetic with professional durability.
              </p>
            </div>
            <div>
              {/* KIMI_REF: Room 5 hotel */}
              <div className="aspect-[16/9] image-placeholder rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-xs text-center px-2">KIMI_REF: Room 5 Group</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Room 5 Group</h3>
              <p className="text-sm text-gray-500 mb-4">Boutique Hotels • UAE</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Multi-department program: suiting for concierge, utility wear for housekeeping, 
                maintenance jackets. Individual measurement across three properties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
