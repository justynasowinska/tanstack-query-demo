import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const SHARED_QUERY_KEY = ['04-shared']

type PanelQueryContentProps = {
  queryKey: string[]
}

function PanelAQueryContent({ queryKey }: PanelQueryContentProps) {
  const { data } = useQuery(userProfileOptions({ queryKey }))
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Panel A rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName}</p>
      </div>
    </div>
  )
}

function PanelBQueryContent({ queryKey }: PanelQueryContentProps) {
  const { data } = useQuery(userProfileOptions({ queryKey }))
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Panel B rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName}</p>
        <p>changingValue: {data?.changingValue}</p>
      </div>
    </div>
  )
}

export function SharedCacheBetweenComponentsExample() {
  return (
    <AccordionSection
      id="04_shared-cache-between-components"
      title="04 Full Data Subscription"
      description={
        "With const { data } = useQuery(...), the component subscribes to the whole data object, even if it does not need all fields. That can cause unnecessary rerenders: Panel A renders only firstName, but it still rerenders on every fetch because API returns changingValue inside data and that field changes all the time, even though Panel A does not use it in UI."
      }
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={SHARED_QUERY_KEY}
          title="Panel A (uses only firstName)"
          description={
            <pre className="query-tools-code-block">{`queryKey: ['04-shared']
const { data } = useQuery(...)`}</pre>
          }
        >
          <PanelAQueryContent queryKey={SHARED_QUERY_KEY} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={SHARED_QUERY_KEY}
          title="Panel B (shows changingValue too)"
          description={
            <pre className="query-tools-code-block">{`queryKey: ['04-shared']
const { data } = useQuery(...)`}</pre>
          }
        >
          <PanelBQueryContent queryKey={SHARED_QUERY_KEY} />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}
