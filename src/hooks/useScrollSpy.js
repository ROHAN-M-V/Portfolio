import { useState, useEffect } from 'react'

export default function useScrollSpy(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      let current = ''
      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (section) {
          const sectionTop = section.offsetTop - offset
          if (window.scrollY >= sectionTop) {
            current = id
          }
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeId
}
