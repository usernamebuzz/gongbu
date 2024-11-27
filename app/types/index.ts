export interface Word {
  id: number
  korean: string
  english: string
}

export interface Chapter {
  name: string
  image: string
  words: Word[]
}
