export default function Work() {
  return (
    <section id="work" className="py-20 md:py-28 bg-white border-t border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <div>
            <p className="label-text mb-3">Selected Work</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Recent partnerships</h2>
          </div>
          <p className="text-sm text-gray-500 max-w-md">
            A selection of recent commissions across hospitality sectors in the UAE.
          </p>
        </div>

        <div className="space-y-20">
          
          {/* La Gente */}
          <div className="grid lg:grid-cols-12 gap-12 items-start border-t border-[#e5e5e5] pt-12">
            <div className="lg:col-span-4">
              <div className="aspect-[4/5] rounded-lg overflow-hidden mb-4">
                <img 
                  src="/la-gente.jpg" 
                  alt="La Gente Restaurant" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="flex justify-between items-baseline mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">La Gente</h3>
                  <p className="text-sm text-gray-500">La Gente Roastery is a homegrown specialty coffee brand • Dubai</p>
                </div>
                <span className="label-text text-gray-400">2025</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="label-text mb-2">The Brief</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Full front-of-house uniform program for new opening. Required breathable 
                    fabrics for high-energy service environment and easy movement for table-side 
                    presentations.
                  </p>
                </div>
                <div>
                  <p className="label-text mb-2">Solution</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Washed linen-blend service shirts with reinforced underarm gussets. 
                    Cross-back apron design to distribute weight evenly during long shifts. 
                    Individual sizing for 24 staff members.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 text-sm border-t border-[#e5e5e5] pt-6">
                <div>
                  <span className="label-text block mb-1">Scope</span>
                  <span className="font-medium">FOH Service Team</span>
                </div>
                <div>
                  <span className="label-text block mb-1">Materials</span>
                  <span className="font-medium">Linen-Cotton Blend</span>
                </div>
                <div>
                  <span className="label-text block mb-1">Timeline</span>
                  <span className="font-medium">2 Weeks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sea Level Cafe */}
          <div className="grid lg:grid-cols-12 gap-12 items-start border-t border-[#e5e5e5] pt-12">
            <div className="lg:col-span-4">
              <div className="aspect-[4/5] rounded-lg overflow-hidden mb-4">
                <img 
                  src="/sea-level.jpg" 
                  alt="Sea Level Cafe" 
                  className="w-full h-full object-cover brightness-50"
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="flex justify-between items-baseline mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Sea Level Cafe</h3>
                  <p className="text-sm text-gray-500">Coastal Café • Kite beach UAE Locations</p>
                </div>
                <span className="label-text text-gray-400">2026 </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="label-text mb-2">The Brief</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Required industrial laundry 
                    durability, coastal color palette, and consistent sizing across all 
                    staff transfers.
                  </p>
                </div>
                <div>
                  <p className="label-text mb-2">Solution</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Heavyweight cotton twill, pre-shrunk and industrial wash-tested to 150 cycles. 
                    Individual name embroidery.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 text-sm border-t border-[#e5e5e5] pt-6">
                <div>
                  <span className="label-text block mb-1">Scope</span>
                  <span className="font-medium">1 Location</span>
                </div>
                <div>
                  <span className="label-text block mb-1">Materials</span>
                  <span className="font-medium">Cotton Twill</span>
                </div>
                <div>
                  <span className="label-text block mb-1">Service</span>
                  <span className="font-medium">Ongoing Replenishment</span>
                </div>
              </div>
            </div>
          </div>

          {/* No Cap & Room 5 */}
          <div className="grid md:grid-cols-2 gap-12 border-t border-[#e5e5e5] pt-12">
            <div>
              <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <img 
                  src="/no-cap.jpg" 
                  alt="No Cap Barbershop" 
                  className="w-full h-full object-cover brightness-50"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">No Cap Barbershop</h3>
              <p className="text-sm text-gray-500 mb-4">Modern Grooming Studio • Satwa Dubai </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Heavyweight canvas set with tool-specific pocketing and chemical-resistant 
                treatment. Streetwear aesthetic with professional durability.
              </p>
            </div>
            <div>
              <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <img 
                  src="/room-5.jpg" 
                  alt="Room 5 Group" 
                  className="w-full h-full object-cover brightness-50"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">Lost Boys</h3>
              <p className="text-sm text-gray-500 mb-4">Abu Dhabi Based Brand • UAE</p>
              <p className="text-sm text-gray-500 leading-relaxed">
         an Abu Dhabi brand built on street energy and raw expression, I produced bespoke uniforms that mirror their
                'rebellious but refined' philosophy—balancing technical durability with a distinct, unpolished edge."
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
