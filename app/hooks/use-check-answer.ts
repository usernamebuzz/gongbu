import { useCallback, useState } from "react"
import { Word } from "../types"

export function useAnswerCheck(words: Word[]) {
    const [userAnswer, setUserAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
  
    const checkAnswer = useCallback((currentIndex: number, testMode: 'english' | 'korean') => {
      const isCorrect = 
        testMode === 'english' 
          ? userAnswer.toLowerCase().trim() === words[currentIndex].english.toLowerCase().trim()
          : userAnswer.trim() === words[currentIndex].korean.trim()
      if (isCorrect) setScore(prevScore => prevScore + 1)
      setShowResult(true)
    }, [userAnswer, words])
  
    const resetAnswer = useCallback(() => {
      setUserAnswer('')
      setShowResult(false)
    }, [])
  
    return { userAnswer, showResult, score, setUserAnswer, checkAnswer, resetAnswer }
  }