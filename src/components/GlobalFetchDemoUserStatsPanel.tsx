import { useSyncExternalStore } from 'react'
import {
    getFetchDemoUserCallCount,
    getFetchDemoUserShouldFail,
    resetFetchDemoUserCallCount,
    setFetchDemoUserShouldFail,
    subscribeFetchDemoUserCallCount,
    subscribeFetchDemoUserShouldFail,
} from '../api/mockApi'

export function GlobalFetchDemoUserStatsPanel() {
  const fetchDemoUserCallCount = useSyncExternalStore(
    subscribeFetchDemoUserCallCount,
    getFetchDemoUserCallCount,
  )
  const fetchDemoUserShouldFail = useSyncExternalStore(
    subscribeFetchDemoUserShouldFail,
    getFetchDemoUserShouldFail,
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
      <div className="global-fetch-stats-row">
        <p className="global-fetch-stats-value">fetchDemoUser</p>
        <p className="global-fetch-stats-value">calls: {fetchDemoUserCallCount}</p>
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
    </section>
  )
}
