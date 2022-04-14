import { useCallback, useState } from 'react'

const useAudio = (url) => {
  const [audio, setAudio] = useState(url ? new Audio(url) : null)
  const play = () => { 
    console.log(audio)
    audio?.play() 
  }

  return [setAudio, play]
}

export default useAudio