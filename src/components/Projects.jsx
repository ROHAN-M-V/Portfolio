import useScrollReveal from '../hooks/useScrollReveal'

function PipelineStep({ stage, title, detail, stream, streamColor, hoverColor }) {
  return (
    <div
      className="pipeline-step"
      style={{ '--hover-color': hoverColor }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = hoverColor || 'var(--color-tertiary)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)' }}
    >
      <div className="pipeline-step-label">
        <span>{stage}</span>
        <span style={{ color: hoverColor || 'var(--color-tertiary)' }}>LIVE PING</span>
      </div>
      <div className="pipeline-step-title">{title}</div>
      <div className="pipeline-step-detail">{detail}</div>
      {stream && (
        <div className="pipeline-step-stream" style={{ color: streamColor || 'var(--color-tertiary)' }}>
          <span>{stream}</span>
          <span className="animate-pulse">{stream.includes('VERIFIED') ? '✓' : '→'}</span>
        </div>
      )}
    </div>
  )
}

function AssertionCard({ number, label, text, color }) {
  return (
    <div className="assertion-card">
      <span className="assertion-label" style={{ color }}>{number} / {label}</span>
      <p className="assertion-text">{text}</p>
    </div>
  )
}

export default function Projects() {
  const ref = useScrollReveal()

  return (
    <section className="section" id="work" ref={ref} style={{ background: 'var(--color-surface-container-low)' }}>
      <div className="section-inner" style={{ gap: '56px' }}>
        {/* Header */}
        <div className="section-header reveal-on-scroll">
          <div>
            <div className="section-label" style={{ color: 'var(--color-secondary)', marginBottom: 4 }}>
              <span className="section-label-dot" style={{ background: 'var(--color-secondary)' }} />
              SYSTEM ARCHITECTURE ARCHIVES
            </div>
            <h2 className="section-title">Selected Engineering Works</h2>
          </div>
          <span className="section-badge">04 MONITORED DEPLOYMENTS // 2025—2026</span>
        </div>

        {/* PROJECT 01: Bank Royale */}
        <article className="project-card neo-card-lift neo-shadow-lg reveal-on-scroll">
          <div className="project-header" style={{ flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                <div className="project-badges">
                  <span className="project-badge" style={{ background: 'var(--color-primary-container)', fontWeight: 800 }}>PROJECT 01</span>
                  <span className="project-badge" style={{ background: 'var(--color-tertiary-container)' }}>DISTRIBUTED CLUSTER</span>
                </div>
                <span className="font-mono" style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', fontWeight: 500, letterSpacing: '0.05em' }}>
                  MAY 2026 — PRESENT
                </span>
              </div>
              <h3 className="project-title">
                Bank Royale <span className="project-subtitle">/ Financial Simulation &amp; Microservices Engine</span>
              </h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              <span className="project-tech-badge">TypeScript · React · Encore.dev · PostgreSQL</span>
              <a href="https://github.com/rohanvernekar" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <span>INSPECT REPO</span>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_outward</span>
              </a>
            </div>
          </div>

          <p className="project-description">
            A high-concurrency financial simulation backend orchestrating competitive transactional game-states.
            Engineered with isolated microservices over <strong style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Encore.dev</strong>,
            paired with strict relational ACID state transitions to eliminate double-spend and race-conditions during peak execution rounds.
          </p>

          {/* Pipeline */}
          <div className="pipeline-container">
            <div className="pipeline-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pipeline-header-dot" style={{ background: 'var(--color-primary-container)' }} />
                ARCHITECTURAL TOPOLOGY &amp; WAL PIPELINE
              </span>
              <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-on-surface-variant)' }}>
                Interactive Pipeline Nodes [Hover to highlight]
              </span>
            </div>
            <div className="pipeline-grid">
              <PipelineStep stage="STAGE 01" title="React 19 + Vite" detail="Delta Polling & Optimistic State" stream="STREAM: gRPC" streamColor="var(--color-tertiary)" hoverColor="var(--color-tertiary)" />
              <PipelineStep stage="STAGE 02" title="Encore.dev Mesh" detail="Microservice RPC routing & Auth" stream="LOCK: Mutex Barrier" streamColor="var(--color-primary)" hoverColor="var(--color-primary)" />
              <PipelineStep stage="STAGE 03" title="State Orchestrator" detail="Round Resolvers & Audit Logs" stream="ISOLATION: ACID Lock" streamColor="var(--color-secondary)" hoverColor="var(--color-secondary)" />
              <PipelineStep stage="STAGE 04" title="PostgreSQL WAL" detail="Zero-Latency Sync Snapshot" stream="VERIFIED: SHA-256" streamColor="var(--color-primary)" hoverColor="var(--color-primary-container)" />
            </div>

            <div className="assertions-grid">
              <AssertionCard
                number="01"
                label="STATE ATOMICITY"
                text="Single-threaded financial mutation locks prevent balance discrepancies across concurrent multiplayer round ticks."
                color="var(--color-secondary)"
              />
              <AssertionCard
                number="02"
                label="ENCORE MICROSERVICES"
                text="Automatic type-safe contract generation between isolated banking, player profile, and game loop clusters."
                color="var(--color-tertiary)"
              />
              <AssertionCard
                number="03"
                label="DELTA RECONCILIATION"
                text="Bandwidth-efficient differential updates broadcasting only changed ledger cells to active participants."
                color="var(--color-primary)"
              />
            </div>
          </div>
        </article>

        {/* PROJECT 02: One-Tracker */}
        <article className="project-card neo-card-lift neo-shadow-lg reveal-on-scroll">
          <div className="project-header" style={{ flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                <div className="project-badges">
                  <span className="project-badge" style={{ background: 'var(--color-secondary-container)', fontWeight: 800 }}>PROJECT 02</span>
                  <span className="project-badge" style={{ background: 'var(--color-surface-container-high)' }}>AUTOMATED CRAWLER</span>
                </div>
                <span className="font-mono" style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', fontWeight: 500, letterSpacing: '0.05em' }}>
                  MAR 2026 — MAY 2026
                </span>
              </div>
              <h3 className="project-title">
                One-Tracker <span className="project-subtitle">/ Autonomous Price-Monitoring Engine</span>
              </h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              <span className="project-tech-badge">Python · Flask · SQLite WAL · Playwright · GitHub Actions</span>
              <a href="https://github.com/rohanvernekar" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ border: '2px solid var(--color-primary)' }}>
                <span>EXPLORE ENGINE</span>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_outward</span>
              </a>
            </div>
          </div>

          <p className="project-description">
            Resilient crawling engine built to harvest and normalize non-deterministic product catalog telemetry across
            complex client-rendered e-commerce targets. Operates unattended cron workflows backed by concurrency-tuned{' '}
            <strong style={{ color: 'var(--color-primary)', fontWeight: 700 }}>SQLite Write-Ahead Logging (WAL)</strong>.
          </p>

          {/* 5-Step Pipeline */}
          <div className="pipeline-container">
            <div className="pipeline-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pipeline-header-dot" style={{ background: 'var(--color-secondary)' }} />
                EXTRACTION &amp; NORMALIZATION PIPELINE
              </span>
              <span className="project-badge" style={{ fontSize: 10, background: 'var(--color-surface-container-lowest)' }}>
                CONCURRENCY: WAL MODE
              </span>
            </div>
            <div className="pipeline-grid pipeline-grid-5">
              {[
                { stage: 'STAGE 01', title: 'E-COMMERCE DOM', detail: 'Dynamic JS hydration' },
                { stage: 'STAGE 02', title: 'PLAYWRIGHT', detail: 'JSON-LD parse' },
                { stage: 'STAGE 03', title: 'REGEX FALLBACK', detail: 'Multi-currency sanitize' },
                { stage: 'STAGE 04', title: 'SQLITE (WAL)', detail: 'Parallel non-blocking' },
                { stage: 'STAGE 05', title: 'DIFF ENGINE', detail: 'Instant delta alert' },
              ].map((step) => (
                <div key={step.stage} className="pipeline-step" style={{ padding: 12 }}>
                  <div style={{ color: 'var(--color-secondary)', fontWeight: 700, fontSize: 10, fontFamily: 'var(--font-mono)' }}>{step.stage}</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginTop: 4, fontSize: 14, fontFamily: 'var(--font-headline)' }}>{step.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-on-surface-variant)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{step.detail}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, background: 'var(--color-surface-container-lowest)', padding: 16, border: '1px solid var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ color: 'var(--color-secondary)', fontWeight: 800, fontSize: 14 }}>↳</span>
                <span style={{ color: 'var(--color-on-surface-variant)' }}>
                  <strong style={{ color: 'var(--color-primary)', fontWeight: 700 }}>SQLite WAL Optimization:</strong> Allows non-blocking parallel worker writes during high-throughput scraper cycles.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ color: 'var(--color-secondary)', fontWeight: 800, fontSize: 14 }}>↳</span>
                <span style={{ color: 'var(--color-on-surface-variant)' }}>
                  <strong style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Cascading Extractor:</strong> Evaluates schema.org structured objects first; cascades gracefully to localized string heuristics.
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* 2-Column Mosaic: Projects 03 & 04 */}
        <div className="project-mosaic">
          {/* PROJECT 03: ThinkQ */}
          <article className="project-card neo-card-lift neo-shadow reveal-on-scroll" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-primary)', paddingBottom: 8 }}>
                <span className="project-badge" style={{ background: 'var(--color-surface-container)' }}>03 / SMART INDIA HACKATHON</span>
                <span className="font-mono" style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>DEC 2025 — JAN 2026</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-primary)' }}>ThinkQ</h3>
                <p className="font-mono" style={{ fontSize: 12, color: 'var(--color-tertiary)', fontWeight: 700, marginTop: 4 }}>React · FastAPI · MongoDB Atlas · AI Schema Validation</p>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-on-surface-variant)', lineHeight: 1.7 }}>
                Full-stack automated evaluation and continuous assessment architecture. Uses strict Pydantic parsing over
                generative LLM output streams, converting probabilistic responses into deterministic relational question banks
                and candidate telemetry logs.
              </p>

              {/* Relational Stream */}
              <div style={{ background: 'var(--color-surface-container-low)', padding: 14, border: '1px solid var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', fontWeight: 700 }}>RELATIONAL INGESTION STREAM</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, fontSize: 11, paddingTop: 8, fontWeight: 600, overflowX: 'auto' }}>
                  {['CANDIDATE', 'FASTAPI', 'SCHEMA GUARD', 'MONGO WAL'].map((step, i) => (
                    <span key={step} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ padding: '4px 8px', background: 'var(--color-surface-container-lowest)', border: '1px solid var(--color-primary)' }}>{step}</span>
                      {i < 3 && <span style={{ color: 'var(--color-tertiary)' }}>➔</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ paddingTop: 16, borderTop: '1px solid rgba(26,26,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              <span style={{ color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>Sub-second generation latency</span>
              <a href="https://github.com/rohanvernekar" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                INSPECT REPO <span>↗</span>
              </a>
            </div>
          </article>

          {/* PROJECT 04: Feedback Summarizer */}
          <article className="project-card neo-card-lift neo-shadow reveal-on-scroll" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-primary)', paddingBottom: 8 }}>
                <span className="project-badge" style={{ background: 'var(--color-surface-container)' }}>04 / NLP UTILITY</span>
                <span className="font-mono" style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>NOV 2025 — DEC 2025</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-primary)' }}>Feedback Summarizer</h3>
                <p className="font-mono" style={{ fontSize: 12, color: 'var(--color-secondary)', fontWeight: 700, marginTop: 4 }}>Python · FastAPI · Natural Language Processing</p>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-on-surface-variant)', lineHeight: 1.7 }}>
                Micro-service designed to ingest raw, noisy customer verbatims, cluster common friction points, and output
                normalized sentiment metrics alongside concise executive-level summaries via vectorized linguistic extraction.
              </p>

              {/* Sentiment Bar */}
              <div style={{ background: 'var(--color-surface-container-low)', padding: 16, border: '1px solid var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
                  <span style={{ color: 'var(--color-on-surface-variant)', fontWeight: 700 }}>SENTIMENT POLARITY</span>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 800, background: 'var(--color-primary-container)', padding: '2px 6px', border: '1px solid var(--color-primary)' }}>
                    +0.74 (POSITIVE)
                  </span>
                </div>
                <div style={{ width: '100%', background: 'var(--color-surface-container-highest)', height: 12, border: '1px solid var(--color-primary)', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--color-primary)', height: '100%', width: '74%', transition: 'width 1s ease' }} />
                </div>
                <div style={{ fontSize: 10, color: 'var(--color-on-surface-variant)' }}>
                  Output: JSON Schema with categorized issue tags &amp; frequency histograms.
                </div>
              </div>
            </div>

            <div style={{ paddingTop: 16, borderTop: '1px solid rgba(26,26,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              <span style={{ color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>FastAPI endpoint delivery</span>
              <a href="https://github.com/rohanvernekar" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                INSPECT CODE <span>↗</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
