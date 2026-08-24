import Meta from '../components/Meta'
import About from '../sections/About'

export default function AboutPage() {
  return (
    <>
      <Meta
        title="About"
        description="Founded in 2009, Popalzai is a UAE production house drafting individual patterns for hospitality groups, independent brands, and private clients — no grading, no outsourcing."
        path="/about"
      />
      <About level={1} />
    </>
  )
}
