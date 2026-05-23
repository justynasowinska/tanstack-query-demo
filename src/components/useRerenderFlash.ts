import { useEffect, useRef } from 'react'

export function useRerenderFlash<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null)
  const firstRenderRef = useRef(true)

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return
    }

    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    // Restart animation on every update commit.
    element.classList.remove('re-render-flash')
    void element.offsetWidth
    element.classList.add('re-render-flash')

    const timeoutId = window.setTimeout(() => {
      element.classList.remove('re-render-flash')
    }, 1320)

    return () => {
      window.clearTimeout(timeoutId)
    }
  })

  return elementRef
}
