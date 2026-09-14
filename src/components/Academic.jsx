import useScrollReveal from '../hooks/useScrollReveal'

export default function Academic() {
  const ref = useScrollReveal()

  return (
    <section className="section" id="about" ref={ref} style={{ background: 'var(--color-surface-container-low)' }}>
      <div className="section-inner">
        {/* Header */}
        <div className="section-header reveal-on-scroll">
          <div>
            <div className="section-label" style={{ color: 'var(--color-secondary)', marginBottom: 4 }}>
              <span className="section-label-dot" style={{ background: 'var(--color-secondary)' }} />
              RECORD &amp; PEDAGOGY
            </div>
            <h2 className="section-title">Academic Record</h2>
          </div>
          <span className="section-badge">NATIONAL INSTITUTE OF TECHNOLOGY GOA</span>
        </div>

        {/* Stats Grid */}
        <div className="academic-grid">
          {/* JEE Main */}
          <div className="stat-card neo-card-lift neo-shadow reveal-on-scroll">
            <span className="stat-label" style={{ background: 'var(--color-primary-container)', color: 'var(--color-primary)' }}>
              STANDARDIZED APTITUDE
            </span>
            <div style={{ margin: '24px 0' }}>
              <div className="stat-value">98.01</div>
              <div className="stat-sub" style={{ color: 'var(--color-secondary)', letterSpacing: '0.08em' }}>
                PERCENTILE // JEE MAIN 2025
              </div>
            </div>
            <p className="stat-description">
              Placed in the top tier nationwide among 1,400,000+ candidates in rigorous analytical
              mathematics, physics, and engineering aptitude.
            </p>
          </div>

          {/* JEE Advanced */}
          <div className="stat-card neo-card-lift neo-shadow reveal-on-scroll">
            <span className="stat-label" style={{ background: 'var(--color-tertiary-container)', color: 'var(--color-primary)' }}>
              PREMIER ADMISSIONS
            </span>
            <div style={{ margin: '24px 0' }}>
              <div className="stat-value" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>QUALIFIED</div>
              <div className="stat-sub" style={{ color: 'var(--color-tertiary)', letterSpacing: '0.08em' }}>
                JEE ADVANCED 2025
              </div>
            </div>
            <p className="stat-description">
              Admitted to National Institute of Technology (NIT) Goa for B.Tech in Electronics and
               -Communication Engineering (Aug 2025 — Present).
            </p>
          </div>

          {/* Creed */}
          <div className="stat-card neo-card-lift neo-shadow reveal-on-scroll">
            <span className="stat-label" style={{ background: 'var(--color-surface-container)', color: 'var(--color-primary)' }}>
              ENGINEERING CREED
            </span>
            <blockquote style={{
              margin: '16px 0',
              fontFamily: 'var(--font-headline)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: 'var(--color-primary)',
              fontWeight: 700,
              lineHeight: 1.4,
            }}>
              &ldquo;investigating where elegant software abstractions meet physical
              silicon limits.&rdquo;
            </blockquote>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--color-on-surface-variant)',
              borderTop: '1px solid rgba(26,26,26,0.2)',
              paddingTop: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Coursework Highlights:</div>
              <div style={{ color: 'var(--color-on-surface)' }}>Data Structures, Circuit Analysis, Digital Logic Systems, Web Architecture.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
