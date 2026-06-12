import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DemoQueryToolbar } from '../DemoQueryToolbar'

describe('DemoQueryToolbar', () => {
  it('renders refetch button', () => {
    render(
      <DemoQueryToolbar
        onRefetch={() => {}}
      />,
    )

    expect(screen.getByRole('button', { name: /refetch/i })).toBeInTheDocument()
  })

  it('calls onRefetch when refetch button is clicked', async () => {
    const user = userEvent.setup()
    const onRefetch = jest.fn()

    render(
      <DemoQueryToolbar onRefetch={onRefetch} />,
    )

    const refetchButton = screen.getByRole('button', { name: /refetch/i })
    await user.click(refetchButton)

    expect(onRefetch).toHaveBeenCalledTimes(1)
  })

  it('renders remount button when onRemount is provided', () => {
    render(
      <DemoQueryToolbar
        onRefetch={() => {}}
        onRemount={() => {}}
      />,
    )

    expect(screen.getByRole('button', { name: /remount this component/i })).toBeInTheDocument()
  })

  it('does not render remount button when onRemount is not provided', () => {
    render(
      <DemoQueryToolbar onRefetch={() => {}} />,
    )

    expect(screen.queryByRole('button', { name: /remount this component/i })).not.toBeInTheDocument()
  })

  it('calls onRemount when remount button is clicked', async () => {
    const user = userEvent.setup()
    const onRemount = jest.fn()

    render(
      <DemoQueryToolbar
        onRefetch={() => {}}
        onRemount={onRemount}
      />,
    )

    const remountButton = screen.getByRole('button', { name: /remount this component/i })
    await user.click(remountButton)

    expect(onRemount).toHaveBeenCalledTimes(1)
  })
})
