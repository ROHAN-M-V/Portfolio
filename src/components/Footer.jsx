export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-name">Rohan Vernekar — ECE Systems &amp; Open Source</div>
          <div className="footer-tagline">Independent systems architecture, embedded hardware &amp; applied digital software.</div>
        </div>
        <div className="footer-links">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="footer-dot" />
            <span>IST (UTC+05:30)</span>
          </div>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  )
}
