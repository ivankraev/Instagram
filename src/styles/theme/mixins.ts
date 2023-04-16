import { ThemeOptions } from '@mui/material'

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    flexCenter: CSSProperties
  }
  // allow configuration using `createMuiTheme`
  interface MixinsOptions {
    flexCenter?: CSSProperties
  }
}

export const mixins: ThemeOptions['mixins'] = {
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}
