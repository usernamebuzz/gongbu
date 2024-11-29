import { useCallback, useState } from 'react'

export function useTestMode() {
  const [testMode, setTestMode] = useState<'english' | 'korean'>('english')

  const toggleTestMode = useCallback(() => {
    setTestMode((prevMode) => (prevMode === 'english' ? 'korean' : 'english'))
  }, [])

  return { testMode, toggleTestMode }
}
