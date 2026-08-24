import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'

type Props = {
  children: ReactNode
  /** Stagger in seconds. */
  delay?: number
  as?: ElementType
  className?: string
}

/**
 * Fades content up the first time it enters the viewport.
 * Respects prefers-reduced-motion by rendering visible immediately.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(16px)',
        transition: `opacity 0.65s cubic-bezier(0.22,0.61,0.36,1) ${delay}s, transform 0.65s cubic-bezier(0.22,0.61,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </Tag>
  )
}
