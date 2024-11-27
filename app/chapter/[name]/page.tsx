'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import data from '@/app/data/index.json'
import { Chapter } from '@/app/types'

export default function ChapterPage({ params }: { params: { name: string } }) {
  const router = useRouter()
  const chapter = data.chapters.find((c: Chapter) => c.name === params.name)

  if (!chapter) {
    return <div>Chapter not found</div>
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4 flex flex-col'>
      <div className='max-w-md mx-auto w-full flex-grow'>
        <Button
          variant='ghost'
          className='mb-4'
          onClick={() => router.push('/')}
        >
          <ChevronLeft className='h-4 w-4 mr-2' />
          Back to Chapters
        </Button>
        <h2 className='text-2xl font-bold mb-4'>{chapter.name}</h2>

        <div className='grid grid-cols-1 gap-8'>
          <div className='flex flex-col'>
            <h3 className='text-xl font-semibold mb-4'>단어 목록</h3>
            <div className='space-y-3'>
              {chapter.words.map((word) => (
                <Card key={word.id} className='hover:bg-gray-50'>
                  <CardContent className='p-4'>
                    <div className='flex justify-between items-center'>
                      <div>
                        <p className='text-lg font-medium'>{word.korean}</p>
                        <p className='text-sm text-gray-500'>{word.english}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
