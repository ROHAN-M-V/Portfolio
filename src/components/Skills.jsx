import useScrollReveal from '../hooks/useScrollReveal'

const SKILL_CATEGORIES = [
  {
    title: '01 / LANGUAGES',
    badge: 'N = 5',
    badgeColor: 'var(--color-primary-container)',
    items: [
      { name: 'TypeScript', desc: 'Strict, generics, node/web' },
      { name: 'Python', desc: 'Asyncio, scraping, data API' },
      { name: 'C / C++', desc: 'Embedded, systems VM' },
      { name: 'JavaScript', desc: 'Modern ES6+, runtime APIs' },
      { name: 'SQL', desc: 'Relational DDL & DML schemas' },
    ],
  },
  {
    title: '02 / BACKEND & SERVICES',
    badge: 'RPC/HTTP',
    badgeColor: 'var(--color-tertiary-container)',
    items: [
      { name: 'FastAPI & Flask', desc: 'Python REST execution' },
      { name: 'Encore.dev', desc: 'Type-safe microservices' },
      { name: 'Node.js & Express', desc: 'Event-driven backends' },
      { name: 'Playwright', desc: 'Headless DOM telemetry' },
      { name: 'REST & gRPC', desc: 'OpenAPI / JSON-RPC' },
    ],
  },
  {
    title: '03 / CLIENT INTERFACES',
    badge: 'UI/UX',
    badgeColor: 'var(--color-surface-container-high)',
    items: [
      { name: 'React 19', desc: 'Hooks, concurrent trees' },
      { name: 'Tailwind CSS', desc: 'Design token engineering' },
      { name: 'Vite Toolchain', desc: 'Sub-second HMR bundler' },
      { name: 'Semantic Web', desc: 'Strict accessibility (A11y)' },
      { name: 'Client Optimism', desc: 'Zero perceived latency' },
    ],
  },
  {
    title: '04 / DATA SINKS',
    badge: 'PERSIST',
    badgeColor: 'var(--color-secondary-container)',
    items: [
      { name: 'PostgreSQL', desc: 'ACID compliance & pooling' },
      { name: 'SQLite (WAL)', desc: 'Embedded concurrent write' },
      { name: 'MongoDB', desc: 'Document schema stores' },
    ],
  },
  {
    title: '05 / INFRASTRUCTURE',
    badge: 'DEVOPS',
    badgeColor: 'var(--color-surface-container-high)',
    items: [
      { name: 'Git & GitHub', desc: 'Atomic commits & rebase' },
      { name: 'GitHub Actions', desc: 'Automated CI/CD crons' },
      { name: 'Linux (Kernel & CLI)', desc: 'Bash, POSIX primitives' },
    ],
  },
  {
    title: '06 / HARDWARE & LOGIC',
    badge: 'CIRCUITS',
    badgeColor: 'var(--color-primary-container)',
    items: [
      { name: 'Arduino Ecosystem', desc: 'ATmega firmware in C++' },
      { name: 'Hardware Interrupts', desc: 'Deterministic event loops' },
      { name: 'Circuit Analysis', desc: 'Digital logic gates & sensors' },
    ],
  },
]

export default function Skills() {
  const ref = useScrollReveal()

  return (
    <section className="section" id="stack" ref={ref} style={{ background: 'var(--color-surface)' }}>
      <div className="section-inner">
        {/* Header */}
        <div className="section-header reveal-on-scroll">
          <div>
            <div className="section-label" style={{ color: 'var(--color-primary)', marginBottom: 4 }}>
              <span className="section-label-dot" style={{ background: 'var(--color-primary-container)', border: '1px solid var(--color-primary)' }} />
              INDEX &amp; CAPABILITIES
            </div>
            <h2 className="section-title">Technical Specification</h2>
          </div>
          <span className="section-badge">CURATED INDEX // PRODUCTION PROFICIENT</span>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className="skill-card neo-card-lift neo-shadow reveal-on-scroll">
              <div className="skill-card-header">
                <span className="skill-card-title">{category.title}</span>
                <span className="skill-card-badge" style={{ background: category.badgeColor }}>{category.badge}</span>
              </div>
              <ul className="skill-list">
                {category.items.map((item) => (
                  <li key={item.name} className="skill-item">
                    <span className="skill-name">{item.name}</span>
                    <span className="skill-desc">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
