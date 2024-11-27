import { useState, useCallback } from 'react'
import { Word } from '@/app/types'

export function useShuffleWords(initialWords: Word[]) {
  const [words, setWords] = useState(initialWords)

  const shuffleWords = useCallback(() => {
    setWords(currentWords => {
      const shuffled = [...currentWords]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    })
  }, [])

  return { words, shuffleWords }
}