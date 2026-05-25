import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const STALE_TIME_ZERO_QUERY_KEY = ['08-stale-0']
const STALE_TIME_INFINITY_QUERY_KEY = ['08-stale-inf']

type PanelWithStaleTimeProps = {
  queryKey: string[]
  staleTime: number
}

function PanelWithLocalStaleTime({ queryKey, staleTime }: PanelWithStaleTimeProps) {
  const { data } = useQuery({
    ...userProfileQueryOptions({ queryKey }),
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
      title="08 Stale Time"
      description="Two panels use local staleTime with separate queryKey values, so each panel has isolated cache behavior. This makes rerender/remount differences easy to compare: staleTime: 0 vs staleTime: Infinity."
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={STALE_TIME_ZERO_QUERY_KEY}
          title="Panel A (staleTime: 0)"
          description={
            <pre className="query-tools-code-block">{`useQuery({
  ...userProfileQueryOptions({ queryKey }),
  staleTime: 0,
})`}</pre>
          }
        >
          <PanelWithLocalStaleTime queryKey={STALE_TIME_ZERO_QUERY_KEY} staleTime={0} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={STALE_TIME_INFINITY_QUERY_KEY}
          title="Panel B (staleTime: Infinity)"
          description={
            <pre className="query-tools-code-block">{`useQuery({
  ...userProfileQueryOptions({ queryKey }),
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
