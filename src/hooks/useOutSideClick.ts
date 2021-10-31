import { useCallback, useEffect, RefObject } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  display: boolean,
  callback: () => void
) => {
  const handleClick = useCallback(
    (e: Event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    },
    [callback, ref]
  )

  useEffect(() => {
    if (display) {
      document.addEventListener('mousedown', handleClick)
    } else {
      document.removeEventListener('mousedown', handleClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [display, handleClick])
}
