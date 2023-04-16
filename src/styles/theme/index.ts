import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import { typography } from './typography'
import { mixins } from './mixins'

// Create a theme instance.
const theme = createTheme({
  typography,
  mixins,
})

const materialTheme = responsiveFontSizes(theme)

export default materialTheme
