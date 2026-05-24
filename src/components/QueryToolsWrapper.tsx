import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { DemoQueryToolbar } from './DemoQueryToolbar'

type QueryToolsWrapperProps = {
  queryKey: string[]
  title?: string
  description?: React.ReactNode
  onRefetch?: () => void
  localControls?: React.ReactNode
  children: React.ReactNode
}

export function QueryToolsWrapper({
  queryKey,
  title,
  description,
  onRefetch,
  localControls,
  children,
}: QueryToolsWrapperProps) {
  const queryClient = useQueryClient()
  const [remountKey, setRemountKey] = useState(0)

  const handleRefetch = () => {
    if (onRefetch) {
      onRefetch()
      return
    }

    void queryClient.refetchQueries({ queryKey })
  }

  const handleRemount = () => {
    setRemountKey((current) => current + 1)
  }

  return (
    <div className="query-tools-layout">
      <section className="query-tools-card">
        {(title || description) && (
          <div className="query-tools-header">
            {title && <p className="query-tools-title">{title}</p>}
            {description && <div className="query-tools-description">{description}</div>}
          </div>
        )}

        <div className="query-tools-footer">
          <DemoQueryToolbar
            onRefetch={handleRefetch}
            onRemount={handleRemount}
          />
          {localControls && (
            <div className="query-tools-local-controls">{localControls}</div>
          )}
          <div key={remountKey}>{children}</div>
        </div>
      </section>
    </div>
  )
}