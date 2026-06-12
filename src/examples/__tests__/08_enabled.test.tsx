import { screen, waitFor, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { EnabledExample } from '../08_enabled'
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

const { fetchDemoUser } = jest.requireMock('../../api/mockApi') as {
  fetchDemoUser: jest.Mock
}

describe('EnabledExample', () => {
  beforeEach(() => {
    fetchDemoUser.mockClear()
  })

  it('loads enabled panel automatically but keeps disabled panel empty until refetch', async () => {
    renderExample(<EnabledExample />)

    await openExampleAccordion('08 Enabled')

    expect(screen.getByText('Panel A (enabled: false)')).toBeInTheDocument()
    expect(screen.getByText('Panel B (enabled: true default)')).toBeInTheDocument()
    expect(screen.getByText('First Name: (no data yet)')).toBeInTheDocument()

    expect(await screen.findByText('First Name: Demo')).toBeInTheDocument()
    expect(fetchDemoUser).toHaveBeenCalledTimes(1)
  })

  it('manual refetch fetches data for disabled panel', async () => {
    const user = userEvent.setup()

    renderExample(<EnabledExample />)

    await openExampleAccordion('08 Enabled')

    const panelATitle = screen.getByText('Panel A (enabled: false)')
    const panelACard = panelATitle.closest('.query-tools-card') as HTMLElement | null

    if (!panelACard) {
      throw new Error('Panel A card not found')
    }

    const refetchButton = within(panelACard).getByRole('button', { name: 'Refetch' })
    await user.click(refetchButton)

    await waitFor(() => {
      expect(fetchDemoUser).toHaveBeenCalledTimes(2)
    })

    expect(screen.getAllByText('First Name: Demo')).toHaveLength(2)
  })
})