import { Box, styled, Container } from '@mui/material'

export const Wrapper = styled(Container)(({ theme }) => ({
  height: 'calc(100vh - 55.99px - 2.5rem)',
  [theme.breakpoints.up('sm')]: {
    height: 'calc(100vh - 63.99px - 2.5rem)',
  },
  position: 'relative',
  overflowY: 'auto',
  background:
    'linear-gradient(0deg, rgba(247,247,247,1) 0%, rgba(104,230,255,0.3603816526610645) 51%, rgba(56,162,228,0.6488970588235294) 77%, rgba(25,118,210,0.8365721288515406) 100%)',
}))

export const MessageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  gap: '0.5rem',
}))
