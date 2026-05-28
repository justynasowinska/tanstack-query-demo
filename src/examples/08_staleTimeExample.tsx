import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const STALE_TIME_FIVE_SECONDS_QUERY_KEY = ['08-stale-5s']
const STALE_TIME_INFINITY_QUERY_KEY = ['08-stale-inf']

type PanelWithStaleTimeProps = {
  queryKey: string[]
  staleTime: number
}

function PanelWithLocalStaleTime({ queryKey, staleTime }: PanelWithStaleTimeProps) {
  const { data } = useQuery({
    ...userProfileOptions({ queryKey }),
    staleTime,
  })
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName}</p>
      </div>
    </div>
  )
}

export function StaleTimeExample() {
  return (
    <AccordionSection
      id="08_stale-time"
      title="08 Stale Time and Invalidation"
      description={
        <>
          staleTime tells TanStack Query how long cached data should stay fresh. If data is already in cache and mount/remount happens before
          staleTime expires, the query will not run automatically. With
          staleTime: Infinity, mount and remount never trigger automatic fetch.
          Invalidating a query marks it as stale regardless of staleTime (except
          for 'static'). You can still always trigger a manual refetch,
          regardless of staleTime.
          <br />
          <br />
          After the first fetch, data is stored in cache. Close this panel and
          open it again: the query with staleTime: Infinity will not fetch again,
          even though it moves from Inactive to Active.
          <br />
          <br />
          If you click Invalidate on that cache entry while the panel is closed,
          data will be fetched again after reopening, because the cache was marked
          as Stale.
          <br />
          <br />
          <a
            href="https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults"
            target="_blank"
            rel="noreferrer"
          >
            Read more in docs
          </a>
          .
        </>
      }
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={STALE_TIME_FIVE_SECONDS_QUERY_KEY}
          title="Panel A (staleTime: 5000)"
          description={
            <pre className="query-tools-code-block">{`useQuery({
  ...userProfileOptions({ queryKey }),
  staleTime: 5000,
})`}</pre>
          }
        >
          <PanelWithLocalStaleTime
            queryKey={STALE_TIME_FIVE_SECONDS_QUERY_KEY}
            staleTime={5000}
          />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={STALE_TIME_INFINITY_QUERY_KEY}
          title="Panel B (staleTime: Infinity)"
          description={
            <pre className="query-tools-code-block">{`useQuery({
  ...userProfileOptions({ queryKey }),
  staleTime: Infinity,
})`}</pre>
          }
        >
          <PanelWithLocalStaleTime
            queryKey={STALE_TIME_INFINITY_QUERY_KEY}
            staleTime={Infinity}
          />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}
