import { useState, useCallback } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

function copyEmail(email) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(email).then(() => true).catch(() => {
      prompt('Copy email address:', email)
      return false
    })
  } else {
    prompt('Copy email address:', email)
    return Promise.resolve(false)
  }
}

export default function Contact() {
  const ref = useScrollReveal()
  const [showToast, setShowToast] = useState(false)

  const handleCopy = useCallback(async () => {
    const success = await copyEmail('vernekarrohan38@email.com')
    if (success) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3200)
    }
  }, [])

  return (
    <section className="section" id="contact" ref={ref} style={{ background: 'var(--color-surface)', padding: '80px 16px' }}>
      <div className="section-inner">
        <div className="contact-card reveal-on-scroll">
          <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: 'var(--color-primary)',
              fontWeight: 700,
              background: 'var(--color-primary-container)',
              padding: '4px 10px',
              border: '1px solid var(--color-primary)',
              display: 'inline-block',
              width: 'fit-content',
            }}>
              COMMUNICATIONS DISPATCH
            </span>
            <h2 className="contact-heading">
              Have something <span className="contact-heading-highlight">worth building</span>?
            </h2>
            <p className="contact-description">
              Always open to technical inquiries regarding distributed backend systems, open-source
              engine collaboration, or hardware-software embedded prototypes.
            </p>
          </div>

          {/* Actions */}
          <div className="contact-actions">
            <button className="contact-btn contact-btn-primary" onClick={handleCopy}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>content_copy</span>
              <span>COPY vernekarrohan38@email.com</span>
            </button>
            <a
              href="https://rohanmv.me"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn contact-btn-secondary"
            >
              <span>DOMAIN // rohanmv.me</span>
              <span style={{ fontSize: 12 }}>↗</span>
            </a>
            <a
              href="https://github.com/ROHAN-M-V"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn contact-btn-secondary"
            >
              GITHUB ↗
            </a>
            <a
              href="https://www.linkedin.com/in/rohan-vernekar-131595284/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn contact-btn-secondary"
            >
              LINKEDIN ↗
            </a>
          </div>

          {/* Toast */}
          {showToast && (
            <div className="toast">
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-primary)' }}>check_circle</span>
              <span style={{ fontWeight: 800, letterSpacing: '0.05em' }}>COPIED TO CLIPBOARD: vernekarrohan38@email.com</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
