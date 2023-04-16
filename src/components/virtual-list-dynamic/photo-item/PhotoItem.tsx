import { ForwardedRef, forwardRef } from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

type Props = {
  isLCP: boolean
  item: Photo
}

type ElementType = HTMLDivElement

function PhotoItem({ item, isLCP }: Props, ref: ForwardedRef<ElementType>) {
  const content = (
    <Box
      ref={ref}
      sx={{
        width: item.width,
        height: item.height,
        position: 'relative',
      }}>
      <Image
        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        fill
        src={item.url || '/'}
        alt={item.alt || item.description || ''}
        priority={isLCP}
        sizes="(max-width: *) 100vh"
      />
    </Box>
  )

  if (ref) {
    return (
      <Box component="article" ref={ref}>
        {content}
      </Box>
    )
  }

  return <Box component="article">{content}</Box>
}

export default forwardRef<ElementType, Props>(PhotoItem)
