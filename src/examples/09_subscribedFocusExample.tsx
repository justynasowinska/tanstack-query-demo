import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const SUBSCRIBED_FOCUS_QUERY_KEY = ['09-subscribed-focus']

type PanelQueryContentProps = {
  queryKey: string[]
}

type PanelWithSubscribedProps = PanelQueryContentProps & {
  isScreenFocused: boolean
}

function PanelWithSubscribedToggle({
  queryKey,
  isScreenFocused,
}: PanelWithSubscribedProps) {
  const { data, isFetching } = useQuery({
    ...userProfileQueryOptions({ queryKey }),
    subscribed: isScreenFocused,
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

function PanelDefaultSubscribed({ queryKey }: PanelQueryContentProps) {
  const { data, isFetching } = useQuery({
    ...userProfileQueryOptions({ queryKey }),
    subscribed: true,
  })
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName}</p>
        <p>changingValue: {data?.changingValue}</p>
        <p>isFetching: {String(isFetching)}</p>
      </div>
    </div>
  )
}

export function SubscribedFocusExample() {
  const [isScreenFocused, setIsScreenFocused] = useState(true)

  return (
    <AccordionSection
      id="09_subscribed-focus"
      title="09 Subscribed On Focus"
      description="Both panels read data + isFetching from useQuery with the same queryKey. Panel A toggles subscribed based on local focus state. When subscribed is false, it stops receiving updates for both isFetching and data (including changingValue). Panel B keeps default subscribed: true and keeps updating all the time."
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={SUBSCRIBED_FOCUS_QUERY_KEY}
          title="Panel A (subscribed controlled by focus toggle)"
          localControls={
            <label className="panel-inline-toggle">
              <input
                type="checkbox"
                checked={isScreenFocused}
                onChange={(event) => setIsScreenFocused(event.target.checked)}
              />
              Focused screen (subscribed)
            </label>
          }
          description={
            <pre className="query-tools-code-block">{`const [isScreenFocused, setIsScreenFocused] = useState(true)

const { data, isFetching } = useQuery({
  ...userProfileQueryOptions({ queryKey }),
  subscribed: isScreenFocused,
})`}</pre>
          }
        >
          <PanelWithSubscribedToggle
            queryKey={SUBSCRIBED_FOCUS_QUERY_KEY}
            isScreenFocused={isScreenFocused}
          />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={SUBSCRIBED_FOCUS_QUERY_KEY}
          title="Panel B (default subscribed: true)"
          description={
            <pre className="query-tools-code-block">{`const { data, isFetching } = useQuery({
  ...userProfileQueryOptions({ queryKey }),
  subscribed: true, // default
})`}</pre>
          }
        >
          <PanelDefaultSubscribed queryKey={SUBSCRIBED_FOCUS_QUERY_KEY} />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}
