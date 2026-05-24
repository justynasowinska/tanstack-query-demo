import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { getMockApiDelayMs, setMockApiDelayMs } from '../api/mockApi'

const DEFAULT_STALE_TIME = 0
const DEFAULT_GC_TIME = 5 * 60 * 1000
const DEFAULT_RETRY = 3

type TimeOptionMode = 'default' | 'infinity'

function toTimeMode(value: unknown): TimeOptionMode {
  if (value === Infinity) {
    return 'infinity'
  }

  if (value === 'static') {
    return 'infinity'
  }

  return 'default'
}

function toRetryInputValue(value: unknown, fallback: number): string {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
    return String(Math.floor(value))
  }

  return String(fallback)
}

function parseRetryValue(value: string): number {
  const parsed = Number(value.trim())

  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0
}

function parseDelayValue(value: string): number {
  const parsed = Number(value.trim())

  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0
}

export function GlobalQueryOptionsToolbar() {
  const queryClient = useQueryClient()

  const initialValues = useMemo(() => {
    const queryDefaults = queryClient.getDefaultOptions().queries

    return {
      staleTimeMode: toTimeMode(queryDefaults?.staleTime),
      gcTimeMode: toTimeMode(queryDefaults?.gcTime),
      retry: toRetryInputValue(queryDefaults?.retry, DEFAULT_RETRY),
      delay: String(getMockApiDelayMs()),
    }
  }, [queryClient])

  const [staleTimeMode, setStaleTimeMode] = useState(initialValues.staleTimeMode)
  const [gcTimeMode, setGcTimeMode] = useState(initialValues.gcTimeMode)
  const [retryInput, setRetryInput] = useState(initialValues.retry)
  const [delayInput, setDelayInput] = useState(initialValues.delay)

  useEffect(() => {
    const current = queryClient.getDefaultOptions().queries ?? {}

    queryClient.setDefaultOptions({
      queries: {
        ...current,
        staleTime: staleTimeMode === 'infinity' ? Infinity : DEFAULT_STALE_TIME,
        gcTime: gcTimeMode === 'infinity' ? Infinity : DEFAULT_GC_TIME,
        retry: parseRetryValue(retryInput),
      },
    })
  }, [gcTimeMode, queryClient, retryInput, staleTimeMode])

  useEffect(() => {
    setMockApiDelayMs(parseDelayValue(delayInput))
  }, [delayInput])

  return (
    <section className="global-query-options" aria-label="global query options">
      <p className="global-query-options-title">Global Query Options</p>

      <div className="global-query-options-controls">
        <label className="global-query-options-field">
          staleTime
          <select
            value={staleTimeMode}
            onChange={(event) =>
              setStaleTimeMode(event.target.value as TimeOptionMode)
            }
          >
            <option value="default">Default (0 ms)</option>
            <option value="infinity">Infinity</option>
          </select>
        </label>

        <label className="global-query-options-field">
          gcTime
          <select
            value={gcTimeMode}
            onChange={(event) => setGcTimeMode(event.target.value as TimeOptionMode)}
          >
            <option value="default">Default (300000 ms)</option>
            <option value="infinity">Infinity</option>
          </select>
        </label>

        <label className="global-query-options-field">
          retry
          <input
            type="number"
            min={0}
            step={1}
            value={retryInput}
            onChange={(event) => setRetryInput(event.target.value)}
          />
        </label>

        <label className="global-query-options-field">
          delay (ms)
          <input
            type="number"
            min={0}
            step={50}
            value={delayInput}
            onChange={(event) => setDelayInput(event.target.value)}
          />
        </label>
      </div>
    </section>
  )
}
