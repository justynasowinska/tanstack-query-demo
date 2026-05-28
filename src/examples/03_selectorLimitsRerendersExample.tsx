import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const SELECTOR_QUERY_KEY = ['05-select']

type PanelQueryContentProps = {
  queryKey: string[]
}

function PanelWithoutSelector({ queryKey }: PanelQueryContentProps) {
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

function PanelWithSelector({ queryKey }: PanelQueryContentProps) {
  const { data: firstName } = useQuery({
    ...userProfileOptions({ queryKey }),
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
      id="05_selector-limits-rerenders"
      title="05 Selector Limits Rerenders"
      description="Panel A subscribes to the full query data object via const { data } = useQuery(...), so data updates (including changingValue) can trigger rerenders. Panel B uses select to subscribe to firstName only, so data-driven rerenders are limited when firstName remains unchanged."
    >
      <details className="basic-query-guide">
        <summary className="basic-query-guide-summary">Important information about selectors</summary>

        <div className="basic-query-guide-content">
          <p>
            Selector function is executed <strong>every time</strong> when the
            query runs. Because of that, large selectors with heavy mapping can add
            unnecessary work on top of the fetch itself.
          </p>

          <p>
            It is usually better to keep selectors small and focused only on the
            exact fragment that the component really needs.
          </p>

          <p>
            A better practice is to extract selector to a separate function. Then
            the function reference stays stable instead of being created again on
            every run.
          </p>

          <pre className="query-tools-code-block">{`function selectFirstName(data: DemoUser) {
  return data.firstName
}

const { data: firstName } = useQuery({
  ...userProfileOptions({ queryKey: ['05-select'] }),
  select: selectFirstName,
})`}</pre>

          <p>
            A selector is an extra function that runs every time the query runs, so
            it is not always worth using. Selectors are useful when API objects are
            very large, when some API values change frequently but are not used in
            the component UI (like changingValue in this example), or when you
            always need a specific data mapping. It is better not to apply selectors
            automatically to every query.
          </p>
        </div>
      </details>

      <PanelsRow>
        <QueryToolsWrapper
          queryKey={SELECTOR_QUERY_KEY}
          title="Panel A (full data subscription)"
          description={
            <pre className="query-tools-code-block">{`queryKey: ['05-select']
const { data } = useQuery(...)`}</pre>
          }
        >
          <PanelWithoutSelector queryKey={SELECTOR_QUERY_KEY} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={SELECTOR_QUERY_KEY}
          title="Panel B (selected firstName)"
          description={
            <pre className="query-tools-code-block">{`queryKey: ['05-select']
const { data: firstName } = useQuery({
  ...userProfileOptions({ queryKey }),
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
