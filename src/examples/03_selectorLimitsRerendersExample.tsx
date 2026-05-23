import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const SELECTOR_QUERY_KEY = ['03-selector-limits-rerenders']

type PanelQueryContentProps = {
  queryKey: string[]
}

function PanelWithoutSelector({ queryKey }: PanelQueryContentProps) {
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

function PanelWithSelector({ queryKey }: PanelQueryContentProps) {
  const { data: firstName } = useQuery({
    ...userProfileQueryOptions({ queryKey }),
    select: (data) => data.firstName,
  })
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {firstName}</p>
      </div>
    </div>
  )
}

export function SelectorLimitsRerendersExample() {
  return (
    <AccordionSection
      id="03_selector-limits-rerenders"
      title="03 Selector Limits Rerenders"
      description="Both panels share queryKey ['03-selector-limits-rerenders'] and the same cache entry. Panel A subscribes to the full query data object via const { data } = useQuery(...), so data updates (including changingValue) can trigger rerenders. Panel B uses select to subscribe to firstName only, so data-driven rerenders are limited when firstName remains unchanged."
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={SELECTOR_QUERY_KEY}
          title="Panel A (full data subscription)"
          description={
            <pre className="query-tools-code-block">{`queryKey: ['03-selector-limits-rerenders']
const { data } = useQuery(...)`}</pre>
          }
        >
          <PanelWithoutSelector queryKey={SELECTOR_QUERY_KEY} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={SELECTOR_QUERY_KEY}
          title="Panel B (selected firstName)"
          description={
            <pre className="query-tools-code-block">{`const { data: firstName } = useQuery({
  ...userProfileQueryOptions({ queryKey }),
  select: (data) => data.firstName,
})`}</pre>
          }
        >
          <PanelWithSelector queryKey={SELECTOR_QUERY_KEY} />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}
