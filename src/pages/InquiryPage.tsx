export default function InquiryPage() {
  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Inquiry</h1>
        <p className="mb-4 text-gray-600">
          Tell us about your project and we will respond with next steps.
        </p>
        <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
          <div>
            <label>Name</label>
            <input className="w-full mt-1 border rounded px-3 py-2" placeholder="Your name" />
          </div>
          <div>
            <label>Email</label>
            <input className="w-full mt-1 border rounded px-3 py-2" placeholder="Email" type="email" />
          </div>
          <div>
            <label>Company</label>
            <input className="w-full mt-1 border rounded px-3 py-2" placeholder="Company" />
          </div>
          <div>
            <label>Project Details</label>
            <textarea className="w-full mt-1 border rounded px-3 py-2" placeholder="Tell us about your project" rows={4}></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-black text-white rounded">Submit</button>
        </form>
      </div>
    </section>
  )
}
