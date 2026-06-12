import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryToolsWrapper } from '../QueryToolsWrapper'

const createQueryClient = () => new QueryClient()

describe('QueryToolsWrapper', () => {
  it('renders children', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <QueryToolsWrapper queryKey={['test']}>
          <div>Test Children</div>
        </QueryToolsWrapper>
      </QueryClientProvider>,
    )

    expect(screen.getByText('Test Children')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <QueryToolsWrapper queryKey={['test']} title="Test Title">
          <div>Content</div>
        </QueryToolsWrapper>
      </QueryClientProvider>,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <QueryToolsWrapper queryKey={['test']} description="Test Description">
          <div>Content</div>
        </QueryToolsWrapper>
      </QueryClientProvider>,
    )

    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders query key in code block', () => {
    const queryClient = createQueryClient()

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <QueryToolsWrapper queryKey={['users', '123']} title="Test Title">
          <div>Content</div>
        </QueryToolsWrapper>
      </QueryClientProvider>,
    )

    // The queryKey is rendered in a pre tag with query-tools-code-block class
    const preTag = container.querySelector('pre.query-tools-code-block')
    expect(preTag?.textContent).toContain('queryKey:')
  })

  it('does not show query key when it is in description pre tag', () => {
    const queryClient = createQueryClient()

    const descriptionWithQueryKey = (
      <pre>{`queryKey: ['users', '123']`}</pre>
    )

    render(
      <QueryClientProvider client={queryClient}>
        <QueryToolsWrapper
          queryKey={['users', '123']}
          description={descriptionWithQueryKey}
        >
          <div>Content</div>
        </QueryToolsWrapper>
      </QueryClientProvider>,
    )

    const codeBlocks = screen.getAllByText(/queryKey:/)
    expect(codeBlocks.length).toBe(1)
    expect(screen.getByText(`queryKey: ['users', '123']`)).toBeInTheDocument()
  })

  it('renders refetch button', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <QueryToolsWrapper queryKey={['test']}>
          <div>Content</div>
        </QueryToolsWrapper>
      </QueryClientProvider>,
    )

    expect(screen.getByRole('button', { name: /refetch/i })).toBeInTheDocument()
  })

  it('renders remount button', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <QueryToolsWrapper queryKey={['test']}>
          <div>Content</div>
        </QueryToolsWrapper>
      </QueryClientProvider>,
    )

    expect(screen.getByRole('button', { name: /remount/i })).toBeInTheDocument()
  })

  it('calls custom onRefetch when provided', async () => {
    const user = userEvent.setup()
    const queryClient = createQueryClient()
    const onRefetch = jest.fn()

    render(
      <QueryClientProvider client={queryClient}>
        <QueryToolsWrapper queryKey={['test']} onRefetch={onRefetch}>
          <div>Content</div>
        </QueryToolsWrapper>
      </QueryClientProvider>,
    )

    const refetchButton = screen.getByRole('button', { name: /refetch/i })
    await user.click(refetchButton)

    expect(onRefetch).toHaveBeenCalled()
  })

  it('renders local controls when provided', () => {
    const queryClient = createQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <QueryToolsWrapper
          queryKey={['test']}
          localControls={<button>Local Control</button>}
        >
          <div>Content</div>
        </QueryToolsWrapper>
      </QueryClientProvider>,
    )

    expect(screen.getByRole('button', { name: /local control/i })).toBeInTheDocument()
  })

  it('remounts children when remount button is clicked', async () => {
    const user = userEvent.setup()
    const queryClient = createQueryClient()

    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <QueryToolsWrapper queryKey={['test']}>
          <div data-testid="remount-test">Content</div>
        </QueryToolsWrapper>
      </QueryClientProvider>,
    )

    const remountButton = screen.getByRole('button', { name: /remount/i })

    await user.click(remountButton)

    rerender(
      <QueryClientProvider client={queryClient}>
        <QueryToolsWrapper queryKey={['test']}>
          <div data-testid="remount-test">Content</div>
        </QueryToolsWrapper>
      </QueryClientProvider>,
    )

    expect(screen.getByTestId('remount-test')).toBeInTheDocument()
  })
})
