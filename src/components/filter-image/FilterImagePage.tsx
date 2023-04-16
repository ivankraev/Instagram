import { useState, useRef, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Box, Typography, Container, SelectChangeEvent, Button, Stack } from '@mui/material'

import { CreateCache } from 'utils/createCache'
import { CreateWorker } from 'utils/createWorker'
import { IMAGE_WIDTH, normalizedFilters } from './config'
import { routes } from 'common/routes'
import FileButton from 'components/common/FileButton'

const SelectMenu = dynamic(() => import('components/common/SelectMenu'))
const PreviewImage = dynamic(() => import('./preview-image'))

export default function FilterImagePage() {
  const [currentFilter, setCurrentFilter] = useState(normalizedFilters.none)
  const [uploadedImage, setUploadedImage] = useState<ImageData | null>(null)
  const [filteredImage, setFilteredImage] = useState<ImageData | null>(null)
  const [canvasUrl, setCanvasUrl] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const filtersCache = useMemo(() => new CreateCache<FilterType, ImageData>(), [])
  const worker = useMemo(() => new CreateWorker(), [])
  const selectOptions = useMemo(() => Object.values(normalizedFilters), [])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const { readFile } = await import('utils/read-file')
    const reader = readFile(file)

    reader.onload = () => {
      const image = new Image()
      image.src = reader.result as string

      image.onload = async () => {
        if (worker.isInitialized()) {
          filtersCache.reset()
        }

        const handleMessage = (event: MessageEvent<FilterMessage>) => {
          const appliedFilter = event.data.filter
          const fileredImage = event.data.imageData
          filtersCache.set(appliedFilter, fileredImage)
          setFilteredImage(fileredImage)
        }

        // there is a bug in Worker class that doesn't allow to create a new Worker
        // based on dynamic URL and this.worker needs to be initialized with already
        // instantiated Worker - see more https://github.com/vercel/next.js/issues/31009
        const filterImageWorker = new Worker(
          new URL('../../pages/api/workers/image-filter', import.meta.url),
        )
        worker.init(filterImageWorker, handleMessage)

        const { imageToCanvas } = await import('utils/image-to-canvas')

        const imgData = imageToCanvas(image, canvasRef.current as HTMLCanvasElement, IMAGE_WIDTH)
        setUploadedImage(imgData)
      }
    }
  }

  useEffect(() => {
    const handleUrlChange = async () => {
      if (filteredImage) {
        const { urlFromCanvas } = await import('utils/url-from-canvas')
        const url = urlFromCanvas(filteredImage, canvasRef.current as HTMLCanvasElement)
        setCanvasUrl(url)
      }
    }

    handleUrlChange()
  }, [filteredImage])

  useEffect(() => {
    const handleFilterChange = async () => {
      if (uploadedImage) {
        const cachedValue = filtersCache.get(currentFilter.value)
        if (cachedValue) {
          console.log('retrieving data from cache...')

          setFilteredImage(cachedValue)
        } else {
          const { applyFilter } = await import('utils/apply-filter')
          applyFilter(worker, uploadedImage, currentFilter.value)
        }
      }
    }

    handleFilterChange()
  }, [uploadedImage, currentFilter, filtersCache, worker])

  const onFilterChange = (event: SelectChangeEvent) => {
    const selectedFilterValue = event.target.value as FilterType
    const selectedFilter = normalizedFilters[selectedFilterValue]
    setCurrentFilter(selectedFilter)
  }

  useEffect(() => {
    //! test error boundary
    //! throw an error when upload an image
    if (canvasUrl !== null) {
      setCanvasUrl(null)
      throw new Error()
    }
    return () => {
      if (worker.isInitialized()) {
        worker.destroy()
        filtersCache.reset()
      }
    }
  }, [filtersCache, worker, canvasUrl])

  return (
    <Container maxWidth={'sm'} sx={{ minHeight: '100vh', py: { xs: 2, sm: 4 }, display: 'flex' }}>
      <Stack flex={1} spacing={uploadedImage ? 2 : 0} justifyContent={'space-between'}>
        <Stack flex={1} display={'flex'} flexDirection={'column'}>
          <Link aria-label={routes.index} href={'/'}>
            Back
          </Link>
          <Stack flex={1} justifyContent={'space-between'}>
            <Stack flex={1} alignItems={'center'} justifyContent={'center'}>
              <Typography variant="h1">Image Filters</Typography>
            </Stack>
            <Box>
              <FileButton onChange={handleFileChange} ref={fileInputRef} />
              <Box component="canvas" ref={canvasRef} style={{ display: 'none' }} />
            </Box>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          {canvasUrl && (
            <>
              <PreviewImage url={canvasUrl} />
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <SelectMenu
                  onChange={onFilterChange}
                  options={selectOptions}
                  value={currentFilter.value}
                />
                <Button variant="contained" fullWidth>
                  Submit
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  )
}
