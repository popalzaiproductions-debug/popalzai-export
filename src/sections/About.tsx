export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-t border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          <div className="lg:col-span-4 text-center">
            <div className="lg:sticky lg:top-36">
              <p className="label-text mb-4">About PCP</p>
              <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
                Why we don't use standard sizes
              </h2>
            </div>
          </div>
          
          <div className="lg:col-span-8 text-center lg:text-left">
            <div className="prose-custom max-w-2xl mx-auto lg:mx-0">
              <p>
                Popalzai Clothing Production was founded on a simple observation: hospitality staff 
                spend 8-16 hours per day in their uniforms, yet most are wearing garments graded 
                from arbitrary size charts that account for neither posture variation nor the 
                physical demands of service work.
              </p>
              <p>
                We operate production units in the UAE, allowing us to maintain direct oversight 
                of every stage—from initial measurement to final pressing. This local presence 
                means we can offer services that outsourced manufacturing cannot: individual 
                pattern drafting, indefinite pattern storage for future hires, and alterations 
                for the life of the garment.
              </p>
              <p>
                Our clients range from single-location cafés to governmental entities. 
                What unites them is a recognition that staff appearance and quality is part of brand identity, 
                and that well-fitting workwear reduces turnover and improves team confidence.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-14 pt-10 border-t border-[#e5e5e5] text-center md:text-left">
              <div>
                <p className="text-lg font-semibold mb-2">Local</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  UAE-based production with direct oversight. No outsourcing to third-party facilities.
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">Individual</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Every pattern drafted from individual measurements. No grading from standard sizes.
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">Ongoing</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Patterns archived indefinitely. Easy onboarding for new hires.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
