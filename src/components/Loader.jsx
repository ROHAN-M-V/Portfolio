import { useState, useEffect, useRef, useCallback } from 'react'

const BOOT_LINES = [
  { text: '> INIT: portfolio_runtime v4.2.1', delay: 300 },
  { text: '> LOADING kernel modules...', delay: 600 },
  { text: '> MOUNT /sys/architect/rohan_vernekar', delay: 1000, highlight: true },
  { text: '> COMPILE: react_dom [OK]', delay: 1400, success: true },
  { text: '> LINK: design_system.neo_brutalist', delay: 1800 },
  { text: '> SYNC: project_artifacts [4 entries]', delay: 2200, info: true },
  { text: '> VERIFY: hardware_subsystems [ATmega328P]', delay: 2700 },
  { text: '> STREAM: topology_bus_telemetry', delay: 3100, info: true },
  { text: '> CONNECT: scummvm_upstream [C++ ISO]', delay: 3600 },
  { text: '> RESOLVE: academic_records [NIT GOA]', delay: 4100, highlight: true },
  { text: '> ENCRYPT: communications_dispatch', delay: 4600 },
  { text: '> BUILD: production_bundle [0 errors]', delay: 5100, success: true },
  { text: '> STATUS: ALL_SYSTEMS_NOMINAL', delay: 5600, success: true },
  { text: '> READY: Launching portfolio...', delay: 6000, highlight: true },
]

const TOTAL_DURATION = 6800

export default function Loader({ onComplete, fading }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [percent, setPercent] = useState(0)
  const audioRef = useRef(null)
  const timersRef = useRef([])

  const startSequence = useCallback(() => {
    // Attempt audio playback immediately — if browser allows, keep audio; else continue silently
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.volume = 0.55
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked by browser policy — keep normal without asking permission
        })
      }
    }

    // Schedule boot lines
    BOOT_LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, { ...line, index }])
      }, line.delay)
      timersRef.current.push(timer)
    })

    // Animate percentage counter
    const startTime = performance.now()
    let rafId
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / TOTAL_DURATION, 1)
      // Ease-in-out curve for more natural feel
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      setPercent(Math.round(eased * 100))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }
    rafId = requestAnimationFrame(tick)
    timersRef.current.push({ cancel: () => cancelAnimationFrame(rafId) })

    // Trigger completion
    const completeTimer = setTimeout(() => {
      setPercent(100)
      // Fade out audio
      if (audioRef.current) {
        const audio = audioRef.current
        const fadeInterval = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume = Math.max(0, audio.volume - 0.05)
          } else {
            audio.pause()
            audio.currentTime = 0
            clearInterval(fadeInterval)
          }
        }, 80)
      }
      onComplete()
    }, TOTAL_DURATION)
    timersRef.current.push(completeTimer)
  }, [onComplete])

  useEffect(() => {
    // Start sequence immediately
    startSequence()

    // Passive unlock: if browser autoplay was blocked on load, resume audio on first touch/click/key
    const unlockAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = 0.55
        audioRef.current.play().catch(() => {})
      }
    }
    window.addEventListener('pointerdown', unlockAudio, { once: true })
    window.addEventListener('keydown', unlockAudio, { once: true })

    return () => {
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
      timersRef.current.forEach(t => {
        if (typeof t === 'number') clearTimeout(t)
        else if (t && t.cancel) t.cancel()
      })
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [startSequence])

  return (
    <div className={`loader-container${fading ? ' fade-out' : ''}`}>
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/intro.mp3"
        preload="auto"
        playsInline
        style={{ display: 'none' }}
      />

      {/* Top Viewport HUD Bar with numerical progress */}
      <header className="loader-top-hud">
        <div className="loader-hud-inner">
          <div className="loader-hud-left">
            <span className="loader-hud-dot" />
            <span className="loader-hud-text">RV_KERNEL // SYS.BOOT</span>
          </div>
          <div className="loader-hud-right">
            <span className="loader-hud-label">TELEMETRY:</span>
            <span className="loader-hud-value">{String(percent).padStart(3, '0')}%</span>
          </div>
        </div>
        <div className="loader-top-bar-track">
          <div
            className="loader-top-bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </header>

      {/* Numerical Counter Card on top of terminal */}
      <div className="loader-numerical-header">
        <div className="loader-num-meta">
          <span className="loader-num-tag">BOOT SEQUENCE</span>
          <span className="loader-num-sub">LOADING SUBSYSTEMS</span>
        </div>
        <div className="loader-num-display">
          <span className="loader-num-value">{String(percent).padStart(3, '0')}</span>
          <span className="loader-num-symbol">%</span>
        </div>
      </div>

      {/* Main Terminal */}
      <div className="loader-terminal">
        <div className="loader-terminal-header">
          <div className="loader-dot active" />
          <div className="loader-dot" />
          <div className="loader-dot" />
          <span className="loader-terminal-title">sys.boot // {percent}%</span>
        </div>

        <div className="loader-terminal-body">
          {visibleLines.map((line) => (
            <div
              key={line.index}
              className="loader-line"
              style={{ animationDelay: `${line.index * 0.02}s` }}
            >
              <span
                className={
                  line.success
                    ? 'success'
                    : line.highlight
                    ? 'highlight'
                    : line.info
                    ? 'info'
                    : ''
                }
              >
                {line.text}
              </span>
            </div>
          ))}
          {visibleLines.length > 0 && (
            <span className="terminal-cursor" style={{ color: 'var(--color-primary-fixed)' }}>
              █
            </span>
          )}
        </div>

        <div className="loader-progress-bar">
          <div
            className="loader-progress-fill"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="loader-footer">
          <span>Rohan Vernekar</span>
          <span className="loader-footer-status">STATUS: {percent === 100 ? 'COMPLETE' : 'BOOTING...'}</span>
          <span>NIT GOA</span>
        </div>
      </div>
    </div>
  )
}
