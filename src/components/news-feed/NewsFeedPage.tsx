import { useCallback, useEffect, useState, useRef } from 'react'
import { Container } from '@mui/material'

import { PER_PAGE } from './config'
import VirtualDynamicList from 'components/virtual-list-dynamic'
import SEOLayout from 'components/seo-layout'

type Props = {
  initialPhotos: Photo[]
}

export default function NewsFeedPage({ initialPhotos }: Props) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos)
  const [isFetching, setIsFetching] = useState(false)
  const [page, setPage] = useState(1)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const goGoNextPage = useCallback(() => {
    setPage((prev) => prev + 1)
  }, [])

  const loadMorePhotos = useCallback(async () => {
    setIsFetching(true)
    console.log('loading more posts...')

    abortControllerRef.current = new AbortController()
    const { signal } = abortControllerRef.current

    const { getPhotos } = await import('utils/get-photos')

    const result = await getPhotos({ page, limit: PER_PAGE, options: { signal } })

    if (result) {
      setPhotos((prev) => [...prev, ...result])
    }

    setIsFetching(false)
  }, [page])

  useEffect(() => {
    if (page > 1) {
      loadMorePhotos()
    }
  }, [loadMorePhotos, page])

  useEffect(() => {
    return () => abortControllerRef.current?.abort()
  }, [])

  return (
    <SEOLayout title="Feed">
      <Container
        ref={containerRef}
        maxWidth={false}
        disableGutters
        component="main"
        sx={{
          height: { xs: 'calc(100vh - 55.99px)', sm: 'calc(100vh - 63.99px)' },
          overflowY: 'scroll',
        }}>
        <VirtualDynamicList
          containerRef={containerRef}
          data={photos}
          isFetching={isFetching}
          loadMoreFn={goGoNextPage}
        />
      </Container>
    </SEOLayout>
  )
}
