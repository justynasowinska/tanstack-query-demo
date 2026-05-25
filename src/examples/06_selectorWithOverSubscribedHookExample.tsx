import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const SELECTOR_HOOK_COMPARISON_QUERY_KEY = ['06-hook-select']

type PanelQueryContentProps = {
  queryKey: string[]
}

function useFirstNameWithOverSubscribedHook(queryKey: string[]) {
  const { data: firstName, isFetching } = useQuery({
    ...userProfileQueryOptions({ queryKey }),
    select: (data) => data.firstName,
  })

  return {
    firstName,
    isFetching,
  }
}

function PanelWithOverSubscribedHook({ queryKey }: PanelQueryContentProps) {
  const { firstName } = useFirstNameWithOverSubscribedHook(queryKey)
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

function PanelWithProperQuery({ queryKey }: PanelQueryContentProps) {
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

export function SelectorWithOverSubscribedHookExample() {
  return (
    <AccordionSection
      id="06_selector-with-over-subscribed-hook"
      title="06 Selector With Over-Subscribed Hook"
      description="Both panels use select to read only firstName. Panel A still rerenders on isFetching transitions because the custom hook subscribes to isFetching and returns it even when the component reads only firstName. Panel B uses useQuery directly with the same selector and avoids that unnecessary subscription."
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={SELECTOR_HOOK_COMPARISON_QUERY_KEY}
          title="Panel A (selector + over-subscribed hook)"
          description={
            <pre className="query-tools-code-block">{`function useFirstNameWithOverSubscribedHook(queryKey) {
  const { data: firstName, isFetching } = useQuery({
    ...userProfileQueryOptions({ queryKey }),
    select: (data) => data.firstName,
  })
  return { firstName, isFetching }
}

const { firstName } = useFirstNameWithOverSubscribedHook(queryKey)`}</pre>
          }
        >
          <PanelWithOverSubscribedHook queryKey={SELECTOR_HOOK_COMPARISON_QUERY_KEY} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={SELECTOR_HOOK_COMPARISON_QUERY_KEY}
          title="Panel B (selector + direct useQuery)"
          description={
            <pre className="query-tools-code-block">{`const { data: firstName } = useQuery({
  ...userProfileQueryOptions({ queryKey }),
  select: (data) => data.firstName,
})`}</pre>
          }
        >
          <PanelWithProperQuery queryKey={SELECTOR_HOOK_COMPARISON_QUERY_KEY} />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}
