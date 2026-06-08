import { useEffect, useState, useSyncExternalStore } from 'react'
import {
    getFetchDemoUserCallCount,
    getFetchDemoUserShouldFail,
    getFetchDemoUserStableChangingValue,
    getFetchDemoUserUseRandomChangingValue,
    getMockApiDelayMs,
    resetFetchDemoUserCallCount,
    setFetchDemoUserShouldFail,
    setFetchDemoUserStableChangingValue,
    setFetchDemoUserUseRandomChangingValue,
    setMockApiDelayMs,
    subscribeFetchDemoUserCallCount,
    subscribeFetchDemoUserShouldFail,
    subscribeFetchDemoUserValueMode,
} from '../api/mockApi'

function parseDelayValue(value: string): number {
  const parsed = Number(value.trim())

  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0
}

function parseStableChangingValue(value: string): number {
  const parsed = Number(value.trim())

  return Number.isFinite(parsed) ? Number(parsed.toFixed(5)) : 0.5
}

export function GlobalFetchDemoUserStatsPanel() {
  const fetchDemoUserCallCount = useSyncExternalStore(
    subscribeFetchDemoUserCallCount,
    getFetchDemoUserCallCount,
  )
  const fetchDemoUserShouldFail = useSyncExternalStore(
    subscribeFetchDemoUserShouldFail,
    getFetchDemoUserShouldFail,
  )
  const fetchDemoUserUseRandomChangingValue = useSyncExternalStore(
    subscribeFetchDemoUserValueMode,
    getFetchDemoUserUseRandomChangingValue,
  )
  const fetchDemoUserStableChangingValue = useSyncExternalStore(
    subscribeFetchDemoUserValueMode,
    getFetchDemoUserStableChangingValue,
  )
  const [delayInput, setDelayInput] = useState(String(getMockApiDelayMs()))
  const [stableValueInput, setStableValueInput] = useState(
    String(getFetchDemoUserStableChangingValue()),
  )

  useEffect(() => {
    setMockApiDelayMs(parseDelayValue(delayInput))
  }, [delayInput])

  useEffect(() => {
    setFetchDemoUserStableChangingValue(parseStableChangingValue(stableValueInput))
  }, [stableValueInput])

  useEffect(() => {
    setStableValueInput(String(fetchDemoUserStableChangingValue))
  }, [fetchDemoUserStableChangingValue])

  return (
    <section className="global-fetch-stats" aria-label="mocked api function">
      <div className="global-fetch-stats-header">
        <div className="global-fetch-stats-meta">
          <p className="global-fetch-stats-title">Mocked API function</p>
          <div className="global-fetch-stats-row">
            <p className="global-fetch-stats-value">fetchDemoUser</p>
            <p className="global-fetch-stats-value">calls: {fetchDemoUserCallCount}</p>
          </div>

          <button
            type="button"
            className="global-fetch-stats-reset-button"
            onClick={resetFetchDemoUserCallCount}
          >
            Reset counter
          </button>
        </div>

        <div className="global-fetch-stats-actions">
          <label className="global-fetch-stats-delay-field" htmlFor="global-fetch-api-delay">
            API delay (ms)
            <input
              id="global-fetch-api-delay"
              type="number"
              min={0}
              step={50}
              value={delayInput}
              onChange={(event) => setDelayInput(event.target.value)}
            />
          </label>

          <label
            className="global-fetch-stats-toggle"
            htmlFor="fetch-demo-user-random-changing-value"
          >
            <input
              id="fetch-demo-user-random-changing-value"
              type="checkbox"
              checked={fetchDemoUserUseRandomChangingValue}
              onChange={(event) =>
                setFetchDemoUserUseRandomChangingValue(event.target.checked)
              }
            />
            Use Math.random()
          </label>

          <label
            className="global-fetch-stats-delay-field"
            htmlFor="fetch-demo-user-stable-changing-value"
          >
            Stable changingValue
            <input
              id="fetch-demo-user-stable-changing-value"
              type="number"
              step="0.00001"
              value={stableValueInput}
              onChange={(event) => setStableValueInput(event.target.value)}
              disabled={fetchDemoUserUseRandomChangingValue}
            />
          </label>

          <label className="global-fetch-stats-toggle" htmlFor="fetch-demo-user-force-error">
            <input
              id="fetch-demo-user-force-error"
              type="checkbox"
              checked={fetchDemoUserShouldFail}
              onChange={(event) => setFetchDemoUserShouldFail(event.target.checked)}
            />
            Force error
          </label>
        </div>
      </div>
    </section>
  )
}
