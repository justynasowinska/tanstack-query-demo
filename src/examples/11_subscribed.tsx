import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const SUBSCRIBED_FOCUS_QUERY_KEY = ['11-subscribed']

type PanelQueryContentProps = {
  queryKey: string[]
}

type PanelWithSubscribedProps = PanelQueryContentProps & {
  isSubscribed: boolean
}

function PanelWithSubscribedToggle({
  queryKey,
  isSubscribed,
}: PanelWithSubscribedProps) {
  const { data, isFetching } = useQuery({
    ...userProfileOptions({ queryKey }),
    subscribed: isSubscribed,
  })
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName}</p>
        <p>changingValue: {data?.changingValue ?? '(no data)'}</p>
        <p>isFetching: {String(isFetching)}</p>
      </div>
    </div>
  )
}

function PanelAWithLocalSubscribedToggle({ queryKey }: PanelQueryContentProps) {
  const [isSubscribed, setIsSubscribed] = useState(true)

  return (
    <QueryToolsWrapper
      queryKey={queryKey}
      title="Panel A"
      localControls={
        <label className="panel-inline-toggle">
          <input
            type="checkbox"
            checked={isSubscribed}
            onChange={(event) => setIsSubscribed(event.target.checked)}
          />
          subscribed
        </label>
      }
      description={
        <pre className="query-tools-code-block">{`const [isSubscribed, setIsSubscribed] = useState(true)

const { data, isFetching } = useQuery({
  ...userProfileOptions({ queryKey }),
  subscribed: isSubscribed,
})`}</pre>
      }
    >
      <PanelWithSubscribedToggle queryKey={queryKey} isSubscribed={isSubscribed} />
    </QueryToolsWrapper>
  )
}

function PanelBWithLocalSubscribedToggle({ queryKey }: PanelQueryContentProps) {
  const [isSubscribed, setIsSubscribed] = useState(true)

  return (
    <QueryToolsWrapper
      queryKey={queryKey}
      title="Panel B"
      localControls={
        <label className="panel-inline-toggle">
          <input
            type="checkbox"
            checked={isSubscribed}
            onChange={(event) => setIsSubscribed(event.target.checked)}
          />
          subscribed
        </label>
      }
      description={
        <pre className="query-tools-code-block">{`const [isSubscribed, setIsSubscribed] = useState(true)

const { data, isFetching } = useQuery({
  ...userProfileOptions({ queryKey }),
  subscribed: isSubscribed,
})`}</pre>
      }
    >
      <PanelWithSubscribedToggle queryKey={queryKey} isSubscribed={isSubscribed} />
    </QueryToolsWrapper>
  )
}

export function SubscribedFocusExample() {
  return (
    <AccordionSection
      id="11_subscribed-focus"
      title="11 Subscribed"
      description={
        <>
          When subscribed is false, that component stops observing the cache and
          also stops automatic fetch behavior for itself (for example on remount).
          You can still trigger a manual refetch, but this specific component will
          not receive fresh data while it stays unsubscribed. subscribed also
          affects whether the query has active observers: if all observers have
          subscribed: false, the query becomes Inactive and its cache can
          eventually be removed after gcTime expires.
          <br />
          <br />
          <a
            href="https://tanstack.com/query/latest/docs/framework/react/reference/useQuery"
            target="_blank"
            rel="noreferrer"
          >
            Read more in docs
          </a>
          .
        </>
      }
    >
      <PanelsRow>
        <PanelAWithLocalSubscribedToggle queryKey={SUBSCRIBED_FOCUS_QUERY_KEY} />
        <PanelBWithLocalSubscribedToggle queryKey={SUBSCRIBED_FOCUS_QUERY_KEY} />
      </PanelsRow>
    </AccordionSection>
  )
}
