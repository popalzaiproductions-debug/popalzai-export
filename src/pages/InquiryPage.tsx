import Meta from '../components/Meta'
import Inquiry from '../sections/Inquiry'

export default function InquiryPage() {
  return (
    <>
      <Meta
        title="Start a project"
        description="Tell us about your team, timeline, and requirements. We reply within 24 hours to schedule a consultation anywhere in the UAE."
        path="/inquiry"
      />
      <Inquiry />
    </>
  )
}
