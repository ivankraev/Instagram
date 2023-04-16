import { Box, styled } from '@mui/material'
import Image from 'next/image'

export const ImageWrapper = styled(Box)(() => ({
  background: '#001133',
  borderRadius: '8px',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
  position: 'relative',
}))

export default function PreviewImage({ url }: { url: string }) {
  return (
    <ImageWrapper sx={{ height: { xs: '60vh', sm: '70vh' } }}>
      <Image src={url} fill style={{ objectFit: 'contain' }} alt={''} />
    </ImageWrapper>
  )
}
