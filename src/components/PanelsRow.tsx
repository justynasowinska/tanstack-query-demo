import type { ReactNode } from 'react'

type PanelsRowProps = {
  children: ReactNode
}

export function PanelsRow({ children }: PanelsRowProps) {
  return <div className="panels-row">{children}</div>
}
