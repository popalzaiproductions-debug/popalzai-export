const faqs = [
  {
    question: 'What is your minimum order?',
    answer: 'We have no minimum order quantity. We regularly produce single garments for individual new hires at established clients, as well as full staff complements for new openings.'
  },
  {
    question: 'How long does the process take?',
    answer: 'Initial measurement sessions can be scheduled within a week. Production takes 6-8 weeks from measurement completion. Rush orders for single replacements can be accommodated in 2 weeks.'
  },
  {
    question: 'Do you serve all of the UAE?',
    answer: 'Yes. We are based in the UAE with production units locally operated. We conduct on-site measurements and deliver finished garments to all seven emirates.'
  },
  {
    question: 'What happens when we hire new staff?',
    answer: 'We keep all patterns archived indefinitely. New team members can be measured and garments produced to the exact specifications of your existing program, ensuring consistency. Turnaround for additions is 2 weeks.'
  },
  {
    question: 'Are alterations really included?',
    answer: 'Yes. Weight fluctuations, adjustments for comfort, or refinements after wear-testing are all covered. We adjust the pattern and the garment at no additional cost.'
  }
]

export default function FAQ() {
  return (
    <section className="py-20 bg-gray-50 border-t border-light">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-12 text-center">Common Questions</h2>
        
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-light">
              <h3 className="font-bold mb-2">{faq.question}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
