import Meta from '../components/Meta'
import FAQ from '../sections/FAQ'

export default function FAQPage() {
  return (
    <>
      <Meta
        title="FAQ"
        description="Minimum order, turnaround times, emirate coverage, adding new hires to an existing programme, and what lifetime alterations actually cover."
        path="/faq"
      />
      <FAQ level={1} />
    </>
  )
}
