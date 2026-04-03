export default function Studio() {
  return (
    <section id="studio" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* KIMI_REF: Main studio image - wide shot of facility */}
          <div className="aspect-[16/9] image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-sm">KIMI_REF: Studio Wide Shot</span>
          </div>
          {/* KIMI_REF: Detail shot - fabric, thread, or tools */}
          <div className="aspect-[16/9] image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-sm">KIMI_REF: Production Detail</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* KIMI_REF: Pattern archive image */}
          <div className="aspect-square image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-xs text-center px-2">KIMI_REF: Pattern Archive</span>
          </div>
          {/* KIMI_REF: Garment rack or finished work */}
          <div className="aspect-square image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-xs text-center px-2">KIMI_REF: Finished Garments</span>
          </div>
          {/* KIMI_REF: Material/fabric storage */}
          <div className="aspect-square image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-xs text-center px-2">KIMI_REF: Materials Storage</span>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6 label-text">PCP Production Units • UAE</p>
      </div>
    </section>
  )
}
