import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const IS_FETCHING_QUERY_KEY = ['02-tracked']

type PanelQueryContentProps = {
  queryKey: string[]
}

function PanelDataOnly({ queryKey }: PanelQueryContentProps) {
  const { data } = useQuery(userProfileOptions({ queryKey }))
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
  const { data, isFetching } = useQuery(userProfileOptions({ queryKey }))
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
      id="02_subscription-rerender-tracked-values"
      title="02 Tracked Values Rerender"
      description="Both panels share queryKey ['02-tracked'] (shared cache). useQuery automatically subscribes the component to tracked values it reads. Panel A tracks only data. Panel B tracks data + isFetching, so any change in tracked values rerenders the component, even when isFetching is not rendered in UI."
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={IS_FETCHING_QUERY_KEY}
          title="Panel A (data only subscription)"
          description={
            <pre className="query-tools-code-block">{`queryKey: ['02-tracked']
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
