import Meta from '../components/Meta'
import SampleMaker from '../sections/SampleMaker'

export default function SampleMakerPage() {
  return (
    <>
      <Meta
        title="Sample maker"
        description="Pick a garment, upload your artwork, size and place it, and send us the specification. Print, embroidery or name — T-shirts, tanks, hoodies, trousers, aprons and caps."
        path="/sample-maker"
      />
      <SampleMaker level={1} />
    </>
  )
}
