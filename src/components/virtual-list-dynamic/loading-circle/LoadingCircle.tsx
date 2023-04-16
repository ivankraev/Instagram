import { Box, CircularProgress, styled } from '@mui/material'

export const LoadingCircleWrapper = styled(Box)(() => ({
  position: 'absolute',
  bottom: 10,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  pointerEvents: 'none',
}))

export default function LoadingCircle() {
  return (
    <LoadingCircleWrapper>
      <CircularProgress sx={{ color: 'white' }} />
    </LoadingCircleWrapper>
  )
}
