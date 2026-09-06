import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import SectionHead from '../components/SectionHead'
import { leadTag, type HeadingLevel } from '../components/Heading'
import GarmentFlat from '../components/GarmentFlat'
import {
  garments, decorationMethods, textFonts,
  type MethodId, type Garment,
} from '../data/garments'
import { EMAIL, FORM_ENDPOINT } from '../data/site'

/* Artwork box, in garment viewBox units. */
type Box = { x: number; y: number; w: number; h: number }

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024
/** Uploads are downscaled to this before being held as a data URL. */
const MAX_STORED_PX = 1400

function round(n: number, dp = 1) {
  return Math.round(n * 10 ** dp) / 10 ** dp
}

/**
 * Read a file, downscale it, and return a data URL.
 * Downscaling keeps a 12MP phone photo from sitting in memory at full size and
 * makes the exported sheet quick to produce.
 */
function loadImage(file: File): Promise<{ src: string; w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read that file.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('That file is not an image we can read.'))
      img.onload = () => {
        const scale = Math.min(1, MAX_STORED_PX / Math.max(img.width, img.height))
        if (scale === 1) {
          resolve({ src: String(reader.result), w: img.width, h: img.height })
          return
        }
        const c = document.createElement('canvas')
        c.width = Math.round(img.width * scale)
        c.height = Math.round(img.height * scale)
        const ctx = c.getContext('2d')
        if (!ctx) {
          resolve({ src: String(reader.result), w: img.width, h: img.height })
          return
        }
        ctx.drawImage(img, 0, 0, c.width, c.height)
        resolve({ src: c.toDataURL('image/png'), w: img.width, h: img.height })
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

type Props = { level?: HeadingLevel }

/**
 * The garment flat is an external <image href>. Once the stage SVG is
 * serialised into a data: URL for the canvas export, that href no longer
 * resolves and the sheet comes out with artwork floating on nothing — so the
 * PNG has to be inlined first. Cached: the same blank is exported repeatedly.
 */
const mockupCache = new Map<string, Promise<string>>()
function mockupDataUrl(src: string): Promise<string> {
  let hit = mockupCache.get(src)
  if (!hit) {
    hit = fetch(src)
      .then(r => r.blob())
      .then(
        b =>
          new Promise<string>((resolve, reject) => {
            const fr = new FileReader()
            fr.onload = () => resolve(String(fr.result))
            fr.onerror = () => reject(fr.error)
            fr.readAsDataURL(b)
          }),
      )
    mockupCache.set(src, hit)
  }
  return hit
}

export default function SampleMaker({ level = 2 }: Props) {
  const H = leadTag(level)

  const [garment, setGarment] = useState<Garment>(garments[0])
  const [method, setMethod] = useState<MethodId>('print')

  const [art, setArt] = useState<{ src: string; nw: number; nh: number } | null>(null)
  const [box, setBox] = useState<Box>({ x: 150, y: 176, w: 100, h: 100 })

  const [text, setText] = useState('')
  const [fontId, setFontId] = useState(textFonts[0].id)
  const [textSize, setTextSize] = useState(26)

  const [notes, setNotes] = useState('')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [sendError, setSendError] = useState<string | null>(null)
  const [contact, setContact] = useState({ name: '', email: '', qty: '' })

  const svgRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<SVGTextElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [textW, setTextW] = useState(0)

  const isText = method === 'name'
  const spec = decorationMethods.find(m => m.id === method)!
  const font = textFonts.find(f => f.id === fontId) ?? textFonts[0]

  /* Measure the rendered text so the centimetre readout is real. */
  useLayoutEffect(() => {
    if (!isText || !textRef.current) return
    try {
      setTextW(textRef.current.getBBox().width)
    } catch {
      setTextW(0)
    }
  }, [isText, text, textSize, fontId, garment])

  /* Switching garment: snap the artwork back to that garment's first placement. */
  useEffect(() => {
    const p = garment.placements[0]
    setBox(b => {
      const aspect = b.h / b.w || 1
      return { x: p.x, y: p.y, w: p.w, h: p.w * aspect }
    })
  }, [garment])

  const widthCm = isText ? textW * garment.cmPerUnit : box.w * garment.cmPerUnit
  const heightCm = isText ? textSize * 0.72 * garment.cmPerUnit : box.h * garment.cmPerUnit
  const overMax = widthCm > spec.maxWidthCm

  const pa = garment.printArea
  const outsidePrintArea =
    !isText &&
    (box.x < pa.x - 1 || box.y < pa.y - 1 || box.x + box.w > pa.x + pa.w + 1 || box.y + box.h > pa.y + pa.h + 1)

  /* ---------------- pointer drag / resize ---------------- */

  const dragRef = useRef<{ mode: 'move' | 'resize'; sx: number; sy: number; orig: Box; origSize: number } | null>(null)

  const toSvg = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const ctm = svg.getScreenCTM()
    if (!ctm) return { x: 0, y: 0 }
    const pt = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse())
    return { x: pt.x, y: pt.y }
  }, [])

  const startDrag = (mode: 'move' | 'resize') => (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const p = toSvg(e.clientX, e.clientY)
    dragRef.current = { mode, sx: p.x, sy: p.y, orig: { ...box }, origSize: textSize }
  }

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = dragRef.current
      if (!d) return
      const p = toSvg(e.clientX, e.clientY)
      const dx = p.x - d.sx
      const dy = p.y - d.sy
      const [, , vbW, vbH] = garment.viewBox.split(' ').map(Number)

      if (d.mode === 'move') {
        if (isText) {
          setBox(b => ({
            ...b,
            x: Math.max(0, Math.min(vbW, d.orig.x + dx)),
            y: Math.max(0, Math.min(vbH, d.orig.y + dy)),
          }))
        } else {
          setBox(b => ({
            ...b,
            x: Math.max(-b.w / 2, Math.min(vbW - b.w / 2, d.orig.x + dx)),
            y: Math.max(-b.h / 2, Math.min(vbH - b.h / 2, d.orig.y + dy)),
          }))
        }
      } else if (isText) {
        setTextSize(Math.max(8, Math.min(120, d.origSize + dy)))
      } else {
        const aspect = d.orig.h / d.orig.w
        const w = Math.max(16, Math.min(vbW, d.orig.w + dx))
        setBox({ ...d.orig, w, h: w * aspect })
      }
    }
    const onUp = () => { dragRef.current = null }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [toSvg, isText, garment.viewBox])

  /* Keyboard equivalent — the drag handles are not reachable otherwise. */
  const onArtKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2
    const nudge = (dx: number, dy: number) => {
      e.preventDefault()
      setBox(b => ({ ...b, x: b.x + dx, y: b.y + dy }))
    }
    if (e.key === 'ArrowLeft') nudge(-step, 0)
    else if (e.key === 'ArrowRight') nudge(step, 0)
    else if (e.key === 'ArrowUp') nudge(0, -step)
    else if (e.key === 'ArrowDown') nudge(0, step)
    else if (e.key === '+' || e.key === '=') {
      e.preventDefault()
      if (isText) setTextSize(s => Math.min(120, s + 2))
      else setBox(b => ({ ...b, w: b.w + 6, h: b.h * ((b.w + 6) / b.w) }))
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault()
      if (isText) setTextSize(s => Math.max(8, s - 2))
      else setBox(b => ({ ...b, w: Math.max(16, b.w - 6), h: b.h * (Math.max(16, b.w - 6) / b.w) }))
    }
  }

  /* ---------------- upload ---------------- */

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError(null)

    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file — PNG, JPG or SVG.')
      return
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setUploadError(`That file is ${round(file.size / 1024 / 1024)} MB. Please keep it under 10 MB.`)
      return
    }

    try {
      const { src, w, h } = await loadImage(file)
      setArt({ src, nw: w, nh: h })
      const p = garment.placements.find(pl => pl.id !== 'left-chest') ?? garment.placements[0]
      setBox({ x: p.x, y: p.y, w: p.w, h: p.w * (h / w) })
      if (method === 'name') setMethod('print')
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Could not read that file.')
    }
  }

  function applyPlacement(id: string) {
    const p = garment.placements.find(pl => pl.id === id)
    if (!p) return
    if (isText) {
      setBox(b => ({ ...b, x: p.x, y: p.y + 20 }))
    } else {
      const aspect = art ? art.nh / art.nw : box.h / box.w
      setBox({ x: p.x, y: p.y, w: p.w, h: p.w * aspect })
    }
  }

  function reset() {
    setArt(null)
    setText('')
    setNotes('')
    setUploadError(null)
    setMethod('print')
    const p = garment.placements[0]
    setBox({ x: p.x, y: p.y, w: p.w, h: p.w })
    if (fileRef.current) fileRef.current.value = ''
  }

  /* ---------------- export ---------------- */

  const specLines = () => [
    ['Garment', garment.name],
    ['Method', spec.label],
    isText ? ['Text', text || '—'] : ['Artwork', art ? 'Customer supplied file' : '—'],
    isText ? ['Typeface', font.label] : ['Aspect', art ? `${art.nw} × ${art.nh} px` : '—'],
    ['Width', `${round(widthCm)} cm`],
    ['Height', `${round(heightCm)} cm`],
    ['Position', `x ${round(box.x * garment.cmPerUnit)} cm, y ${round(box.y * garment.cmPerUnit)} cm from top-left`],
  ]

  async function buildSheet(): Promise<Blob | null> {
    const svgEl = svgRef.current
    if (!svgEl) return null

    const clone = svgEl.cloneNode(true) as SVGSVGElement
    clone.querySelectorAll('[data-chrome]').forEach(n => n.remove())
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')

    const flat = clone.querySelector('image')
    if (flat) {
      const inlined = await mockupDataUrl(garment.mockup.src)
      flat.setAttribute('href', inlined)
      // Some serialisers still emit xlink:href; keep the two in step.
      flat.setAttribute('xlink:href', inlined)
    }
    const xml = new XMLSerializer().serializeToString(clone)
    const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml)

    const img = new Image()
    img.src = svgUrl
    await img.decode()

    const [, , vbW, vbH] = garment.viewBox.split(' ').map(Number)
    const W = 1200
    const artH = Math.round((vbH / vbW) * (W * 0.62))
    const panelH = 300
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = artH + panelH
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const drawW = Math.round(W * 0.62)
    ctx.drawImage(img, Math.round((W - drawW) / 2), 24, drawW, artH - 48)

    ctx.strokeStyle = 'rgba(0,0,0,0.18)'
    ctx.beginPath()
    ctx.moveTo(48, artH)
    ctx.lineTo(W - 48, artH)
    ctx.stroke()

    ctx.fillStyle = '#000000'
    ctx.font = '600 22px Consolas, "Courier New", monospace'
    ctx.fillText('POPALZAI — SAMPLE SPECIFICATION', 48, artH + 48)

    ctx.font = '15px Consolas, "Courier New", monospace'
    let y = artH + 92
    for (const [k, v] of specLines()) {
      ctx.fillStyle = 'rgba(0,0,0,0.45)'
      ctx.fillText(String(k).toUpperCase(), 48, y)
      ctx.fillStyle = '#000000'
      ctx.fillText(String(v), 260, y)
      y += 26
    }

    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.font = '13px Consolas, "Courier New", monospace'
    ctx.fillText(
      'Indicative only — final placement and scale confirmed at sampling.',
      48,
      canvas.height - 34,
    )

    return new Promise(resolve => canvas.toBlob(b => resolve(b), 'image/png'))
  }

  async function downloadSheet() {
    const blob = await buildSheet()
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `popalzai-sample-${garment.id}-${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  async function sendSpec(e: React.FormEvent) {
    e.preventDefault()
    setSendError(null)
    if (!contact.email.includes('@')) {
      setSendError('We need an email address to reply to.')
      return
    }
    setSendState('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Sample maker — ${garment.name} / ${spec.label}`,
          name: contact.name,
          email: contact.email,
          quantity: contact.qty,
          garment: garment.name,
          method: spec.label,
          text: isText ? text : '',
          typeface: isText ? font.label : '',
          widthCm: round(widthCm),
          heightCm: round(heightCm),
          positionCm: `x ${round(box.x * garment.cmPerUnit)}, y ${round(box.y * garment.cmPerUnit)}`,
          artworkSupplied: art ? 'yes — customer to email the file' : 'no',
          notes,
        }),
      })
      if (res.ok) {
        setSendState('sent')
        void downloadSheet()
        return
      }
      const body = await res.json().catch(() => null)
      setSendError(body?.errors?.[0]?.message ?? `Could not send. Please email ${EMAIL}.`)
      setSendState('idle')
    } catch {
      setSendError(`Network error — please email ${EMAIL}.`)
      setSendState('idle')
    }
  }

  /* ---------------- render ---------------- */

  const [, , vbW] = garment.viewBox.split(' ').map(Number)
  const handleSize = vbW / 42

  const controlBlock: React.CSSProperties = { borderTop: '1px solid var(--rule)', paddingTop: '1.25rem', marginTop: '1.75rem' }

  return (
    <section style={{ background: 'var(--paper)', paddingBlock: '6.5rem' }}>
      <div className="container">
        <SectionHead label="Sample maker" meta="Indicative visual" />

        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-7">
            <H style={{ fontSize: 'clamp(1.75rem, 3.6vw, 3rem)' }}>
              Put your mark on the blank.
            </H>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="prose-body" style={{ fontSize: '0.9375rem' }}>
              Choose a garment, drop in your artwork, and size it where you want it. You get a
              specification sheet to send us — we quote from that.
            </p>
          </div>
        </div>

        {/* Garment picker */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p className="label" style={{ marginBottom: '1rem' }}>01 — Garment</p>
          <div
            role="radiogroup"
            aria-label="Garment"
            className="grid gap-px"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))' }}
          >
            {garments.map(g => {
              const active = g.id === garment.id
              return (
                <button
                  key={g.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setGarment(g)}
                  style={{
                    background: 'var(--paper)',
                    color: 'var(--black)',
                    border: 'none',
                    boxShadow: active
                      ? 'inset 0 0 0 2px var(--black)'
                      : 'inset 0 0 0 1px var(--rule)',
                    fontWeight: active ? 600 : 400,
                    cursor: 'pointer',
                    padding: '1rem 0.5rem 0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background 0.15s ease, color 0.15s ease',
                  }}
                >
<GarmentFlat
                    garment={g}
                    simple
                    style={{ width: 48, height: 54, display: 'block' }}
                  />
                  <span className="mono" style={{ fontSize: '0.625rem', letterSpacing: '0.08em', textAlign: 'center' }}>
                    {g.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Stage */}
          <div className="lg:col-span-7">
            <div
              style={{
                border: '1px solid var(--rule)',
                background: '#f6f6f4',
                padding: '1.5rem',
                position: 'relative',
              }}
            >
              <GarmentFlat
                svgRef={svgRef}
                garment={garment}
                title={`${garment.name} with your ${isText ? 'text' : 'artwork'} positioned on it`}
                style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'none' }}
              >
                {/* Print-area guide sits ABOVE the garment — drawn underneath it, the
                    cloth fill hides it completely. */}
                <rect
                  data-chrome="true"
                  x={pa.x} y={pa.y} width={pa.w} height={pa.h}
                  fill="none" stroke={'rgba(0,0,0,0.35)'}
                  strokeWidth={2} strokeDasharray="9 7"
                />

                {/* artwork */}
                {!isText && art && (
                  <image
                    href={art.src}
                    x={box.x} y={box.y} width={box.w} height={box.h}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ cursor: 'move' }}
                    onPointerDown={startDrag('move')}
                  />
                )}

                {isText && text && (
                  <text
                    ref={textRef}
                    x={box.x} y={box.y}
                    fontFamily={font.stack}
                    fontSize={textSize}
                    fill={'#111'}
                    style={{ cursor: 'move' }}
                    onPointerDown={startDrag('move')}
                  >
                    {text}
                  </text>
                )}

                {/* selection chrome */}
                {((!isText && art) || (isText && text)) && (
                  <g data-chrome="true">
                    <rect
                      x={isText ? box.x - 4 : box.x}
                      y={isText ? box.y - textSize : box.y}
                      width={isText ? Math.max(textW, 10) + 8 : box.w}
                      height={isText ? textSize * 1.3 : box.h}
                      fill="none"
                      stroke={'rgba(0,0,0,0.6)'}
                      strokeWidth={2}
                      strokeDasharray="6 6"
                      tabIndex={0}
                      role="application"
                      aria-label="Artwork position. Arrow keys move it, plus and minus resize it."
                      onKeyDown={onArtKeyDown}
                      onPointerDown={startDrag('move')}
                      style={{ cursor: 'move' }}
                    />
                    <rect
                      x={(isText ? box.x - 4 + Math.max(textW, 10) + 8 : box.x + box.w) - handleSize / 2}
                      y={(isText ? box.y + textSize * 0.3 : box.y + box.h) - handleSize / 2}
                      width={handleSize}
                      height={handleSize}
                      fill={'#000'}
                      style={{ cursor: 'nwse-resize' }}
                      onPointerDown={startDrag('resize')}
                    />
                  </g>
                )}
              </GarmentFlat>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
              <span className="label">Drag to move · corner to resize · arrow keys nudge</span>
            </div>

            {(overMax || outsidePrintArea) && (
              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--rule)', paddingTop: '1rem' }}>
                {overMax && (
                  <p className="mono" style={{ fontSize: '0.8125rem', color: '#c0392b', marginBottom: '0.4rem' }}>
                    ⚠ {round(widthCm)} cm is wider than we can {spec.label.toLowerCase()} in one pass
                    (max {spec.maxWidthCm} cm). It can still be quoted — it may need panelling.
                  </p>
                )}
                {outsidePrintArea && (
                  <p className="mono" style={{ fontSize: '0.8125rem', color: 'var(--ink-70)' }}>
                    Artwork sits outside the dashed print area. Possible on seams and edges, but worth
                    a conversation first.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="lg:col-span-5">
            {/* method */}
            <p className="label" style={{ marginBottom: '1rem' }}>02 — Method</p>
            <div role="radiogroup" aria-label="Decoration method" className="grid grid-cols-3 gap-px" style={{ background: 'var(--rule)' }}>
              {decorationMethods.map(m => {
                const active = m.id === method
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setMethod(m.id)}
                    className="mono"
                    style={{
                      background: active ? 'var(--black)' : 'var(--paper)',
                      color: active ? 'var(--paper)' : 'var(--black)',
                      border: 'none', cursor: 'pointer',
                      padding: '0.875rem 0.5rem',
                      fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}
                  >
                    {m.label}
                  </button>
                )
              })}
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--ink-70)', lineHeight: 1.6, marginTop: '0.875rem' }}>
              {spec.blurb}
            </p>

            {/* artwork or text */}
            <div style={controlBlock}>
              <p className="label" style={{ marginBottom: '1rem' }}>
                03 — {isText ? 'Your text' : 'Your artwork'}
              </p>

              {isText ? (
                <>
                  <div className="field" style={{ marginBottom: '1.25rem' }}>
                    <label className="field-label" htmlFor="sm-text">Name or line of text</label>
                    <input
                      id="sm-text" className="field-input" type="text" maxLength={40}
                      value={text} onChange={e => setText(e.target.value)}
                      placeholder="e.g. Front of House"
                    />
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="sm-font">Typeface</label>
                    <select id="sm-font" className="field-input" value={fontId} onChange={e => setFontId(e.target.value)}>
                      {textFonts.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <input
                    ref={fileRef}
                    id="sm-file"
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={onFile}
                    style={{ display: 'none' }}
                  />
                  <div className="flex flex-wrap gap-3 items-center">
                    <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
                      {art ? 'Replace image' : 'Upload image'}
                    </button>
                    {art && (
                      <button
                        type="button"
                        className="link-underline"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={() => { setArt(null); if (fileRef.current) fileRef.current.value = '' }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="label" style={{ marginTop: '0.875rem', lineHeight: 1.6 }}>
                    PNG, JPG, SVG or WebP · up to 10 MB · transparent PNG works best
                  </p>
                  {uploadError && <p className="field-error" style={{ marginTop: '0.75rem' }}>{uploadError}</p>}
                </>
              )}
            </div>

            {/* placement */}
            <div style={controlBlock}>
              <p className="label" style={{ marginBottom: '1rem' }}>04 — Placement</p>
              <div className="flex flex-wrap gap-2">
                {garment.placements.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    className="btn btn-outline"
                    style={{ padding: '0.55rem 0.875rem', fontSize: '0.625rem' }}
                    onClick={() => applyPlacement(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label className="field-label" htmlFor="sm-size" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Size — {round(widthCm)} cm wide
                </label>
                <input
                  id="sm-size"
                  type="range"
                  min={isText ? 8 : 16}
                  max={isText ? 120 : Math.round(vbW * 0.9)}
                  value={isText ? textSize : Math.round(box.w)}
                  onChange={e => {
                    const v = Number(e.target.value)
                    if (isText) setTextSize(v)
                    else setBox(b => ({ ...b, w: v, h: v * (b.h / b.w) }))
                  }}
                  style={{ width: '100%', accentColor: '#000' }}
                />
              </div>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-1" style={{ marginTop: '1.25rem' }}>
                <dt className="label">Width</dt>
                <dd className="mono" style={{ margin: 0, fontSize: '0.8125rem', textAlign: 'right' }}>{round(widthCm)} cm</dd>
                <dt className="label">Height</dt>
                <dd className="mono" style={{ margin: 0, fontSize: '0.8125rem', textAlign: 'right' }}>{round(heightCm)} cm</dd>
              </dl>
            </div>

            {/* output */}
            <div style={controlBlock}>
              <p className="label" style={{ marginBottom: '1rem' }}>05 — Send it to us</p>

              {sendState === 'sent' ? (
                <div style={{ border: '1px solid var(--rule)', padding: '1.5rem' }}>
                  <p className="mono" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Specification received.</p>
                  <p className="prose-body" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                    Your design sheet has downloaded. {art && (
                      <>Reply to our confirmation with your original artwork file attached — we need the
                      full-resolution original to produce from.</>
                    )}
                  </p>
                  <button type="button" className="btn btn-outline" onClick={() => { setSendState('idle'); reset() }}>
                    Start another
                  </button>
                </div>
              ) : (
                <form onSubmit={sendSpec} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {sendError && <p role="alert" className="field-error">{sendError}</p>}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="field">
                      <label className="field-label" htmlFor="sm-name">Name</label>
                      <input id="sm-name" className="field-input" value={contact.name}
                        onChange={e => setContact(c => ({ ...c, name: e.target.value }))} />
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="sm-qty">Quantity</label>
                      <input id="sm-qty" className="field-input" inputMode="numeric" placeholder="e.g. 40"
                        value={contact.qty} onChange={e => setContact(c => ({ ...c, qty: e.target.value }))} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="sm-email">Email *</label>
                    <input id="sm-email" type="email" className="field-input" value={contact.email}
                      onChange={e => setContact(c => ({ ...c, email: e.target.value }))} />
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="sm-notes">Notes</label>
                    <textarea id="sm-notes" rows={3} className="field-input" style={{ resize: 'vertical' }}
                      placeholder="Colours, fabric, deadline…"
                      value={notes} onChange={e => setNotes(e.target.value)} />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className="btn" disabled={sendState === 'sending'}>
                      {sendState === 'sending' ? 'Sending…' : 'Send specification'}
                      {sendState !== 'sending' && <span className="arrow" aria-hidden="true">→</span>}
                    </button>
                    <button type="button" className="btn btn-outline" onClick={downloadSheet}>
                      Download sheet
                    </button>
                  </div>
                </form>
              )}

              <p className="label" style={{ marginTop: '1.25rem', lineHeight: 1.7 }}>
                The visual is indicative. Final placement, scale and colour are confirmed at sampling.
              </p>
            </div>

            <div style={controlBlock}>
              <button
                type="button"
                className="link-underline"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={reset}
              >
                Reset everything
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
