import Meta from '../components/Meta'
import Hero from '../sections/Hero'
import Manifesto from '../sections/Manifesto'
import Services from '../sections/Services'
import OnSite from '../sections/OnSite'
import Work from '../sections/Work'
import Process from '../sections/Process'
import FAQ from '../sections/FAQ'

export default function Home() {
  return (
    <>
      <Meta path="/" />
      <Hero />
      <Manifesto />
      <Services limit={3} />
      <OnSite preview />
      <Work preview />
      <Process />
      <FAQ />
    </>
  )
}
