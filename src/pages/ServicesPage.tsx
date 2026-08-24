import Meta from '../components/Meta'
import Services from '../sections/Services'

export default function ServicesPage() {
  return (
    <>
      <Meta
        title="Services"
        description="Made-to-measure programmes, private client tailoring, brand production, new hire onboarding, lifetime alterations, and material sourcing — UAE-based, no minimum order."
        path="/services"
      />
      <Services level={1} />
    </>
  )
}
