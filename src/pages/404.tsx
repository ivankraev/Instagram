import SEOLayout from 'components/seo-layout/SEOLayout'
import { Typography } from '@mui/material'

export default function Custom404() {
  return (
    <SEOLayout title="Page not found">
      <Typography sx={{ m: 'auto' }} variant="h2">
        Page not found
      </Typography>
    </SEOLayout>
  )
}
