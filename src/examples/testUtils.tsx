import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'

export function renderExample(example: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>{example}</QueryClientProvider>,
  )
}

export async function openExampleAccordion(title: string) {
  const user = userEvent.setup()
  const triggerTitle = screen.getByText(title)
  const triggerButton = triggerTitle.closest('button') as HTMLButtonElement | null

  if (!triggerButton) {
    throw new Error(`Accordion trigger not found for ${title}`)
  }

  await user.click(triggerButton)
}