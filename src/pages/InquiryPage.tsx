export default function InquiryPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim()) { setError('Name is required'); return }
    if (!email.includes('@')) { setError('Valid email required'); return }

    setLoading(true)
    // simulate API call
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
    // clear form
    setName('')
    setEmail('')
    setCompany('')
    setDetails('')
  }

  if (submitted) {
    return (
      <section className="py-16">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold mb-2">Thanks for your inquiry</h2>
          <p className="text-gray-600 mb-4">We’ve received your details and will be in touch soon.</p>
          <button className="px-4 py-2 bg-black text-white rounded" onClick={() => setSubmitted(false)}>
            Back
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Inquiry</h1>
        <p className="mb-4 text-gray-600">Tell us about your project and we’ll respond with next steps.</p>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label>Name</label>
            <input className="w-full mt-1 border rounded px-3 py-2" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label>Email</label>
            <input className="w-full mt-1 border rounded px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" />
          </div>
          <div>
            <label>Company</label>
            <input className="w-full mt-1 border rounded px-3 py-2" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Company" />
          </div>
          <div>
            <label>Project Details</label>
            <textarea className="w-full mt-1 border rounded px-3 py-2" value={details} onChange={(e)=>setDetails(e.target.value)} placeholder="Tell us about your project" rows={4}></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-black text-white rounded" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  )
}
