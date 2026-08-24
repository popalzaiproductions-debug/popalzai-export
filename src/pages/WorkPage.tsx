import Meta from '../components/Meta'
import Work from '../sections/Work'

export default function WorkPage() {
  return (
    <>
      <Meta
        title="Work"
        description="Recent made-to-measure production for barbershops, concept stores, and independent labels across the UAE — including 8 Studios and No Cap Barbershop."
        path="/work"
      />
      <Work level={1} />
    </>
  )
}
