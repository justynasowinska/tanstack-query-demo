import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { PanelsRow } from '../PanelsRow'

describe('PanelsRow', () => {
  it('renders children', () => {
    render(
      <PanelsRow>
        <div>Panel Content</div>
      </PanelsRow>,
    )

    expect(screen.getByText('Panel Content')).toBeInTheDocument()
  })

  it('wraps children in div with panels-row class', () => {
    const { container } = render(
      <PanelsRow>
        <div>Content</div>
      </PanelsRow>,
    )

    const row = container.querySelector('.panels-row')
    expect(row).toBeInTheDocument()
    expect(row).toHaveTextContent('Content')
  })

  it('renders multiple children', () => {
    render(
      <PanelsRow>
        <div>Panel 1</div>
        <div>Panel 2</div>
        <div>Panel 3</div>
      </PanelsRow>,
    )

    expect(screen.getByText('Panel 1')).toBeInTheDocument()
    expect(screen.getByText('Panel 2')).toBeInTheDocument()
    expect(screen.getByText('Panel 3')).toBeInTheDocument()
  })

  it('preserves complex children structure', () => {
    const { container } = render(
      <PanelsRow>
        <section>
          <p>Nested Content</p>
        </section>
      </PanelsRow>,
    )

    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(screen.getByText('Nested Content')).toBeInTheDocument()
  })
})
