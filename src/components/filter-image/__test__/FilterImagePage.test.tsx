import { render } from '@testing-library/react'

import FilterImagePage from '../FilterImagePage'

describe('Index page', () => {
  it('should render the index page', () => {
    const { getByText } = render(<FilterImagePage />)
    expect(getByText(/Image Filters/)).toBeInTheDocument()
    expect(getByText(/Upload file/)).toBeInTheDocument()
  })
})
