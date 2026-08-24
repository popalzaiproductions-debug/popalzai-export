import Meta from '../components/Meta'
import Hero from '../sections/Hero'
import Manifesto from '../sections/Manifesto'
import Services from '../sections/Services'
import Work from '../sections/Work'
import Process from '../sections/Process'
import FAQ from '../sections/FAQ'

export default function Home() {
  return (
    <>
      <Meta
        title="Popalzai Clothing Production"
        description="Made-to-measure uniforms and garments for hospitality groups, independent brands, and private clients. UAE-based production, no standard sizes, no minimums."
        path="/"
      />
      <Hero />
      <Manifesto />
      <Services limit={3} />
      <Work preview />
      <Process />
      <FAQ />
    </>
  )
}
