import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { PageShell } from '../PageShell'

describe('PageShell', () => {
  it('renders children', () => {
    render(
      <PageShell>
        <div>Test Content</div>
      </PageShell>,
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <PageShell title="Test Title">
        <div>Content</div>
      </PageShell>,
    )

    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument()
  })

  it('does not render header when title is not provided', () => {
    const { container } = render(
      <PageShell>
        <div>Content</div>
      </PageShell>,
    )

    const header = container.querySelector('.app-header')
    expect(header).not.toBeInTheDocument()
  })

  it('renders main element with correct class', () => {
    const { container } = render(
      <PageShell>
        <div>Content</div>
      </PageShell>,
    )

    expect(container.querySelector('.app-shell')).toBeInTheDocument()
  })

  it('renders section with aria-label', () => {
    const { container } = render(
      <PageShell>
        <div>Content</div>
      </PageShell>,
    )

    const section = container.querySelector('[aria-label="useQuery examples"]')
    expect(section).toBeInTheDocument()
  })

  it('renders multiple children correctly', () => {
    render(
      <PageShell title="Multi Child Test">
        <div>First Child</div>
        <div>Second Child</div>
      </PageShell>,
    )

    expect(screen.getByText('First Child')).toBeInTheDocument()
    expect(screen.getByText('Second Child')).toBeInTheDocument()
  })
})
