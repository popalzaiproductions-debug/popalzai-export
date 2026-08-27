import Meta from '../components/Meta'
import OnSite from '../sections/OnSite'

export default function OnSitePage() {
  return (
    <>
      <Meta
        title="Popalzai On-Site"
        description="Rent a master tailor by the month. We bring the tailor into the UAE, handle the visa, supply the machine and materials, and place them full time inside your hotel for uniform production and same-day alterations."
        path="/on-site"
      />
      <OnSite level={1} />
    </>
  )
}
