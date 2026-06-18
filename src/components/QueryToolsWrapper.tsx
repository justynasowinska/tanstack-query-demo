import { useQueryClient } from '@tanstack/react-query'
import { isValidElement, useState } from 'react'
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
  const queryKeyText = JSON.stringify(queryKey)
  const hasQueryKeyInDescription =
    isValidElement<{ children?: React.ReactNode }>(description) &&
    description.type === 'pre' &&
    typeof description.props.children === 'string' &&
    description.props.children.trimStart().startsWith('queryKey:')

  const handleRefetch = () => {
    if (onRefetch) {
      onRefetch()
      return
    }

    if (queryKey) {
      queryClient.refetchQueries({ queryKey })
    }
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
            {!hasQueryKeyInDescription && (
              <pre className="query-tools-code-block">{`queryKey: ${queryKeyText}`}</pre>
            )}
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