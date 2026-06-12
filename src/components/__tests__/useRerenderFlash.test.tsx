import { renderHook } from '@testing-library/react'
import { useRerenderFlash } from '../useRerenderFlash'

describe('useRerenderFlash', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('returns a ref object', () => {
    const { result } = renderHook(() => useRerenderFlash())

    expect(result.current).toHaveProperty('current')
  })

  it('adds re-render-flash class to element on rerender', () => {
    const { result, rerender } = renderHook(() => useRerenderFlash<HTMLDivElement>())

    const div = document.createElement('div')
    result.current.current = div

    // Rerender to trigger the effect
    rerender()

    expect(div.classList.contains('re-render-flash')).toBe(true)
  })

  it('removes re-render-flash class after timeout', () => {
    const { result, rerender } = renderHook(() => useRerenderFlash<HTMLDivElement>())

    const div = document.createElement('div')
    result.current.current = div

    rerender()

    expect(div.classList.contains('re-render-flash')).toBe(true)

    jest.advanceTimersByTime(1320)

    expect(div.classList.contains('re-render-flash')).toBe(false)
  })

  it('triggers animation on every render', () => {
    const { result, rerender } = renderHook(() => useRerenderFlash<HTMLDivElement>())

    const div = document.createElement('div')
    result.current.current = div

    rerender()
    expect(div.classList.contains('re-render-flash')).toBe(true)

    // Clear the timeout
    jest.advanceTimersByTime(1320)
    expect(div.classList.contains('re-render-flash')).toBe(false)

    // Trigger rerender again
    rerender()

    expect(div.classList.contains('re-render-flash')).toBe(true)
  })

  it('clears timeout on cleanup', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout')
    const { result, unmount, rerender } = renderHook(() => useRerenderFlash<HTMLDivElement>())

    const div = document.createElement('div')
    result.current.current = div

    rerender()

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()

    clearTimeoutSpy.mockRestore()
  })

  it('handles null ref gracefully', () => {
    const { result, rerender } = renderHook(() => useRerenderFlash<HTMLDivElement>())

    result.current.current = null

    // Should not throw
    expect(() => {
      rerender()
      jest.runAllTimers()
    }).not.toThrow()
  })

  it('removes and re-adds class to restart animation', () => {
    const { result, rerender } = renderHook(() => useRerenderFlash<HTMLDivElement>())

    const div = document.createElement('div')
    result.current.current = div

    const classList = div.classList
    const removeSpy = jest.spyOn(classList, 'remove')
    const addSpy = jest.spyOn(classList, 'add')

    // Initial rerender adds the class
    rerender()
    expect(addSpy).toHaveBeenCalledWith('re-render-flash')

    removeSpy.mockClear()
    addSpy.mockClear()

    // Rerender again - should remove and add again
    rerender()

    expect(removeSpy).toHaveBeenCalledWith('re-render-flash')
    expect(addSpy).toHaveBeenCalledWith('re-render-flash')
  })
})
