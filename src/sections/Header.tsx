interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div style={{ position: 'fixed', width: '100%', zIndex: 50, top: 0, left: 0, margin: 0, padding: 0 }}>
      {/* Announcement Bar */}
      <div style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '8px 16px', width: '100%' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>Production units in the UAE • Serving all seven emirates</p>
      </div>
      
      {/* Main Navigation */}
      <header style={{ backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e0e0e0', width: '100%' }}>
        <div style={{ maxWidth: '100%', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.9, fontSize: '1.5rem' }}>PCP</span>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#6b7280', textTransform: 'uppercase' }}>Popalzai Clothing Production</span>
          </div>
          
          <button 
            style={{ fontSize: '14px', fontWeight: 500 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            Menu
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div style={{ display: mobileMenuOpen ? 'block' : 'none', backgroundColor: 'white', borderBottom: '1px solid #e0e0e0', padding: '16px 24px' }}>
          <button onClick={() => scrollToSection('about')} style={{ display: 'block', padding: '8px 0', fontSize: '14px', width: '100%', textAlign: 'left' }}>About</button>
          <button onClick={() => scrollToSection('services')} style={{ display: 'block', padding: '8px 0', fontSize: '14px', width: '100%', textAlign: 'left' }}>Services</button>
          <button onClick={() => scrollToSection('work')} style={{ display: 'block', padding: '8px 0', fontSize: '14px', width: '100%', textAlign: 'left' }}>Work</button>
          <button onClick={() => scrollToSection('process')} style={{ display: 'block', padding: '8px 0', fontSize: '14px', width: '100%', textAlign: 'left' }}>Process</button>
          <button onClick={() => scrollToSection('contact')} style={{ display: 'block', padding: '8px 0', fontSize: '14px', fontWeight: 'bold', width: '100%', textAlign: 'left' }}>Start Project →</button>
        </div>
      </header>
    </div>
  )
}
