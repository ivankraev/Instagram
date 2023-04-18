import Link from 'next/link'
import { Container, Toolbar, AppBar as AppBarComponent } from '@mui/material'

import { routes } from 'common/routes'
import Logo from 'components/brand/Logo'

export default function AppBar() {
  return (
    <AppBarComponent position="sticky">
      <Toolbar disableGutters component="nav">
        <Container
          maxWidth={'sm'}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            style={{ color: '#ffffff', alignItems: 'center', display: 'flex' }}
            aria-label={'home page'}
            passHref
            href={routes.index}>
            <Logo />
          </Link>
        </Container>
      </Toolbar>
    </AppBarComponent>
  )
}
