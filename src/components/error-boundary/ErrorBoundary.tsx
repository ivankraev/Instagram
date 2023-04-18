import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { NextRouter, withRouter } from 'next/router'

import SEOLayout from 'components/seo-layout/SEOLayout'

interface Props {
  children: React.ReactNode
  router: NextRouter
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(): void {
    this.setState({ hasError: true })
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  componentDidMount(): void {
    const { router } = this.props
    router.events.on('routeChangeStart', this.handleReset)
  }

  componentWillUnmount(): void {
    const { router } = this.props
    router.events.off('routeChangeStart', this.handleReset)
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <SEOLayout title={'Error occured'}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItem: 'center',
              justifyContent: 'center',
              height: { xs: 'calc(100vh - 55.99px)', sm: 'calc(100vh - 63.99px)' },
            }}>
            <Typography variant="h1">Something went wrong.</Typography>
            <Box width="100%" display="flex">
              <Button sx={{ margin: 'auto' }} onClick={() => this.setState({ hasError: false })}>
                Try again
              </Button>
            </Box>
          </Box>
        </SEOLayout>
      )
    }

    return this.props.children
  }
}

export default withRouter(ErrorBoundary)
