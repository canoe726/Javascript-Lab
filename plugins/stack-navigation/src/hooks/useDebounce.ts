import { useState } from 'react'

export default function useDebounce() {
  const [timeoutId, setTimeoutId] = useState<number | undefined | null>(null)

  const debounce = (func: any, delay: number) => {
    clearTimeout(timeoutId as number | undefined)

    const newTimeoutId = setTimeout(() => {
      func()
      setTimeoutId(null)
    }, delay)

    setTimeoutId(newTimeoutId as unknown as number)
  }

  return {
    debounce,
  }
}
