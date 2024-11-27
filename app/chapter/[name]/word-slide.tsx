'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Word } from '@/app/types'

interface WordSlideProps {
  words: Word[]
}

export function WordSlide({ words }: WordSlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    setShowMeaning(false)
  }

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + words.length) % words.length
    )
    setShowMeaning(false)
  }

  const toggleMeaning = () => {
    setShowMeaning(!showMeaning)
  }

  const progress = ((currentIndex + 1) / words.length) * 100

  return (
    <div className='w-full max-w-sm mx-auto'>
      <Card>
        <CardContent className='p-6'>
          <div className='text-center mb-4'>
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
