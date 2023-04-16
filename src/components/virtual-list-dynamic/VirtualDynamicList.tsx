'use client'
import { MutableRefObject, useCallback, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Stack } from '@mui/material'
import debounce from 'lodash.debounce'

import { findStartIndex, findEndIndex, calculateContentHeight } from 'utils/find-index'
import { useIntersect } from 'hooks/useIntersect'
import PhotoItem from './photo-item/PhotoItem'

const LoadingCircle = dynamic(() => import('./loading-circle'))

type Props = {
  data: Photo[]
  loadMoreFn: () => void
  containerRef: MutableRefObject<HTMLDivElement | null>
  isFetching: boolean
}

export default function VirtualDynamicList({ data, loadMoreFn, containerRef, isFetching }: Props) {
  const [scrollTop, setScrollTop] = useState(0)
  const [visibleData, setVisibleData] = useState(data)
  const [ghostItemsHeight, setGhostItemsHeight] = useState({ startItem: 0, endItem: 0 })

  const contentHeight = useMemo(() => calculateContentHeight(data), [data])

  const startIndexCache = useMemo(() => new Map<number, number>(), [])
  const endIndexCache = useMemo(() => new Map<number, number>(), [])

  const handleScroll = useCallback(() => {
    const scrollTop = containerRef?.current?.scrollTop as number

    setScrollTop(scrollTop)
  }, [containerRef])

  const observeLastItem = useIntersect<HTMLDivElement>(loadMoreFn)
  const observeItem = useIntersect<HTMLDivElement>(handleScroll)

  useEffect(() => {
    const startIndex = findStartIndex(scrollTop, data, startIndexCache)
    const endIndex = findEndIndex(
      data,
      startIndex,
      containerRef?.current?.clientHeight as number,
      endIndexCache,
    )
    const visibleData = data.slice(startIndex, endIndex + 1)
    const startItemHeight = calculateContentHeight(data.slice(0, startIndex))
    const endItemHeight = contentHeight - startItemHeight - calculateContentHeight(visibleData)

    setGhostItemsHeight({ startItem: startItemHeight, endItem: endItemHeight })
    setVisibleData(visibleData)
  }, [contentHeight, data, scrollTop, containerRef, startIndexCache, endIndexCache])

  const debouncedScroll = useMemo(() => debounce(handleScroll, 50), [handleScroll])

  useEffect(() => {
    let memoizedRef: HTMLDivElement | undefined
    // containerRef will probably change so we need to keep the same reference
    // scoped inside the useEffect so we can cleanup after
    if (containerRef?.current) {
      containerRef.current.addEventListener('scroll', debouncedScroll)
      memoizedRef = containerRef.current
    }
    return () => {
      ;[startIndexCache, endIndexCache].forEach((cache) => cache.clear())
      memoizedRef?.removeEventListener('scroll', debouncedScroll)
    }
  }, [containerRef, debouncedScroll, endIndexCache, startIndexCache])

  const lastItem = data[data.length - 1]

  return (
    <>
      <Box sx={{ height: ghostItemsHeight.startItem }} />
      <Stack alignItems={'center'}>
        {visibleData.map((item, idx) => {
          // TODO: this logic for determining whether the photo is LCP is not correct
          const isLCP = idx === 0
          const isLastItem = lastItem.id === item.id
          return (
            <PhotoItem
              key={item.key}
              item={item}
              ref={isLastItem ? observeLastItem : observeItem}
              isLCP={isLCP}
            />
          )
        })}
      </Stack>
      <Box sx={{ height: ghostItemsHeight.endItem }} />
      {isFetching && <LoadingCircle />}
    </>
  )
}
