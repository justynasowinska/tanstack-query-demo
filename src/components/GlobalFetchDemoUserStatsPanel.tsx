import { useSyncExternalStore } from 'react'
import {
    getFetchDemoUserCallCount,
    resetFetchDemoUserCallCount,
    subscribeFetchDemoUserCallCount,
} from '../api/mockApi'

export function GlobalFetchDemoUserStatsPanel() {
  const fetchDemoUserCallCount = useSyncExternalStore(
    subscribeFetchDemoUserCallCount,
    getFetchDemoUserCallCount,
  )

  return (
    <section className="global-fetch-stats" aria-label="global fetch stats">
      <div className="global-fetch-stats-header">
        <p className="global-fetch-stats-title">Global Fetch Stats</p>
        <button
          type="button"
          className="global-fetch-stats-reset-button"
          onClick={resetFetchDemoUserCallCount}
        >
          Reset counter
        </button>
      </div>
      <p className="global-fetch-stats-value">
        fetchDemoUser calls: {fetchDemoUserCallCount}
      </p>
    </section>
  )
}
