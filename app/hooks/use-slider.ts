import { useCallback, useState } from 'react'

export function useSlider(totalItems: number) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems)
  }, [totalItems])

  const previous = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)
  }, [totalItems])

  const progress = ((currentIndex + 1) / totalItems) * 100

  return {
    currentIndex,
    setCurrentIndex,
    next,
    previous,
    progress,
  }
}
