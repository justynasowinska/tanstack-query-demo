import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const IS_FETCHING_QUERY_KEY = ['04-is-fetching-subscription']

type PanelQueryContentProps = {
  queryKey: string[]
}

function PanelDataOnly({ queryKey }: PanelQueryContentProps) {
  const { data } = useQuery(userProfileQueryOptions({ queryKey }))
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

function PanelDataAndIsFetching({ queryKey }: PanelQueryContentProps) {
  const { data, isFetching } = useQuery(userProfileQueryOptions({ queryKey }))
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  // Keep isFetching subscription active, but do not render it in UI.
  void isFetching

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName}</p>
      </div>
    </div>
  )
}

export function IsFetchingSubscriptionRerenderExample() {
  return (
    <AccordionSection
      id="04_is-fetching-subscription-rerender"
      title="04 isFetching Subscription Rerender"
      description="Both panels share queryKey ['04-is-fetching-subscription']. Panel A subscribes only to data. Panel B subscribes to data + isFetching, so it rerenders on isFetching state transitions even though isFetching is not rendered in the component output."
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={IS_FETCHING_QUERY_KEY}
          title="Panel A (data only subscription)"
          description={
            <pre className="query-tools-code-block">{`queryKey: ['04-is-fetching-subscription']
const { data } = useQuery(...)`}</pre>
          }
        >
          <PanelDataOnly queryKey={IS_FETCHING_QUERY_KEY} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={IS_FETCHING_QUERY_KEY}
          title="Panel B (data + isFetching subscription)"
          description={
            <pre className="query-tools-code-block">{`const { data, isFetching } = useQuery(...)
void isFetching`}</pre>
          }
        >
          <PanelDataAndIsFetching queryKey={IS_FETCHING_QUERY_KEY} />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}
