import { useSlider } from "./use-slider"

export function useTestProgress(totalWords: number) {
  const { currentIndex, next, progress } = useSlider(totalWords)

  const nextWord = next

  return { currentIndex, nextWord, progress }
}