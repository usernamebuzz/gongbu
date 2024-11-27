'use client'
import { useAnswerCheck } from "@/app/hooks/use-check-answer"
import { useTestMode } from "@/app/hooks/use-test-mode"
import { useTestProgress } from "@/app/hooks/use-test-progress"
import { Chapter } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import data from '@/app/data/index.json'

export default function TestPage() {
  const router=useRouter()
    const params=useParams<{name:string}>()
    const [chapter, setChapter]=useState<Chapter|null>(null)

    useEffect(()=>{
      if(params.name){
        const foundChapter = data.chapters.find(
          (c: Chapter) => c.name === params.name
        )
        setChapter(foundChapter || null)
      }
    })
    const { currentIndex, nextWord, progress } = useTestProgress(chapter?.words?.length || 0)
    const { testMode, toggleTestMode } = useTestMode()
    const { userAnswer, showResult, score, setUserAnswer, checkAnswer, resetAnswer } = useAnswerCheck(chapter?.words || [])
  
    const handleCheckAnswer = () => {
      checkAnswer(currentIndex, testMode)
    }
  
    const handleNextWord = () => {
      nextWord()
      resetAnswer()
    }
  
    const handleFinish = () => {
      alert(`테스트 완료! 점수: ${score}/${chapter?.words?.length}`)
      router.push('/') 
    }
  
    return (
      <div className='min-h-screen bg-gray-50 p-4 flex flex-col'>
        <div className='max-w-md mx-auto w-full flex-grow'>
          <h2 className='text-2xl font-bold mb-4'>단어 테스트</h2>
          <Card>
            <CardContent className='p-6'>
              <div className='text-center mb-4'>
                <p className='text-sm text-gray-500'>
                  {currentIndex + 1} / {chapter?.words?.length}
                </p>
              </div>
              <div className='mb-4'>
                <p className='text-xl font-semibold mb-2'>
                  {testMode === 'english' ? chapter?.words[currentIndex].korean : chapter?.words[currentIndex].english}
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
                  <p className={`text-lg ${userAnswer.toLowerCase().trim() === chapter?.words[currentIndex][testMode].toLowerCase().trim() ? 'text-green-500' : 'text-red-500'}`}>
                    {userAnswer.toLowerCase().trim() === chapter?.words[currentIndex]?.[testMode]?.toLowerCase()?.trim() ? '정답입니다!' : `틀렸습니다. 정답은 ${chapter?.words[currentIndex]?.[testMode]}입니다.`}
                  </p>
                  <Button onClick={currentIndex < (chapter?.words?.length ?? 0) - 1 ? handleNextWord : handleFinish} className='w-full mt-2'>
                    {currentIndex < (chapter?.words?.length ?? 0) - 1 ? '다음 단어' : '테스트 종료'}
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