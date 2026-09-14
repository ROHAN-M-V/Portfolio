import { useState, useCallback } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const STATES = [
  {
    id: 1,
    name: 'STATE: IDLE_LOCKED',
    desc: 'Sensors sampling at 100Hz sleep loop; motor PWM disabled',
    transition: '↓ [INTERRUPT: MOTION DETECTED (FALLING D2)]',
  },
  {
    id: 2,
    name: 'STATE: OPENING_SMOOTH',
    desc: 'Cosine acceleration profile; 0° to 90° in 1200ms',
    transition: '↓ [TIMER: 5000ms HOLD INTERVAL]',
  },
  {
    id: 3,
    name: 'STATE: CLOSING_CHECK',
    desc: 'Continuous ultrasonic ping sweep; aborts on path obstruction',
    transition: null,
  },
]

export default function Hardware() {
  const ref = useScrollReveal()
  const [activeState, setActiveState] = useState(1)

  const cycleState = useCallback(() => {
    setActiveState((prev) => (prev % 3) + 1)
  }, [])

  return (
    <section className="section" id="hardware" ref={ref} style={{ background: 'var(--color-surface-container-low)' }}>
      <div className="section-inner">
        {/* Header */}
        <div className="section-header reveal-on-scroll">
          <div>
            <div className="section-label" style={{ color: 'var(--color-secondary)', marginBottom: 4 }}>
              <span className="section-label-dot" style={{ background: 'var(--color-secondary)' }} />
              PHYSICAL COMPUTING // EMBEDDED
            </div>
            <h2 className="section-title">Hardware &amp; Circuit Telemetry</h2>
          </div>
          <span className="section-badge">ELECTRICAL &amp; ELECTRONICS DISCIPLINE</span>
        </div>

        {/* Feature Card */}
        <div className="project-card neo-card-lift neo-shadow-lg reveal-on-scroll">
          <div className="hardware-layout">
            {/* Left: Project Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
                <span className="project-badge" style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)', fontWeight: 700 }}>
                  HARDWARE PROTO // 01
                </span>
                <span className="project-badge" style={{ background: 'var(--color-primary-container)' }}>
                  ARDUINO · C++ · PWM CONTROL
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--color-primary)' }}>
                Smart Sliding Door Prototype
              </h3>

              <p style={{ fontSize: 16, color: 'var(--color-on-surface)', lineHeight: 1.7 }}>
                Autonomous mechanical actuation unit driven by an{' '}
                <strong style={{ color: 'var(--color-primary)', fontWeight: 700 }}>ATmega328P</strong>{' '}
                microcontroller running deterministic C++ finite state logic. Combines active PIR proximity
                telemetry, obstacle debounce thresholds, and PWM servo trajectory curves to ensure smooth
                mechanical transitions without jitter.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                <div style={{
                  background: 'var(--color-surface-container-low)',
                  padding: 14,
                  border: '2px solid var(--color-primary)',
                  boxShadow: '2px 2px 0px var(--color-primary)',
                }}>
                  <span style={{ color: 'var(--color-on-surface-variant)', fontSize: 10, textTransform: 'uppercase', fontWeight: 700 }}>INPUT INTERRUPT</span>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginTop: 4, fontSize: 14 }}>PIR Digital Pin D2</div>
                  <div style={{ fontSize: 10, color: 'var(--color-secondary)', fontWeight: 700, marginTop: 2 }}>FALLING edge trigger</div>
                </div>
                <div style={{
                  background: 'var(--color-surface-container-low)',
                  padding: 14,
                  border: '2px solid var(--color-primary)',
                  boxShadow: '2px 2px 0px var(--color-primary)',
                }}>
                  <span style={{ color: 'var(--color-on-surface-variant)', fontSize: 10, textTransform: 'uppercase', fontWeight: 700 }}>ACTUATION BUS</span>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginTop: 4, fontSize: 14 }}>PWM Pin D9 (Timer1)</div>
                  <div style={{ fontSize: 10, color: 'var(--color-tertiary)', fontWeight: 700, marginTop: 2 }}>50Hz Servo waveform</div>
                </div>
              </div>

              {/* Cycle Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 8 }}>
                <span className="font-mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary)' }}>SIMULATE CYCLE:</span>
                <button
                  className="btn-ghost"
                  onClick={cycleState}
                  style={{ textTransform: 'uppercase' }}
                >
                  TRIGGER NEXT STATE ➔
                </button>
              </div>
            </div>

            {/* Right: State Machine */}
            <div className="state-machine-container">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                borderBottom: '1px solid var(--color-primary)',
                paddingBottom: 12,
              }}>
                <span style={{ fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)' }}>EMBEDDED STATE MACHINE FLOW</span>
                <span style={{
                  color: 'var(--color-secondary)',
                  fontWeight: 700,
                  background: 'var(--color-surface-container-lowest)',
                  padding: '2px 8px',
                  border: '1px solid var(--color-primary)',
                }}>16 MHz OSC</span>
              </div>

              {STATES.map((state) => (
                <div key={state.id}>
                  <div className={`state-block ${activeState === state.id ? 'active' : 'inactive'}`}>
                    <div className={`state-number ${activeState === state.id ? 'active' : 'inactive'}`}>
                      {state.id}
                    </div>
                    <div className="state-info">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <span className="state-name">{state.name}</span>
                        {activeState === state.id && (
                          <span className="state-badge active">ACTIVE</span>
                        )}
                      </div>
                      <span className="state-desc">{state.desc}</span>
                    </div>
                  </div>
                  {state.transition && (
                    <div className="state-transition-label">{state.transition}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
