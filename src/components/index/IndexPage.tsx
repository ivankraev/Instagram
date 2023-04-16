import { Typography, Container } from '@mui/material'
import Link from 'next/link'

import { routes } from 'common/routes'

export default function IndexPage() {
  return (
    <Container maxWidth={'sm'}>
      <Typography variant="h1">Landing Page</Typography>
      <p>
        <Link href={routes.filterImage}>Filters</Link>
      </p>
      <p>
        <Link href={routes.newsFeed}>Feed</Link>
      </p>
    </Container>
  )
}
