import { useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'

interface Props {
  onIdle: () => void
  idleTime: number
}

const useIdleTimeout = ({ onIdle, idleTime = 1 }: Props) => {
  const idleTimeout = 1000 * idleTime
  const [isIdle, setIdle] = useState(false)

  const handleIdle = () => {
    setIdle(true)
    console.log('Voce foi desconectado')
  }

  const idleTimer = useIdleTimer({
    timeout: idleTimeout,
    promptTimeout: idleTimeout / 2,
    onPrompt: onIdle,
    onIdle: handleIdle,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange',
      'focus',
      'click',
      'touchstart',
      'touchmove',
    ],
    debounce: 500,
  })

  return {
    isIdle,
    setIdle,
    idleTimer,
  }
}

export default useIdleTimeout
