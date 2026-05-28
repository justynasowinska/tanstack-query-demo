import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const GC_TIME_FIVE_SECONDS_QUERY_KEY = ['09-gc-5s']
const GC_TIME_INFINITY_QUERY_KEY = ['09-gc-inf']

type PanelWithGcTimeProps = {
  queryKey: string[]
  gcTime: number
}

function PanelWithLocalGcTime({ queryKey, gcTime }: PanelWithGcTimeProps) {
  const { data } = useQuery({
    ...userProfileOptions({ queryKey }),
    gcTime,
  })
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName ?? '(no data yet)'}</p>
      </div>
    </div>
  )
}

export function GcTimeExample() {
  return (
    <AccordionSection
      id="09_gc-time"
      title="09 gcTime"
      description={
        <>
          gcTime is the time in milliseconds that unused/inactive cache data stays
          in memory. When a query becomes inactive, cache data is garbage collected
          after this time. If different gcTime values are used, the longest one
          wins. With gcTime: Infinity, garbage collection is disabled.
          <br />
          <br />
          To observe it: close this accordion and check DevTools - both queries
          become Inactive. After 5 seconds, the query with gcTime: 5000 disappears
          from DevTools (data removed from cache). After reopening, that panel starts
          without data until a new fetch finishes, while the Infinity panel still
          has cached data.
          <br />
          <br />
          <a
            href="https://tanstack.com/query/latest/docs/framework/react/reference/useQuery"
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
          queryKey={GC_TIME_FIVE_SECONDS_QUERY_KEY}
          title="Panel A (gcTime: 5000)"
          description={
            <pre className="query-tools-code-block">{`useQuery({
  ...userProfileOptions({ queryKey }),
  gcTime: 5000,
})`}</pre>
          }
        >
          <PanelWithLocalGcTime queryKey={GC_TIME_FIVE_SECONDS_QUERY_KEY} gcTime={5000} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={GC_TIME_INFINITY_QUERY_KEY}
          title="Panel B (gcTime: Infinity)"
          description={
            <pre className="query-tools-code-block">{`useQuery({
  ...userProfileOptions({ queryKey }),
  gcTime: Infinity,
})`}</pre>
          }
        >
          <PanelWithLocalGcTime queryKey={GC_TIME_INFINITY_QUERY_KEY} gcTime={Infinity} />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}
