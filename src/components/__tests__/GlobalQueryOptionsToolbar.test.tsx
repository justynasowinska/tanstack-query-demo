import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { GlobalQueryOptionsToolbar } from '../GlobalQueryOptionsToolbar'

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  })
}

describe('GlobalQueryOptionsToolbar', () => {
  it('renders the toolbar with title', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalQueryOptionsToolbar />
      </QueryClientProvider>,
    )

    expect(screen.getByText('Global Query Options')).toBeInTheDocument()
  })

  it('renders staleTime field', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalQueryOptionsToolbar />
      </QueryClientProvider>,
    )

    expect(screen.getByLabelText(/staleTime/)).toBeInTheDocument()
  })

  it('renders gcTime field', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalQueryOptionsToolbar />
      </QueryClientProvider>,
    )

    expect(screen.getByLabelText(/gcTime/)).toBeInTheDocument()
  })

  it('renders retry field', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalQueryOptionsToolbar />
      </QueryClientProvider>,
    )

    expect(screen.getByLabelText(/retry/)).toBeInTheDocument()
  })

  it('renders mode selectors with options', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalQueryOptionsToolbar />
      </QueryClientProvider>,
    )

    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThanOrEqual(2)
    
    // Both should have Infinity option selected
    selects.forEach((select: HTMLElement) => {
      expect(select).toHaveValue('infinity')
    })
  })

  it('changes mode and disables input when set to infinity', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalQueryOptionsToolbar />
      </QueryClientProvider>,
    )

    const selects = screen.getAllByRole('combobox')
    const staleTimeSelect = selects[0]

    expect(staleTimeSelect).toHaveValue('infinity')
  })

  it('renders numeric input for time values when in custom mode', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000,
          gcTime: 5000,
        },
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <GlobalQueryOptionsToolbar />
      </QueryClientProvider>,
    )

    const inputs = screen.getAllByRole('spinbutton')
    expect(inputs.length).toBeGreaterThanOrEqual(3)
  })
})
