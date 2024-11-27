import { useState, useCallback } from 'react'

export function useSliderControl(totalItems: number) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(true)

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems)
    setShowMeaning(true)
  }, [totalItems])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)
    setShowMeaning(true)
  }, [totalItems])

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
    setShowMeaning
  }
}