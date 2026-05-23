import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const SELECTOR_QUERY_KEY = ['03-selector-limits-rerenders']

type PanelQueryContentProps = {
  queryKey: string[]
}

function PanelWithoutSelector({ queryKey }: PanelQueryContentProps) {
  const { data } = useQuery(userProfileQueryOptions({ queryKey }))

  return (
    <div className="query-state-panel-wrapper">
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

  return (
    <div className="query-state-panel-wrapper">
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
      description="Both panels share queryKey ['03-selector-limits-rerenders']. Left subscribes to full data object via const { data } = useQuery(...), so it rerenders on each fetch because random changingValue updates the object. Right uses select to subscribe only to firstName, so it avoids rerenders when firstName stays the same."
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={SELECTOR_QUERY_KEY}
          title="Panel A (without select)"
          description={
            <pre className="query-tools-code-block">{`queryKey: ['03-selector-limits-rerenders']
const { data } = useQuery(...)`}</pre>
          }
        >
          <PanelWithoutSelector queryKey={SELECTOR_QUERY_KEY} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={SELECTOR_QUERY_KEY}
          title="Panel B (with select)"
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
