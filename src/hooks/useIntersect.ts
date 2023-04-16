import { useCallback, useEffect, useRef } from 'react'

/**
 * A hook that is leveraging the IntersectionObserver API to provide a mechanism to execute a callback once
 * the ref element intersects with the viewport
 * @param cb - The callback function that will be executed when the dom element intersects with the viewport
 * @returns Callback that can be passed to the dom element as ref
 */

export const useIntersect = <T extends Element>(
  cb: () => void,
  options?: IntersectionObserverInit,
) => {
  const observerRef = useRef<IntersectionObserver | null>()

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        cb()
      }
    },
    [cb],
  )

  const observe = useCallback(
    (element: T) => {
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver(observerCallback, options)

      if (element) observerRef.current.observe(element)
    },
    [observerCallback, options],
  )

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        console.log('cleaning up obs')

        observerRef.current.disconnect()
      }
    }
  }, [])

  return observe
}
