import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const ENABLED_FALSE_QUERY_KEY = ['07-en-off']
const ENABLED_TRUE_DEFAULT_QUERY_KEY = ['07-en-on']

type PanelQueryContentProps = {
  queryKey: string[]
}

function PanelEnabledFalse({ queryKey }: PanelQueryContentProps) {
  const { data } = useQuery({
    ...userProfileQueryOptions({ queryKey }),
    enabled: false,
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

function PanelEnabledTrueDefault({ queryKey }: PanelQueryContentProps) {
  const { data } = useQuery({
    ...userProfileQueryOptions({ queryKey }),
    enabled: true,
  })
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName ?? '(loading...)'}</p>
      </div>
    </div>
  )
}

export function EnabledExample() {
  const queryClient = useQueryClient()

  const handleEnabledFalseRefetch = () => {
    void queryClient.fetchQuery(
      userProfileQueryOptions({
        queryKey: ENABLED_FALSE_QUERY_KEY,
      })
    )
  }

  return (
    <AccordionSection
      id="07_enabled"
      title="07 Enabled"
      description="Two panels compare enabled: false vs enabled: true (default). Use remount to show how each query behaves when the component mounts again. In Panel A, Refetch uses queryClient.fetchQuery because refetchQueries does not trigger disabled-only queries."
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={ENABLED_FALSE_QUERY_KEY}
          title="Panel A (enabled: false)"
          onRefetch={handleEnabledFalseRefetch}
          description={
            <pre className="query-tools-code-block">{`useQuery({
  ...userProfileQueryOptions({ queryKey }),
  enabled: false,
})`}</pre>
          }
        >
          <PanelEnabledFalse queryKey={ENABLED_FALSE_QUERY_KEY} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={ENABLED_TRUE_DEFAULT_QUERY_KEY}
          title="Panel B (enabled: true default)"
          description={
            <pre className="query-tools-code-block">{`useQuery({
  ...userProfileQueryOptions({ queryKey }),
  enabled: true, // default
})`}</pre>
          }
        >
          <PanelEnabledTrueDefault queryKey={ENABLED_TRUE_DEFAULT_QUERY_KEY} />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}