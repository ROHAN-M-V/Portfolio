import useScrollReveal from '../hooks/useScrollReveal'

export default function OpenSource() {
  const ref = useScrollReveal()

  return (
    <section className="section" id="systems" ref={ref} style={{ background: 'var(--color-surface)' }}>
      <div className="section-inner">
        {/* Header */}
        <div className="section-header reveal-on-scroll">
          <div>
            <div className="section-label" style={{ color: 'var(--color-primary)', marginBottom: 4 }}>
              <span className="section-label-dot" style={{ background: 'var(--color-primary-container)', border: '1px solid var(--color-primary)' }} />
              SYSTEM CONTRIBUTION LOG
            </div>
            <h2 className="section-title">ScummVM Engine Internals</h2>
          </div>
          <div className="font-mono" style={{
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 12px',
            background: 'var(--color-surface-container-lowest)',
            border: '2px solid var(--color-primary)',
            boxShadow: '2px 2px 0px var(--color-primary)',
            color: 'var(--color-primary)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-secondary)' }} className="animate-ping" />
            UPSTREAM CONTRIBUTOR // FEB 2026 — PRESENT
          </div>
        </div>

        <div className="open-source-grid">
          {/* Left: Context */}
          <div className="reveal-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--color-on-surface)' }}>
              Contributing directly to the cross-platform virtual machine environment powering hundreds of
              classic adventure engines. Working inside C++ subsystems focused on accessibility integration,
              low-latency audio sync, and deterministic input controller mappings.
            </p>

            {/* Engine Telemetry */}
            <div style={{
              padding: 20,
              background: 'var(--color-surface-container-low)',
              border: '2px solid var(--color-primary)',
              boxShadow: '2px 2px 0px var(--color-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{
                fontWeight: 800,
                textTransform: 'uppercase',
                fontSize: 11,
                letterSpacing: '0.08em',
                borderBottom: '1px solid var(--color-primary)',
                paddingBottom: 8,
                display: 'flex',
                justifyContent: 'space-between',
                color: 'var(--color-primary)',
              }}>
                <span>ENGINE TELEMETRY</span>
                <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>ISO C++</span>
              </div>
              {[
                { label: 'Core Standard:', value: 'C++ (ISO Standard)' },
                { label: 'Subsystems:', value: 'Audio, Events, Common/TTS' },
                { label: 'Codebase Scale:', value: '> 3.2M SLOC' },
              ].map((row) => (
                <div key={row.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--color-outline-variant)',
                  paddingBottom: 6,
                }}>
                  <span style={{ color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>{row.label}</span>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Terminal Git Log */}
          <div className="terminal-window reveal-on-scroll">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot" style={{ background: 'var(--color-secondary)' }} />
                <span className="terminal-dot" style={{ background: 'var(--color-primary-container)' }} />
                <span className="terminal-dot" style={{ background: 'var(--color-tertiary-container)' }} />
                <span className="terminal-command">git log --author=&quot;Rohan Vernekar&quot; --patch</span>
                <span className="terminal-cursor" style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: 14 }}>_</span>
              </div>
              <span className="terminal-branch">BRANCH: MASTER</span>
            </div>

            {/* Commit 1 */}
            <div className="commit-block">
              <div className="commit-meta">
                <span className="commit-hash" style={{ background: 'var(--color-primary-container)' }}>commit 9c4b1a8</span>
                <span className="commit-date">2026-03-12 18:41:02</span>
              </div>
              <div className="commit-message">audio: integrate TTS accessibility pipeline into main input dispatch loop</div>
              <p className="commit-body">
                Eliminated deadlocks in simultaneous dialogue queueing by dispatching text strings into non-blocking
                background sound buffers with fallback synthesizer hooks.
              </p>
              <div className="commit-diff">
                <span className="diff-add">+ if (ConfMan.getBool(&quot;tts_enabled&quot;)) {'{'}</span><br />
                <span className="diff-add">+     _ttsMan-&gt;sayText(speechString, Common::TextToSpeechManager::QUEUE_INTERRUPT);</span><br />
                <span className="diff-remove">-     _sound-&gt;playVoiceDirect(speechFile);</span><br />
                <span style={{ color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>+ {'}'}</span>
              </div>
            </div>

            {/* Commit 2 */}
            <div className="commit-block">
              <div className="commit-meta">
                <span className="commit-hash" style={{ background: 'var(--color-surface-container)' }}>commit 4e77f02</span>
                <span className="commit-date">2026-02-28 11:15:39</span>
              </div>
              <div className="commit-message">backends/keymapper: optimize controller remap evaluation overhead</div>
              <p className="commit-body">
                Refactored quadratic event lookups into a constant-time hardware scancode LUT, dropping input polling
                overhead across portable handheld backends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
