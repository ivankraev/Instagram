import { useRef, useState, useEffect } from 'react'

export const useResizable = () => {
  const resizableRef = useRef<HTMLDivElement>(null)
  const resizerRef = useRef<HTMLDivElement>(null)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [lastX, setLastX] = useState<number | null>(null)
  const [lastY, setLastY] = useState<number | null>(null)

  useEffect(() => {
    const resizable = resizableRef.current
    const resizer = resizerRef.current

    let a = 5

    function handleMouseDown(e: MouseEvent) {
      e.preventDefault()
      setIsResizing(true)
      setLastX(e.clientX)
      setLastY(e.clientY)
    }

    function handleMouseMove(e: MouseEvent) {
      if (!isResizing || !lastX || !lastY || !resizable) return
      const deltaX = e.clientX - lastX
      const deltaY = e.clientY - lastY
      resizable.style.width = `${parseInt(getComputedStyle(resizable).width) + deltaX}px`
      resizable.style.height = `${parseInt(getComputedStyle(resizable).height) + deltaY}px`
      setLastX(e.clientX)
      setLastY(e.clientY)
    }

    function handleMouseUp() {
      setIsResizing(false)
    }

    if (resizer && resizable) {
      resizer.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      if (resizer && resizable) {
        resizer.removeEventListener('mousedown', handleMouseDown)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing, lastX, lastY, resizableRef, resizerRef])

  return { resizableRef, resizerRef }
}
