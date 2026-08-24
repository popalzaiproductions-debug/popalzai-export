type Props = {
  label: string
  meta?: string
}

/** Hairline rule with a monospace label left and an optional counter right. */
export default function SectionHead({ label, meta }: Props) {
  return (
    <div className="section-head">
      <span className="label label-strong">{label}</span>
      {meta && <span className="label">{meta}</span>}
    </div>
  )
}
