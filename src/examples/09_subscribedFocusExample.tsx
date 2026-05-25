import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const SUBSCRIBED_FOCUS_QUERY_KEY = ['09-sub']

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
    ...userProfileQueryOptions({ queryKey }),
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
      title="Panel A (subscribed controlled by toggle)"
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
  ...userProfileQueryOptions({ queryKey }),
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
      title="Panel B (subscribed controlled by toggle)"
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
  ...userProfileQueryOptions({ queryKey }),
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
      id="09_subscribed-focus"
      title="09 Subscribed On Focus"
      description="Both panels read data + isFetching from useQuery with the same queryKey. Each panel has its own subscribed toggle. When subscribed is false, that panel stops receiving updates for both isFetching and data (including changingValue)."
    >
      <PanelsRow>
        <PanelAWithLocalSubscribedToggle queryKey={SUBSCRIBED_FOCUS_QUERY_KEY} />
        <PanelBWithLocalSubscribedToggle queryKey={SUBSCRIBED_FOCUS_QUERY_KEY} />
      </PanelsRow>
    </AccordionSection>
  )
}
