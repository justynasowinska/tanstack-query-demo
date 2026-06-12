import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { SelectorParametersExample } from '../07_selectorParameters'
import { openExampleAccordion, renderExample } from '../testUtils'

jest.mock('../../api/mockApi', () => {
  const actual = jest.requireActual('../../api/mockApi')

  return {
    ...actual,
    fetchDemoUser: jest.fn(async () => ({
      id: 1,
      firstName: 'Demo',
      changingValue: 0.5,
    })),
  }
})

describe('SelectorParametersExample', () => {
  it('updates filtered results when expectedName changes', async () => {
    const user = userEvent.setup()

    renderExample(<SelectorParametersExample />)

    await openExampleAccordion('07 Selector Parameters')

    expect(await screen.findAllByText('Filtered result: Demo')).toHaveLength(2)

    const nameInputs = screen.getAllByDisplayValue('Demo')
    await user.clear(nameInputs[0])
    await user.type(nameInputs[0], 'Alice')

    expect(await screen.findByText('Expected firstName: Alice')).toBeInTheDocument()
    expect(await screen.findAllByText('Filtered result: (filtered out)')).toHaveLength(1)
    expect(screen.getByText('Expected firstName: Demo')).toBeInTheDocument()
  })
})