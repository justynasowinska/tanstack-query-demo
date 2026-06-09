import { useEffect, useRef } from 'react'

export function useRerenderFlash<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null)

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return
    }

    // Restart animation on every render commit, including after remount.
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
