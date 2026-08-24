import Meta from '../components/Meta'
import Process from '../sections/Process'

export default function ProcessPage() {
  return (
    <>
      <Meta
        title="Process"
        description="Five steps from consultation to delivery: 26-point measurement, hand-drafted patterns, approval sampling, three-stage quality control, and on-site fitting across all seven emirates."
        path="/process"
      />
      <Process level={1} />
    </>
  )
}
