export default function About() {
  return (
    <section id="about" className="bg-white py-20 md:py-32 border-t border-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="sticky-sidebar">
              <p className="label-text text-gray-400 mb-3">About PCP</p>
              <h2 className="text-3xl font-bold leading-tight">Why we don't use standard sizes</h2>
            </div>
          </div>
          
          <div className="lg:col-span-8 prose-custom text-base">
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
              Our clients range from single-location cafés to multi-property hotel groups. 
              What unites them is a recognition that staff appearance is part of brand identity, 
              and that well-fitting workwear reduces turnover and improves team confidence.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-light">
              <div>
                <p className="text-2xl font-bold mb-1">Local</p>
                <p className="text-sm text-gray-600">UAE-based production with direct oversight. No outsourcing to third-party facilities.</p>
              </div>
              <div>
                <p className="text-2xl font-bold mb-1">Individual</p>
                <p className="text-sm text-gray-600">Every pattern drafted from individual measurements. No grading from standard sizes.</p>
              </div>
              <div>
                <p className="text-2xl font-bold mb-1">Ongoing</p>
                <p className="text-sm text-gray-600">Patterns archived indefinitely. Easy onboarding for new hires.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
