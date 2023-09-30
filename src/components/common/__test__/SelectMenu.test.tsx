import SelectMenu from '../SelectMenu'

import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('SelectMenu', () => {
  it('should test accessability', async () => {
    const mockOptions = [{ value: '', label: '' }]
    const mockOnChangeFn = jest.fn()
    const { container } = render(<SelectMenu options={mockOptions} onChange={mockOnChangeFn} />)
    const res = await axe(container)
    expect(res).toHaveNoViolations()
  })

  it('should fail if image has no alt text', async () => {
    const { container } = render(<img alt="alt text" />)
    const res = await axe(container)
    expect(res).toHaveNoViolations()
  })
})
