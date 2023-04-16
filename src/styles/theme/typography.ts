import { Roboto } from 'next/font/google'
import { ThemeOptions } from '@mui/material'

export const inter = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const typography: ThemeOptions['typography'] = {
  fontFamily: inter.style.fontFamily,
  h1: {
    fontSize: '3rem',
    fontWeight: 400,
    marginBlock: 20,
    textAlign: 'center',
  },
}
