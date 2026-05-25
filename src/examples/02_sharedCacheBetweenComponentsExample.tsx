import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const SHARED_QUERY_KEY = ['04-shared']

type PanelQueryContentProps = {
  queryKey: string[]
}

function PanelAQueryContent({ queryKey }: PanelQueryContentProps) {
  const { data } = useQuery(userProfileQueryOptions({ queryKey }))
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
  const { data } = useQuery(userProfileQueryOptions({ queryKey }))
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
      title="04 Shared Cache Between Components"
      description={
        "Both panels use queryKey ['04-shared']; refetch/remount in one updates shared cache and rerenders both because they subscribe to the data object, which changes on every fetch due to random changingValue, even when Panel A renders only firstName."
      }
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={SHARED_QUERY_KEY}
          title="Panel A"
          description={
            <pre className="query-tools-code-block">{`queryKey: ['04-shared']
const { data } = useQuery(...)`}</pre>
          }
        >
          <PanelAQueryContent queryKey={SHARED_QUERY_KEY} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={SHARED_QUERY_KEY}
          title="Panel B"
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
