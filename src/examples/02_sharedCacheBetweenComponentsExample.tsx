import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const SHARED_QUERY_KEY = ['02-shared-cache']

type PanelQueryContentProps = {
  queryKey: string[]
}

function PanelAQueryContent({ queryKey }: PanelQueryContentProps) {
  const { data } = useQuery(userProfileQueryOptions({ queryKey }))

  return (
    <div className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Panel A rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName}</p>
      </div>
    </div>
  )
}

function PanelBQueryContent({ queryKey }: PanelQueryContentProps) {
  const { data } = useQuery(userProfileQueryOptions({ queryKey }))

  return (
    <div className="query-state-panel-wrapper">
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
      id="02_shared-cache-between-components"
      title="02 Shared Cache Between Components"
      description={
        "Both panels use queryKey ['02-shared-cache']; refetch/remount in one updates shared cache and rerenders both because they subscribe to the data object, which changes on every fetch due to random changingValue, even when Panel A renders only firstName."
      }
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={SHARED_QUERY_KEY}
          title="Panel A"
          description={
            <>
              <span>queryKey: ['02-shared-cache']</span>
              <br />
              <span>const {'{ data }'} = useQuery(...)</span>
            </>
          }
        >
          <PanelAQueryContent queryKey={SHARED_QUERY_KEY} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={SHARED_QUERY_KEY}
          title="Panel B"
          description={
            <>
              <span>queryKey: ['02-shared-cache']</span>
              <br />
              <span>const {'{ data }'} = useQuery(...)</span>
            </>
          }
        >
          <PanelBQueryContent queryKey={SHARED_QUERY_KEY} />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}
