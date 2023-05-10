import SelectMenu from 'components/common/SelectMenu'

describe('SelectMenu', () => {
  const options = [
    { value: 'none', label: 'Default' },
    { value: 'grayscale', label: 'Grayscale' },
    { value: 'sepia', label: 'Sepia' },
  ]

  beforeEach(() => {
    cy.mount(<SelectMenu options={options} onChange={() => console.log('changed')} />)
  })

  it('should open the menu when user clicks', () => {
    cy.get(`[data-cy="menu-item-${options[0].value}"]`).should('not.exist')
    cy.get('[data-cy="select"]').click()
    options.forEach((option) => {
      cy.get(`[data-cy="menu-item-${option.value}"]`).should('have.text', option.label)
    })
  })

  it('should display the selected item', () => {
    cy.get('[data-cy="select"]').click()
    cy.get(`[data-cy="menu-item-${options[1].value}"]`).click()
    cy.get('[data-cy="select"]').should('contain', options[1].label)
  })
})
