import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccordionSection } from '../AccordionSection'

describe('AccordionSection', () => {
  it('renders title and description', () => {
    render(
      <AccordionSection
        id="test-1"
        title="Test Title"
        description="Test Description"
      >
        <div>Test Content</div>
      </AccordionSection>,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('shows content when opened', async () => {
    const user = userEvent.setup()

    render(
      <AccordionSection
        id="test-1"
        title="Test Title"
        description="Test Description"
      >
        <div>Test Content</div>
      </AccordionSection>,
    )

    const trigger = screen.getByRole('button', { name: /Test Title/i })
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()

    await user.click(trigger)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('toggles content visibility on button click', async () => {
    const user = userEvent.setup()

    render(
      <AccordionSection
        id="test-1"
        title="Toggle Test"
        description="Description"
      >
        <div>Hidden Content</div>
      </AccordionSection>,
    )

    const trigger = screen.getByRole('button')

    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument()

    await user.click(trigger)
    expect(screen.getByText('Hidden Content')).toBeInTheDocument()

    await user.click(trigger)
    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument()
  })

  it('has correct aria attributes', () => {
    render(
      <AccordionSection
        id="test-aria"
        title="Aria Test"
        description="Description"
      >
        <div>Content</div>
      </AccordionSection>,
    )

    const trigger = screen.getByRole('button')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-controls', 'panel-test-aria')
    expect(trigger).toHaveAttribute('id', 'trigger-test-aria')
  })

  it('opens by default when defaultOpen is true', () => {
    render(
      <AccordionSection
        id="test-default-open"
        title="Default Open"
        description="Description"
        defaultOpen={true}
      >
        <div>Visible Content</div>
      </AccordionSection>,
    )

    expect(screen.getByText('Visible Content')).toBeInTheDocument()
    const trigger = screen.getByRole('button')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })
})
