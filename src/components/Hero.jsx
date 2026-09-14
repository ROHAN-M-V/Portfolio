import { useState, useCallback } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const NODES = [
  {
    id: 'INTR_GATE',
    desc: 'Edge Interrupt Arbiter',
    metric: '99.98% uptime',
    latency: '1.8ms',
    classification: 'EDGE_LAYER',
  },
  {
    id: 'TX_CORE',
    desc: 'Postgres ACID Engine',
    metric: 'Tx Pool 58/64',
    latency: '0.6ms',
    classification: 'CORE_ENGINE',
  },
  {
    id: 'CRON_PIPE',
    desc: 'Playwright Headless Ingest',
    metric: '120 Scrapes/Hr',
    latency: '120ms',
    classification: 'WORKER_DAEMON',
  },
  {
    id: 'SYNC_BUS',
    desc: 'Differential Polling Sync',
    metric: 'Queue: 0 bytes',
    latency: '8.4ms',
    classification: 'DATA_PERSIST',
  },
  {
    id: 'MCU_ATMEGA',
    desc: 'ATmega328P Hardware ISR',
    metric: '16MHz Clock Tick',
    latency: '0.12μs',
    classification: 'EMBEDDED_MCU',
  },
]

function copyEmail(email) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).catch(() => {
      prompt('Copy email address:', email)
    })
  } else {
    prompt('Copy email address:', email)
  }
}

export default function Hero() {
  const ref = useScrollReveal()
  const [inspected, setInspected] = useState(NODES[1])

  const handleNodeClick = useCallback((node) => {
    setInspected(node)
  }, [])

  return (
    <section className="section hero" id="hero" ref={ref}>
      <div className="section-inner" style={{ gap: '40px' }}>

        {/* Hero Grid */}
        <div className="hero-grid">
          {/* Left: Statement */}
          <div className="hero-statement reveal-on-scroll">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="hero-role-badge">
                Student  &amp; Open Source
              </div>
              <h1 className="hero-name">
                ROHAN<br />
                <span className="hero-name-highlight">VERNEKAR</span>
              </h1>
              <p className="hero-tagline">
                Building web applications, experimenting with{' '} <span className="hero-tagline-highlight">AI</span>&amp;solving problems with code.
              </p>
              <p className="hero-description">
                Electronics & Communication Engineering sophomore at NIT Goa. I build web applications, experiment with AI, and work on projects that bridge software with hardware and embedded systems. Currently learning by building, breaking, and shipping things.
              </p>
            </div>

            {/* Actions */}
            <div className="hero-actions">
              <a href="#work" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}>
                <span>EXPLORE 04 ARTIFACTS</span>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
              </a>


            </div>
          </div>

          {/* Right: Topology */}
          <div className="topology-panel reveal-on-scroll">
            <div className="topology-header">
              <div className="topology-title">
                <span className="topology-title-dot" />
                TOPOLOGY BUS TELEMETRY
              </div>
              <span className="topology-status">ACTIVE: {inspected.id}</span>
            </div>

            {/* SVG Canvas */}
            <div className="topology-canvas">
              <svg viewBox="0 0 340 180" style={{ width: '100%', height: '100%', userSelect: 'none' }}>
                <defs>
                  <pattern id="bauhaus-grid" patternUnits="userSpaceOnUse" width="16" height="16">
                    <line x1="0" y1="0" x2="16" y2="0" stroke="#1a1a1a" strokeOpacity="0.15" strokeWidth="0.5" />
                    <line x1="0" y1="0" x2="0" y2="16" stroke="#1a1a1a" strokeOpacity="0.15" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bauhaus-grid)" />

                {/* Bus traces */}
                <path d="M 45 90 L 295 90" stroke="#1a1a1a" strokeWidth="2" />
                <path d="M 170 30 L 170 150" stroke="#1a1a1a" strokeWidth="2" />
                <path d="M 45 90 L 170 30" stroke="#1a1a1a" strokeDasharray="3 3" strokeWidth="1.5" />
                <path d="M 170 30 L 295 90" stroke="#1a1a1a" strokeDasharray="3 3" strokeWidth="1.5" />

                {/* Animated flow */}
                <line x1="45" y1="90" x2="170" y2="90" className="animate-packet-flow" stroke="#0055ff" strokeWidth="2.5" />
                <line x1="170" y1="90" x2="295" y2="90" className="animate-packet-flow-fast" stroke="#e63b2e" strokeWidth="2.5" />
                <line x1="170" y1="30" x2="170" y2="90" className="animate-packet-flow" stroke="#ffcc00" strokeWidth="2.5" />

                {/* Node 1: Edge */}
                <g style={{ cursor: 'pointer' }} onClick={() => handleNodeClick(NODES[0])}>
                  <circle cx="45" cy="90" r="14" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
                  <rect x="39" y="84" width="12" height="12" fill="#0055ff" />
                  <text x="45" y="118" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" fill="#1a1a1a">EDGE.01</text>
                </g>

                {/* Node 2: Core */}
                <g style={{ cursor: 'pointer' }} onClick={() => handleNodeClick(NODES[1])}>
                  <rect x="145" y="65" width="50" height="50" rx="2" fill="#ffcc00" stroke="#1a1a1a" strokeWidth="2" />
                  <circle cx="170" cy="90" r="6" fill="#1a1a1a" />
                  <text x="170" y="103" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fontWeight="800" fill="#1a1a1a">CORE.TX</text>
                </g>

                {/* Node 3: Cron */}
                <g style={{ cursor: 'pointer' }} onClick={() => handleNodeClick(NODES[2])}>
                  <polygon points="170,18 182,36 158,36" fill="#e63b2e" stroke="#1a1a1a" strokeWidth="2" />
                  <text x="170" y="13" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fontWeight="700" fill="#1a1a1a">CRON</text>
                </g>

                {/* Node 4: Sync */}
                <g style={{ cursor: 'pointer' }} onClick={() => handleNodeClick(NODES[3])}>
                  <rect x="275" y="72" width="36" height="36" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
                  <circle cx="293" cy="90" r="5" fill="#0055ff" />
                  <text x="293" y="120" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" fill="#1a1a1a">SYNC</text>
                </g>

                {/* Node 5: MCU */}
                <g style={{ cursor: 'pointer' }} onClick={() => handleNodeClick(NODES[4])}>
                  <circle cx="170" cy="150" r="10" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
                  <rect x="166" y="146" width="8" height="8" fill="#1a1a1a" />
                  <text x="170" y="172" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fontWeight="700" fill="#1a1a1a">MCU.D2</text>
                </g>
              </svg>
              <span className="topology-hint">CLICK NODES</span>
            </div>

            {/* Readout */}
            <div className="topology-readout">
              <div className="readout-row" style={{ paddingBottom: 4, borderBottom: '1px solid var(--color-outline-variant)' }}>
                <span className="readout-label">SUBSYSTEM ID:</span>
                <span className="readout-value highlight">{inspected.id}</span>
              </div>
              <div className="readout-row">
                <span className="readout-label" style={{ fontSize: 11 }}>ROLE:</span>
                <span className="readout-value">{inspected.desc}</span>
              </div>
              <div className="readout-row">
                <span className="readout-label" style={{ fontSize: 11 }}>METRICS:</span>
                <span className="readout-value tertiary">{inspected.latency} ({inspected.metric})</span>
              </div>
              <div className="readout-row" style={{ fontSize: 10 }}>
                <span className="readout-label">CLASSIFICATION:</span>
                <span className="readout-value secondary" style={{ textTransform: 'uppercase' }}>
                  {inspected.classification}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
