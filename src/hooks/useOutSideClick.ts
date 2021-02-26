import { useEffect } from 'react'

export const useOutsideClick = (ref: any, display: boolean, callback: () => void) => {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }

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
