import { useCallback, useEffect, useState, useRef } from 'react'
import { Container, AppBar, Toolbar } from '@mui/material'
import Link from 'next/link'

import { getPhotos } from 'utils/get-photos'
import { routes } from 'common/routes'
import { PER_PAGE } from './config'
import VirtualDynamicList from 'components/virtual-list-dynamic'

type Props = {
  initialPhotos: Photo[]
}

export default function VirtualListExample({ initialPhotos }: Props) {
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
    <>
      <AppBar position="sticky">
        <Toolbar disableGutters component="nav">
          <Container maxWidth={'sm'}>
            <Link style={{ color: '#ffffff' }} aria-label={'home page'} href={routes.index}>
              Back
            </Link>
          </Container>
        </Toolbar>
      </AppBar>
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
    </>
  )
}
