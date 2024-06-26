'ise client'
import { useRef } from 'react'
import { useIsomorphicEffect, useWindowScroll } from '@mantine/hooks'

export const isFixed = (current: number, fixedAt: number) => current <= fixedAt
export const isPinned = (current: number, previous: number) => current <= previous
export const isReleased = (current: number, previous: number, fixedAt: number) =>
  !isPinned(current, previous) && !isFixed(current, fixedAt)

interface UseHeadroomInput {
  /** Number in px at which element should be fixed */
  fixedAt?: number

  /** Called when element is pinned */
  onPin?: () => void

  /** Called when element is at fixed position */
  onFix?: () => void

  /** Called when element is unpinned */
  onRelease?: () => void
}

export function useHeadroom({ fixedAt = 0, onPin, onFix, onRelease }: UseHeadroomInput = {}) {
  const scrollRef = useRef(0)
  const lastScrollPositionRef = useRef(0)
  const lastPinnedPositionRef = useRef(0)
  const [{ y: scrollPosition }] = useWindowScroll()

  useIsomorphicEffect(() => {
    if (isPinned(scrollPosition, scrollRef.current)) {
      onPin?.()
    }
  }, [scrollPosition, onPin])

  useIsomorphicEffect(() => {
    if (isFixed(scrollPosition, fixedAt)) {
      onFix?.()
    }
  }, [scrollPosition, fixedAt, onFix])

  useIsomorphicEffect(() => {
    if (isReleased(scrollPosition, scrollRef.current, fixedAt)) {
      onRelease?.()
    }
  }, [scrollPosition, onRelease])

  useIsomorphicEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollPosition < lastScrollPositionRef.current) {
        lastPinnedPositionRef.current = scrollPosition - 10
      }
    }, 100) // Задержка в 100 миллисекунд

    return () => clearTimeout(timeout)
  }, [scrollPosition])

  useIsomorphicEffect(() => {
    lastScrollPositionRef.current = scrollPosition
    scrollRef.current = window.scrollY
  }, [scrollPosition])

  if (isPinned(scrollPosition, lastPinnedPositionRef.current)) {
    return true
  }

  if (isFixed(scrollPosition, fixedAt)) {
    return true
  }

  return false
}
