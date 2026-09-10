import Meta from '../components/Meta'
import Produce from '../sections/Produce'
import { produceMeta } from '../data/site'

export default function ProducePage() {
  return (
    <>
      <Meta
        title={produceMeta.title}
        description={produceMeta.description}
        path="/produce"
      />
      <Produce level={1} />
    </>
  )
}
