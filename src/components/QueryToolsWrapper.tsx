import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { DemoQueryToolbar } from './DemoQueryToolbar'

type QueryToolsWrapperProps = {
  queryKey: string[]
  shouldFail: boolean
  onShouldFailChange: (value: boolean) => void
  children: React.ReactNode
}

export function QueryToolsWrapper({
  queryKey,
  shouldFail,
  onShouldFailChange,
  children,
}: QueryToolsWrapperProps) {
  const queryClient = useQueryClient()
  const [remountKey, setRemountKey] = useState(0)

  const handleRefetch = () => {
    void queryClient.refetchQueries({ queryKey })
  }

  const handleRemount = () => {
    setRemountKey((current) => current + 1)
  }

  return (
    <div className="query-tools-layout">
      <section className="query-tools-card">
        <DemoQueryToolbar
          onRefetch={handleRefetch}
          onRemount={handleRemount}
          shouldFail={shouldFail}
          onShouldFailChange={onShouldFailChange}
        />
        <div key={remountKey}>{children}</div>
      </section>
    </div>
  )
}