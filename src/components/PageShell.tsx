import type { ReactNode } from 'react'

type PageShellProps = {
  title: string
  children: ReactNode
}

export function PageShell({ title, children }: PageShellProps) {
  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>{title}</h1>
      </header>

      <section className="accordion-list" aria-label="useQuery examples">
        {children}
      </section>
    </main>
  )
}
