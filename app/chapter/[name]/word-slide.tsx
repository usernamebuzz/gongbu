'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Word } from '@/app/types'

interface WordSlideProps {
  words: Word[]
}

export function WordSlide({ words: initialWords }: WordSlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(true)
  const [words, setWords] = useState(initialWords)

  const shuffleWords = (array: Word[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    setShowMeaning(true)
  }

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + words.length) % words.length
    )
    setShowMeaning(true)
  }

  const toggleMeaning = () => {
    setShowMeaning(!showMeaning)
  }

  const handleShuffle = () => {
    setWords(shuffleWords(words))
    setCurrentIndex(0)
    setShowMeaning(true)
  }

  const progress = ((currentIndex + 1) / words.length) * 100

  return (
    <div className='w-full max-w-sm mx-auto'>
      <Card>
        <CardContent className='p-6'>
          <div className='text-center mb-4 flex flex-row space-x-28 '>
          <Button onClick={handleShuffle} variant='outline' size='icon'>
              <Shuffle className='h-4 w-4' />
            </Button>
            <p className='text-sm text-gray-500'>
              {currentIndex + 1} / {words.length}
            </p>
          </div>
          <div
            className='h-40 flex items-center justify-center cursor-pointer'
            onClick={toggleMeaning}
          >
            <p className='text-2xl font-semibold'>
              {showMeaning
                ? words[currentIndex].english
                : words[currentIndex].korean}
            </p>
          </div>
          <div className='flex justify-between mt-4'>
            <Button onClick={handlePrevious} variant='outline' size='icon'>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button onClick={handleNext} variant='outline' size='icon'>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className='w-full mt-4'>
        <Progress value={progress} className='w-full' />
      </div>
    </div>
  )
}
