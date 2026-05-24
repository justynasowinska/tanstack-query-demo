import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const HOOK_OVER_SUBSCRIPTION_QUERY_KEY = ['05-hook-over-subscription-rerender']

type PanelQueryContentProps = {
  queryKey: string[]
}

function useUserProfileWithStatus(queryKey: string[]) {
  const { data, isFetching } = useQuery(userProfileQueryOptions({ queryKey }))

  return {
    data,
    isFetching,
  }
}

function PanelDataOnlyFromHook({ queryKey }: PanelQueryContentProps) {
  const { data } = useUserProfileWithStatus(queryKey)

  return (
    <div className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName}</p>
      </div>
    </div>
  )
}

function PanelDataAndIsFetchingFromHook({ queryKey }: PanelQueryContentProps) {
  const { data, isFetching } = useUserProfileWithStatus(queryKey)

  return (
    <div className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName}</p>
        <p>isFetching: {String(isFetching)}</p>
      </div>
    </div>
  )
}

export function HookOverSubscriptionRerenderExample() {
  return (
    <AccordionSection
      id="05_hook-over-subscription-rerender"
      title="05 Hook Over-Subscription Rerender"
      description="Both panels call the same custom API hook that already subscribes to data + isFetching and returns { data, isFetching }. Because the subscription happens inside the hook, both panels rerender on isFetching transitions, even when the left panel reads only data from that returned object."
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={HOOK_OVER_SUBSCRIPTION_QUERY_KEY}
          title="Panel A (hook call reads only data)"
          description={
            <pre className="query-tools-code-block">{`function useUserProfileWithStatus(queryKey) {
  const { data, isFetching } = useQuery(...)
  return { data, isFetching }
}

const { data } = useUserProfileWithStatus(queryKey)`}</pre>
          }
        >
          <PanelDataOnlyFromHook queryKey={HOOK_OVER_SUBSCRIPTION_QUERY_KEY} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={HOOK_OVER_SUBSCRIPTION_QUERY_KEY}
          title="Panel B (hook call reads data + isFetching)"
          description={
            <pre className="query-tools-code-block">{`function useUserProfileWithStatus(queryKey) {
  const { data, isFetching } = useQuery(...)
  return { data, isFetching }
}

const { data, isFetching } = useUserProfileWithStatus(queryKey)`}</pre>
          }
        >
          <PanelDataAndIsFetchingFromHook queryKey={HOOK_OVER_SUBSCRIPTION_QUERY_KEY} />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}
