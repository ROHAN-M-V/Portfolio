import { useState, useCallback } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import OpenSource from './components/OpenSource'
import Hardware from './components/Hardware'
import Skills from './components/Skills'
import Academic from './components/Academic'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [loading, setLoading] = useState(true)
  const [loaderFading, setLoaderFading] = useState(false)

  const handleLoaderComplete = useCallback(() => {
    setLoaderFading(true)
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [])

  return (
    <>
      {loading && (
        <Loader onComplete={handleLoaderComplete} fading={loaderFading} />
      )}
      <div
        style={{
          opacity: loaderFading ? 1 : loading ? 0 : 1,
          transition: 'opacity 0.8s ease',
          visibility: loading && !loaderFading ? 'hidden' : 'visible',
        }}
      >
        <Navbar />
        <main className="bg-grid-pattern" style={{ paddingTop: '56px' }}>
          <Hero />
          <Projects />
          <OpenSource />
          <Hardware />
          <Skills />
          <Academic />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
