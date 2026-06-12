import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

const DEFAULT_STALE_TIME = Infinity
const DEFAULT_GC_TIME = Infinity
const DEFAULT_RETRY = 0

type TimeOptionMode = 'custom' | 'infinity'

function toTimeMode(value: unknown, isDefaultInfinity: boolean = false): TimeOptionMode {
  if (value === Infinity) {
    return 'infinity'
  }

  if (value === 'static') {
    return 'infinity'
  }

  if (value === undefined && isDefaultInfinity) {
    return 'infinity'
  }

  return 'custom'
}

function toTimeInputValue(value: unknown, fallback: number | typeof Infinity): string {
  if (value === Infinity) {
    return '0'
  }

  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
    return String(Math.floor(value))
  }

  if (fallback === Infinity) {
    return '0'
  }

  return String(fallback)
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

function parseTimeValue(value: string, fallback: number): number {
  const parsed = Number(value.trim())

  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback
}

export function GlobalQueryOptionsToolbar() {
  const queryClient = useQueryClient()

  const initialValues = useMemo(() => {
    const queryDefaults = queryClient.getDefaultOptions().queries

    return {
      staleTimeMode: toTimeMode(queryDefaults?.staleTime, DEFAULT_STALE_TIME === Infinity),
      staleTimeInput: toTimeInputValue(queryDefaults?.staleTime, DEFAULT_STALE_TIME),
      gcTimeMode: toTimeMode(queryDefaults?.gcTime, DEFAULT_GC_TIME === Infinity),
      gcTimeInput: toTimeInputValue(queryDefaults?.gcTime, DEFAULT_GC_TIME),
      retry: toRetryInputValue(queryDefaults?.retry, DEFAULT_RETRY),
    }
  }, [queryClient])

  const [staleTimeMode, setStaleTimeMode] = useState(initialValues.staleTimeMode)
  const [staleTimeInput, setStaleTimeInput] = useState(initialValues.staleTimeInput)
  const [gcTimeMode, setGcTimeMode] = useState(initialValues.gcTimeMode)
  const [gcTimeInput, setGcTimeInput] = useState(initialValues.gcTimeInput)
  const [retryInput, setRetryInput] = useState(initialValues.retry)

  useEffect(() => {
    const current = queryClient.getDefaultOptions().queries ?? {}

    queryClient.setDefaultOptions({
      queries: {
        ...current,
        staleTime:
          staleTimeMode === 'infinity'
            ? Infinity
            : parseTimeValue(staleTimeInput, DEFAULT_STALE_TIME),
        gcTime:
          gcTimeMode === 'infinity'
            ? Infinity
            : parseTimeValue(gcTimeInput, DEFAULT_GC_TIME),
        retry: parseRetryValue(retryInput),
      },
    })
  }, [
    gcTimeInput,
    gcTimeMode,
    queryClient,
    retryInput,
    staleTimeInput,
    staleTimeMode,
  ])

  return (
    <section className="global-query-options" aria-label="global query options">
      <p className="global-query-options-title">Global Query Options</p>

      <div className="global-query-options-controls">
        <label className="global-query-options-field">
          staleTime
          <div className="global-query-options-time-row">
            <select
              className="global-query-options-time-mode"
              value={staleTimeMode}
              onChange={(event) =>
                setStaleTimeMode(event.target.value as TimeOptionMode)
              }
            >
              <option value="custom">Custom</option>
              <option value="infinity">Infinity</option>
            </select>

            <input
              className="global-query-options-time-value"
              type="number"
              min={0}
              step={100}
              value={staleTimeInput}
              onChange={(event) => setStaleTimeInput(event.target.value)}
              disabled={staleTimeMode === 'infinity'}
            />
          </div>
        </label>

        <label className="global-query-options-field">
          gcTime
          <div className="global-query-options-time-row">
            <select
              className="global-query-options-time-mode"
              value={gcTimeMode}
              onChange={(event) => setGcTimeMode(event.target.value as TimeOptionMode)}
            >
              <option value="custom">Custom</option>
              <option value="infinity">Infinity</option>
            </select>

            <input
              className="global-query-options-time-value"
              type="number"
              min={0}
              step={100}
              value={gcTimeInput}
              onChange={(event) => setGcTimeInput(event.target.value)}
              disabled={gcTimeMode === 'infinity'}
            />
          </div>
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
      </div>
    </section>
  )
}
