import { Typography, Container, Box } from '@mui/material'
import Link from 'next/link'

import { routes } from 'common/routes'
import SEOLayout from 'components/seo-layout/SEOLayout'

export default function IndexPage() {
  return (
    <SEOLayout title="Home Page">
      <Container
        maxWidth={'sm'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: { xs: 'calc(100vh - 55.99px)', sm: 'calc(100vh - 63.99px)' },
        }}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h1">Landing Page</Typography>
          <p>
            <Link href={routes.filterImage}>Filters</Link>
          </p>
          <p>
            <Link href={routes.newsFeed}>Feed</Link>
          </p>
        </Box>
      </Container>
    </SEOLayout>
  )
}
