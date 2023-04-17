import { render } from '@testing-library/react'

import IndexPage from '../IndexPage'

describe('Index page', () => {
  it('should render the index page', () => {
    const { getByText } = render(<IndexPage />)
    expect(getByText(/Feed/)).toBeInTheDocument()
    expect(getByText(/Filters/)).toBeInTheDocument()
    expect(getByText(/Landing Page/)).toBeInTheDocument()
  })
})
