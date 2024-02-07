'use client'

import { useEffect, useState } from 'react'

export default function useMounted() {
  const [mounted, setMounted] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
    }
  }, [mounted])

  return { mounted, isFirstRender }
}
