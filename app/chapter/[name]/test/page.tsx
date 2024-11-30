'use client'

import data from '@/app/data/index.json'
import { useAnswerCheck } from '@/app/hooks/use-check-answer'
import { useSlider } from '@/app/hooks/use-slider'
import { useTestMode } from '@/app/hooks/use-test-mode'
import { Chapter, Word } from '@/app/types'
import { shuffleArray } from '@/app/utils/shuffle-array'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TestPage() {
  const router = useRouter()
  const params = useParams<{ name: string }>()
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [shuffledWords, setShuffledWords] = useState<Word[]>([])

  useEffect(() => {
    if (params.name) {
      const foundChapter = data.chapters.find(
        (c: Chapter) => c.name === params.name
      )
      setChapter(foundChapter || null)
      if (foundChapter?.words) {
        setShuffledWords(shuffleArray(foundChapter.words))
      }
    }
  }, [params.name])

  const { currentIndex, next, progress } = useSlider(shuffledWords?.length || 0)
  const { testMode, toggleTestMode } = useTestMode()
  const {
    userAnswer,
    showResult,
    score,
    setUserAnswer,
    checkAnswer,
    resetAnswer,
  } = useAnswerCheck(shuffledWords || [])

  const handleCheckAnswer = () => {
    checkAnswer(currentIndex, testMode)
  }

  const handleNextWord = () => {
    next()
    resetAnswer()
  }

  const handleFinish = () => {
    alert(`테스트 완료! 점수: ${score}/${shuffledWords?.length}`)
    router.push('/')
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4 flex flex-col'>
      <div className='max-w-md mx-auto w-full flex-grow'>
        <Button variant='ghost' className='mb-4' onClick={() => router.back()}>
          <ChevronLeft className='h-4 w-4 mr-2' />
          Back to Words
        </Button>
        <h2 className='text-2xl font-bold mb-4'>단어 테스트</h2>
        <Card>
          <CardContent className='p-6'>
            <div className='text-center mb-4'>
              <p className='text-sm text-gray-500'>
                {currentIndex + 1} / {shuffledWords?.length}
              </p>
            </div>
            <div className='mb-4'>
              <p className='text-xl font-semibold mb-2'>
                {testMode === 'english'
                  ? shuffledWords[currentIndex]?.korean
                  : shuffledWords[currentIndex]?.english}
              </p>
              <Input
                type='text'
                placeholder='답을 입력하세요'
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={showResult}
              />
            </div>
            {!showResult ? (
              <Button onClick={handleCheckAnswer} className='w-full'>
                정답 확인
              </Button>
            ) : (
              <div className='mb-4'>
                <p
                  className={`text-lg ${userAnswer.toLowerCase().trim() === shuffledWords[currentIndex][testMode].toLowerCase().trim() ? 'text-green-500' : 'text-red-500'}`}
                >
                  {userAnswer.toLowerCase().trim() ===
                  shuffledWords[currentIndex]?.[testMode]?.toLowerCase()?.trim()
                    ? '정답입니다!'
                    : `틀렸습니다. 정답은 ${shuffledWords[currentIndex]?.[testMode]}입니다.`}
                </p>
                <Button
                  onClick={
                    currentIndex < (shuffledWords?.length ?? 0) - 1
                      ? handleNextWord
                      : handleFinish
                  }
                  className='w-full mt-2'
                >
                  {currentIndex < (shuffledWords?.length ?? 0) - 1
                    ? '다음 단어'
                    : '테스트 종료'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <div className='w-full mt-4'>
          <Progress value={progress} className='w-full' />
        </div>
        <div className='flex justify-center mt-4'>
          <Button onClick={toggleTestMode}>
            테스트 모드 변경: {testMode === 'english' ? '영어' : '한국어'}
          </Button>
        </div>
      </div>
    </div>
  )
}
