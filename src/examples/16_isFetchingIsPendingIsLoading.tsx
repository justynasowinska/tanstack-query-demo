import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import type { DemoUser } from '../api/mockApi'
import { AccordionSection } from '../components/AccordionSection'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const QUERY_FLAGS_QUERY_KEY = ['16-query-flags']

type QueryFlagsPanelProps = {
  data: DemoUser | undefined
  error: Error | null
  isFetching: boolean
  isPending: boolean
  isLoading: boolean
}

function QueryFlagsPanel({
  data,
  error,
  isFetching,
  isPending,
  isLoading,
}: QueryFlagsPanelProps) {
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName ?? '(no data)'}</p>
        <p>changingValue: {data?.changingValue ?? '(no data)'}</p>
        <p>isPending: {String(isPending)}</p>
        <p>isLoading: {String(isLoading)}</p>
        <p>isFetching: {String(isFetching)}</p>
        <p>Error: {error?.message ?? '(none)'}</p>
      </div>
    </div>
  )
}

export function QueryFlagsStatesExample() {
  const [enabled, setEnabled] = useState(true)
  const [subscribed, setSubscribed] = useState(true)

  const { data, error, isFetching, isPending, isLoading } = useQuery({
    ...userProfileOptions({ queryKey: QUERY_FLAGS_QUERY_KEY }),
    enabled,
    subscribed,
  })

  return (
    <AccordionSection
      id="16_query-flags"
      title="16 isFetching vs isPending vs isLoading"
      description={
        <>
          Check the flags together with rendered data: first with an empty cache,
          then with cached data already available. Also enable global <strong>forceError</strong>{' '}
          and compare how the states change on error. The <strong>enabled</strong>{' '}
          and <strong>subscribed</strong> toggles below let you experiment with
          automatic fetching, cache observation, and manual refetch behavior.
        </>
      }
    >
      <QueryToolsWrapper
        queryKey={QUERY_FLAGS_QUERY_KEY}
        title="Single panel"
        localControls={
          <>
            <label className="panel-inline-toggle">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(event) => setEnabled(event.target.checked)}
              />
              enabled
            </label>

            <label className="panel-inline-toggle">
              <input
                type="checkbox"
                checked={subscribed}
                onChange={(event) => setSubscribed(event.target.checked)}
              />
              subscribed
            </label>
          </>
        }
        description={
          <pre className="query-tools-code-block">{`const { isPending, isLoading, isFetching } = useQuery({
  ...userProfileOptions({ queryKey }),
  enabled,
  subscribed,
})`}</pre>
        }
      >
        <QueryFlagsPanel
          data={data}
          error={error}
          isFetching={isFetching}
          isPending={isPending}
          isLoading={isLoading}
        />
      </QueryToolsWrapper>
    </AccordionSection>
  )
}