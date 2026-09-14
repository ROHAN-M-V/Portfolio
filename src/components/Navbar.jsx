import { useState, useEffect, useMemo, useCallback } from 'react'
import useScrollSpy from '../hooks/useScrollSpy'

const NAV_ITEMS = [
  { id: 'work', label: '01.WORK' },
  { id: 'systems', label: '02.SYSTEMS' },
  { id: 'hardware', label: '03.HARDWARE' },
  { id: 'stack', label: '04.STACK' },
  { id: 'about', label: '05.ACADEMIC' },
  { id: 'contact', label: '06.DISPATCH', cta: true },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [clock, setClock] = useState('')
  const sectionIds = useMemo(() => ['hero', ...NAV_ITEMS.map(n => n.id)], [])
  const activeId = useScrollSpy(sectionIds)

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const hrs = String(now.getUTCHours()).padStart(2, '0')
      const mins = String(now.getUTCMinutes()).padStart(2, '0')
      const secs = String(now.getUTCSeconds()).padStart(2, '0')
      setClock(`${hrs}:${mins}:${secs} UTC`)
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          {/* Brand */}
          <a
            href="#hero"
            className="navbar-brand"
            onClick={(e) => handleNavClick(e, 'hero')}
          >
            <div className="navbar-brand-icon">RV</div>
            <div className="navbar-brand-text">
              <span className="navbar-brand-name">ROHAN VERNEKAR</span>
              <span className="navbar-brand-sub">ECE.ENG // OPEN SOURCE</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="navbar-links" id="nav-links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`navbar-link${item.cta ? ' cta' : ''}${activeId === item.id ? ' active' : ''
                  }`}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="navbar-right">
            <div className="navbar-status">
              <span className="status-dot-wrapper">
                <span className="status-dot-ping" />
                <span className="status-dot" />
              </span>
              <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>
                STATUS: BUS_ACTIVE
              </span>
              <span style={{ color: 'var(--color-outline-variant)', fontWeight: 700 }}>|</span>
              <span style={{ color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>
                {clock}
              </span>
            </div>

            <a
              href="#contact"
              className="navbar-ping-btn"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              PING ME
            </a>

            {/* Hamburger */}
            <button
              className={`hamburger-btn${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="mobile-menu-link"
            onClick={(e) => handleNavClick(e, item.id)}
          >
            <span>{item.label}</span>
            <span>→</span>
          </a>
        ))}
      </nav>
    </>
  )
}
