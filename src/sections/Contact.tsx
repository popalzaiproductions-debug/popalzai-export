import { useState } from 'react'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const response = await fetch('https://formspree.io/f/xvzvwgla', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formState)
      })
      
      if (response.ok) {
        setSubmitted(true)
        setFormState({ name: '', company: '', email: '', message: '' })
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="label-text text-gray-500 mb-4">Start a Project</p>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to discuss your team?</h2>
        <p className="text-gray-400 mb-12 max-w-lg mx-auto">
          Tell us about your property, your current uniform situation, and what you're looking to improve. 
          We'll respond within 24 hours to schedule a consultation.
        </p>
        
        {submitted ? (
          <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Thank you!</h3>
            <p className="text-gray-400">Your inquiry has been sent. We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 text-left">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label-text text-gray-500 mb-2 block">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-700 py-2 focus:border-white focus:outline-none transition text-white"
                />
              </div>
              <div>
                <label className="label-text text-gray-500 mb-2 block">Property</label>
                <input 
                  type="text" 
                  name="company" 
                  required
                  value={formState.company}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-700 py-2 focus:border-white focus:outline-none transition text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="label-text text-gray-500 mb-2 block">Email</label>
              <input 
                type="email" 
                name="email" 
                required
                value={formState.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-700 py-2 focus:border-white focus:outline-none transition text-white"
              />
            </div>
            
            <div>
              <label className="label-text text-gray-500 mb-2 block">Message</label>
              <textarea 
                name="message" 
                rows={4} 
                required
                value={formState.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-700 py-2 focus:border-white focus:outline-none transition text-white resize-none"
                placeholder="Tell us about your team, timeline, and requirements..."
              />
            </div>
            
            <div className="text-center pt-4">
              <button 
                type="submit" 
                disabled={submitting}
                className="px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition label-text disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-16 pt-8 border-t border-gray-800 text-sm text-gray-500">
          <p>info@popalzai.com</p>
          <p className="mt-1">United Arab Emirates</p>
        </div>
      </div>
    </section>
  )
}
