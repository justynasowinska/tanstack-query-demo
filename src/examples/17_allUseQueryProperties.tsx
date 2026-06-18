import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import type { DemoUser } from '../api/mockApi'
import { AccordionSection } from '../components/AccordionSection'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const ALL_QUERY_PROPERTIES_QUERY_KEY = ['17-all-use-query-properties']

type QueryLike = {
  data: DemoUser | undefined
  dataUpdatedAt: number
  error: Error | null
  errorUpdatedAt: number
  failureCount: number
  failureReason: unknown
  fetchStatus: string
  isError: boolean
  isFetched: boolean
  isFetchedAfterMount: boolean
  isFetching: boolean
  isLoading: boolean
  isLoadingError: boolean
  isPaused: boolean
  isPending: boolean
  isPlaceholderData: boolean
  isRefetchError: boolean
  isRefetching: boolean
  isStale: boolean
  isSuccess: boolean
  refetch: () => Promise<unknown>
  status: string
  isInitialLoading?: boolean
  isEnabled?: boolean
  promise?: Promise<unknown>
}

function formatTimestamp(value: number): string {
  if (!value) {
    return '0 (not set yet)'
  }

  return `${new Date(value).toLocaleTimeString()} (${value})`
}

function formatFailureReason(value: unknown): string {
  if (!value) {
    return '(none)'
  }

  if (value instanceof Error) {
    return value.message
  }

  return String(value)
}

function formatData(value: DemoUser | undefined): string {
  if (!value) {
    return '(no data)'
  }

  return JSON.stringify(value)
}

function AllUseQueryPropertiesPanel({ query }: { query: QueryLike }) {
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>data: {formatData(query.data)}</p>
        <p>dataUpdatedAt: {formatTimestamp(query.dataUpdatedAt)}</p>
        <p>error: {query.error?.message ?? '(none)'}</p>
        <p>errorUpdatedAt: {formatTimestamp(query.errorUpdatedAt)}</p>
        <p>failureCount: {String(query.failureCount)}</p>
        <p>failureReason: {formatFailureReason(query.failureReason)}</p>
        <p>fetchStatus: {query.fetchStatus}</p>
        <p>isError: {String(query.isError)}</p>
        <p>isFetched: {String(query.isFetched)}</p>
        <p>isFetchedAfterMount: {String(query.isFetchedAfterMount)}</p>
        <p>isFetching: {String(query.isFetching)}</p>
        <p>isInitialLoading: {String(query.isInitialLoading ?? query.isLoading)}</p>
        <p>isLoading: {String(query.isLoading)}</p>
        <p>isLoadingError: {String(query.isLoadingError)}</p>
        <p>isPaused: {String(query.isPaused)}</p>
        <p>isPending: {String(query.isPending)}</p>
        <p>isPlaceholderData: {String(query.isPlaceholderData)}</p>
        <p>isRefetchError: {String(query.isRefetchError)}</p>
        <p>isRefetching: {String(query.isRefetching)}</p>
        <p>isStale: {String(query.isStale)}</p>
        <p>isSuccess: {String(query.isSuccess)}</p>
        <p>isEnabled: {String(query.isEnabled ?? '(not exposed)')}</p>
        <p>promise: {query.promise ? 'Promise available' : '(not exposed)'}</p>
        <p>refetch: function available</p>
        <p>status: {query.status}</p>
      </div>
    </div>
  )
}

function AllUseQueryPropertiesPanelContainer() {
  const [enabled, setEnabled] = useState(true)
  const [subscribed, setSubscribed] = useState(true)

  const queryResult = useQuery({
    ...userProfileOptions({ queryKey: ALL_QUERY_PROPERTIES_QUERY_KEY }),
    enabled,
    subscribed,
  })

  const optionalFields = queryResult as {
    isInitialLoading?: boolean
    isEnabled?: boolean
    promise?: Promise<unknown>
  }

  const query: QueryLike = {
    ...queryResult,
    fetchStatus: queryResult.fetchStatus,
    status: queryResult.status,
    isInitialLoading: optionalFields.isInitialLoading ?? queryResult.isLoading,
    isEnabled: optionalFields.isEnabled ?? enabled,
    promise: optionalFields.promise,
  }

  return (
    <QueryToolsWrapper
      queryKey={ALL_QUERY_PROPERTIES_QUERY_KEY}
      title="Single panel"
      onRefetch={() => {
        void query.refetch()
      }}
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
        <pre className="query-tools-code-block">{`const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPending,
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  isEnabled,
  promise,
  refetch,
  status,
} = useQuery({
  ...userProfileOptions({ queryKey }),
  enabled,
  subscribed,
})`}</pre>
      }
    >
      <AllUseQueryPropertiesPanel query={query} />
    </QueryToolsWrapper>
  )
}

export function AllUseQueryPropertiesExample() {
  return (
    <AccordionSection
      id="17_all-use-query-properties"
      title="17 All useQuery Result Properties"
      description={
        <>
          This panel shows a live snapshot of all commonly used fields returned by{' '}
          <strong>useQuery</strong>. Toggle <strong>enabled</strong> and <strong>subscribed</strong>{' '}
          to see how observer state, fetch status, and flags change over time.
        </>
      }
    >
      <AllUseQueryPropertiesPanelContainer />
    </AccordionSection>
  )
}