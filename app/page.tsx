import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import data from '@/app/data/index.json'
import { Chapter } from './types'

export default function MainPage() {
  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-md mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>Korean Vocabulary</h1>
        <div className='grid gap-4'>
          {data.chapters.map((chapter: Chapter) => (
            <Link href={`/chapter/${chapter.name}`} key={chapter.name}>
              <Card className='cursor-pointer hover:shadow-lg transition-shadow'>
                <CardContent className='p-0'>
                  <div className='relative h-40 w-full'>
                    <Image
                      src={chapter.image}
                      alt={chapter.name}
                      fill
                      className='object-cover rounded-t-lg'
                    />
                    <div className='absolute inset-0 bg-black/40 rounded-t-lg' />
                    <div className='absolute bottom-0 left-0 p-4'>
                      <h2 className='text-xl font-bold text-white'>
                        {chapter.name}
                      </h2>
                      <p className='text-gray-200'>
                        {chapter.words.length} words
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
