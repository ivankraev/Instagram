import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { NextRouter, withRouter } from 'next/router'

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItem: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}>
          <Typography variant="h1">Something went wrong.</Typography>
          <Box width="100%" display="flex">
            <Button sx={{ margin: 'auto' }} onClick={() => this.setState({ hasError: false })}>
              Try again
            </Button>
          </Box>
        </Box>
      )
    }

    return this.props.children
  }
}

export default withRouter(ErrorBoundary)
