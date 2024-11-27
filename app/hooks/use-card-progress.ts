import { useState, useCallback } from 'react'
import { useSlider } from './use-slider'

export function useCardProgress(totalItems: number) {
  const { currentIndex, setCurrentIndex, next, previous, progress } = useSlider(totalItems)
  const [showMeaning, setShowMeaning] = useState(true)

  const handleNext = useCallback(() => {
    next()
    setShowMeaning(true)
  }, [next])

  const handlePrevious = useCallback(() => {
    previous()
    setShowMeaning(true)
  }, [previous])

  const toggleMeaning = useCallback(() => {
    setShowMeaning((prev) => !prev)
  }, [])

  return {
    currentIndex,
    showMeaning,
    handleNext,
    handlePrevious,
    toggleMeaning,
    setCurrentIndex,
    setShowMeaning,
    progress
  }
}