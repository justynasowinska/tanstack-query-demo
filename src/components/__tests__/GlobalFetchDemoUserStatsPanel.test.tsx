import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GlobalFetchDemoUserStatsPanel } from '../GlobalFetchDemoUserStatsPanel'

jest.mock('../../api/mockApi', () => ({
  getFetchDemoUserCallCount: jest.fn(() => 5),
  getFetchDemoUserShouldFail: jest.fn(() => false),
  getFetchDemoUserStableChangingValue: jest.fn(() => 0.5),
  getFetchDemoUserUseRandomChangingValue: jest.fn(() => false),
  getMockApiDelayMs: jest.fn(() => 100),
  resetFetchDemoUserCallCount: jest.fn(),
  setFetchDemoUserShouldFail: jest.fn(),
  setFetchDemoUserStableChangingValue: jest.fn(),
  setFetchDemoUserUseRandomChangingValue: jest.fn(),
  setMockApiDelayMs: jest.fn(),
  subscribeFetchDemoUserCallCount: jest.fn(() => jest.fn()),
  subscribeFetchDemoUserShouldFail: jest.fn(() => jest.fn()),
  subscribeFetchDemoUserValueMode: jest.fn(() => jest.fn()),
}))

describe('GlobalFetchDemoUserStatsPanel', () => {
  it('renders the component with title', () => {
    render(<GlobalFetchDemoUserStatsPanel />)

    expect(screen.getByText('Mocked API function')).toBeInTheDocument()
    expect(screen.getByText('fetchDemoUser')).toBeInTheDocument()
  })

  it('displays fetch call count', () => {
    render(<GlobalFetchDemoUserStatsPanel />)

    expect(screen.getByText(/calls: 5/)).toBeInTheDocument()
  })

  it('renders reset counter button', () => {
    render(<GlobalFetchDemoUserStatsPanel />)

    expect(screen.getByRole('button', { name: /reset counter/i })).toBeInTheDocument()
  })

  it('renders API delay input', () => {
    render(<GlobalFetchDemoUserStatsPanel />)

    const delayInput = screen.getByDisplayValue('100')
    expect(delayInput).toBeInTheDocument()
    expect(delayInput).toHaveAttribute('type', 'number')
  })

  it('renders random changing value checkbox', () => {
    render(<GlobalFetchDemoUserStatsPanel />)

    const randomCheckbox = screen.getByRole('checkbox', { name: /use math\.random/i })
    expect(randomCheckbox).toBeInTheDocument()
  })

  it('renders stable changing value input', () => {
    render(<GlobalFetchDemoUserStatsPanel />)

    const stableInput = screen.getByDisplayValue('0.5')
    expect(stableInput).toBeInTheDocument()
  })

  it('renders force error checkbox', () => {
    render(<GlobalFetchDemoUserStatsPanel />)

    const errorCheckbox = screen.getByRole('checkbox', { name: /force error/i })
    expect(errorCheckbox).toBeInTheDocument()
  })

  it('calls reset function when reset button is clicked', async () => {
    const user = userEvent.setup()

    render(<GlobalFetchDemoUserStatsPanel />)

    const resetButton = screen.getByRole('button', { name: /reset counter/i })
    await user.click(resetButton)

    expect(resetButton).toBeInTheDocument()
  })
})
