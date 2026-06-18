import { useQuery } from '@tanstack/react-query'
import type { DemoUser } from '../api/mockApi'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const ENABLED_FALSE_QUERY_KEY = ['08-enabled-false']
const ENABLED_TRUE_DEFAULT_QUERY_KEY = ['08-enabled-true']

type PanelProps = {
  data: DemoUser | undefined
}

function PanelEnabledFalse({ data }: PanelProps) {
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

function PanelEnabledTrueDefault({ data }: PanelProps) {
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
  const { data: dataFalse, refetch } = useQuery({
    ...userProfileOptions({ queryKey: ENABLED_FALSE_QUERY_KEY }),
    enabled: false,
  })

  const { data: dataTrue } = useQuery({
    ...userProfileOptions({ queryKey: ENABLED_TRUE_DEFAULT_QUERY_KEY }),
    enabled: true,
  })

  return (
    <AccordionSection
      id="08_enabled"
      title="08 Enabled"
      description={
        <>
          Enabled controls <strong>automatic query execution</strong>. The main purpose
          of enabled is running queries that depend on other data (for example
          userId coming from another query), or running lazy queries (for example
          after setting a filter). If a query has enabled: false, you can still run{' '}
          <strong>manual refetch</strong>. Observe isFetching, isPending, and
          isLoading statuses in the panels, especially when query uses
          enabled: false. Try running Invalidate in DevTools on both queries -
          a disabled query is always treated as <strong>Fresh</strong>, and it
          will not refetch even after being invalidated.
          <br />
          <br />
          <a
            href="https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries"
            target="_blank"
            rel="noreferrer"
          >
            Read more in docs
          </a>
          .
        </>
      }
    >
      <details className="basic-query-guide">
        <summary className="basic-query-guide-summary">Important information about disabled queries</summary>

        <div className="basic-query-guide-content">
          <p>
            <strong>enabled: false is not a query validation mechanism.</strong>
             {' '}It only prevents automatic fetch execution.
          </p>

          <p>
            You can still trigger refetch manually, so there is still a risk that
            fetch will run without required data (for example missing userId).
          </p>

          <pre className="query-tools-code-block">{`const { refetch } = useQuery({
  ...userProfileOptions(userId),
  enabled: !!userId,
})

const onRefetchData = () => {
  refetch() // will refetch even when enabled is false
}`}</pre>
        </div>
      </details>

      <PanelsRow>
        <QueryToolsWrapper
          queryKey={ENABLED_FALSE_QUERY_KEY}
          title="Panel A (enabled: false)"
          onRefetch={refetch}
          description={
            <pre className="query-tools-code-block">{`const {
  data,
} = useQuery({
  ...userProfileOptions({ queryKey }),
  enabled: false,
})`}</pre>
          }
        >
          <PanelEnabledFalse data={dataFalse} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={ENABLED_TRUE_DEFAULT_QUERY_KEY}
          title="Panel B (enabled: true default)"
          description={
            <pre className="query-tools-code-block">{`const {
  data,
} = useQuery({
  ...userProfileOptions({ queryKey }),
  enabled: true, // default
})`}</pre>
          }
        >
          <PanelEnabledTrueDefault data={dataTrue} />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}