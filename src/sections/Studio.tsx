export default function Studio() {
  return (
    <section id="studio" className="py-20 md:py-28 bg-white border-t border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <div>
            <p className="label-text mb-3">Studio</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Our workshop</h2>
          </div>
          <p className="text-sm text-gray-500 max-w-md">
            Located in Dubai, our studio houses pattern drafting equipment, fabric archives, 
            and production facilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="aspect-square image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-sm">KIMI_REF: Studio Wide Shot</span>
          </div>
          <div className="aspect-square image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-sm">KIMI_REF: Production Detail</span>
          </div>
          <div className="aspect-[4/3] image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-xs text-center px-2">KIMI_REF: Pattern Archive</span>
          </div>
          <div className="aspect-[4/3] image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-xs text-center px-2">KIMI_REF: Finished Garments</span>
          </div>
          <div className="col-span-2 aspect-[16/9] image-placeholder rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-sm">KIMI_REF: Materials Storage</span>
          </div>
        </div>
        
      </div>
    </section>
  )
}
