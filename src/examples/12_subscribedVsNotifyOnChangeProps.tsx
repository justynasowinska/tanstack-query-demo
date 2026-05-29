import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const SUBSCRIBED_GC_QUERY_KEY = ['12-sub-panel-a']
const NOTIFY_GC_QUERY_KEY = ['12-notify-panel-b']

type PanelQueryContentProps = {
  queryKey: string[]
}

type NotifyMode = 'tracked' | 'all' | 'data-and-isFetching' | 'data' | 'isFetching' | 'none'

type NotifyOption = {
  value: NotifyMode
  label: string
}

const NOTIFY_OPTIONS: NotifyOption[] = [
  { value: 'tracked', label: 'tracked (default / undefined)' },
  { value: 'all', label: 'all' },
  { value: 'data-and-isFetching', label: "['data', 'isFetching']" },
  { value: 'data', label: "['data']" },
  { value: 'isFetching', label: "['isFetching']" },
  { value: 'none', label: '[] (notify nothing)' },
]

function resolveNotifyOnChangeProps(
  mode: NotifyMode
): 'all' | undefined | Array<'data' | 'isFetching'> {
  switch (mode) {
    case 'all':
      return 'all'
    case 'data-and-isFetching':
      return ['data', 'isFetching']
    case 'data':
      return ['data']
    case 'isFetching':
      return ['isFetching']
    case 'none':
      return []
    case 'tracked':
    default:
      return undefined
  }
}

type SubscribedPanelContentProps = PanelQueryContentProps & {
  isSubscribed: boolean
}

function SubscribedPanelContent({ queryKey, isSubscribed }: SubscribedPanelContentProps) {
  const { data, isFetching } = useQuery({
    ...userProfileOptions({ queryKey }),
    subscribed: isSubscribed,
    gcTime: 3000,
  })
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName ?? '(no data)'}</p>
        <p>changingValue: {data?.changingValue ?? '(no data)'}</p>
        <p>isFetching: {String(isFetching)}</p>
      </div>
    </div>
  )
}

type NotifyPanelContentProps = PanelQueryContentProps & {
  notifyMode: NotifyMode
}

function NotifyPanelContent({ queryKey, notifyMode }: NotifyPanelContentProps) {
  const { data, isFetching } = useQuery({
    ...userProfileOptions({ queryKey }),
    notifyOnChangeProps: resolveNotifyOnChangeProps(notifyMode),
    gcTime: 3000,
  })
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName ?? '(no data)'}</p>
        <p>changingValue: {data?.changingValue ?? '(no data)'}</p>
        <p>isFetching: {String(isFetching)}</p>
      </div>
    </div>
  )
}

function PanelWithSubscribedToggle({ queryKey }: PanelQueryContentProps) {
  const [isSubscribed, setIsSubscribed] = useState(true)

  return (
    <QueryToolsWrapper
      queryKey={queryKey}
      title="Panel A (subscribed + gcTime: 3000)"
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
        <pre className="query-tools-code-block">{`const { data, isFetching } = useQuery({
  ...userProfileOptions({ queryKey }),
  subscribed,
  gcTime: 3000,
})`}</pre>
      }
    >
      <SubscribedPanelContent queryKey={queryKey} isSubscribed={isSubscribed} />
    </QueryToolsWrapper>
  )
}

function PanelWithNotifyOnChangePropsDropdown({ queryKey }: PanelQueryContentProps) {
  const [notifyMode, setNotifyMode] = useState<NotifyMode>('none')

  return (
    <QueryToolsWrapper
      queryKey={queryKey}
      title="Panel B (notifyOnChangeProps + gcTime: 3000)"
      localControls={
        <label className="panel-inline-toggle">
          notifyOnChangeProps
          <select
            value={notifyMode}
            onChange={(event) => setNotifyMode(event.target.value as NotifyMode)}
          >
            {NOTIFY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      }
      description={
        <pre className="query-tools-code-block">{`const { data, isFetching } = useQuery({
  ...userProfileOptions({ queryKey }),
  notifyOnChangeProps,
  gcTime: 3000,
})`}</pre>
      }
    >
      <NotifyPanelContent queryKey={queryKey} notifyMode={notifyMode} />
    </QueryToolsWrapper>
  )
}

export function SubscribedVsNotifyOnChangePropsExample() {
  return (
    <AccordionSection
      id="12_subscribed-vs-notify-on-change-props"
      title="12 Subscribed vs notifyOnChangeProps"
      description={
        <>
          With <strong>notifyOnChangeProps: []</strong> you can get an effect similar to{' '}
          <strong>subscribed: false</strong>: the component stops receiving cache updates. The important
          difference is observer lifecycle. With <strong>subscribed: false</strong>, the component is removed
          from query observers. If no observers remain, that cache entry can be removed after{' '}
          <strong>gcTime</strong>. With <strong>notifyOnChangeProps: []</strong>, the component still stays on
          the observer list, the query remains <strong>active</strong>, and it will not be garbage-collected
          after <strong>gcTime</strong>.
        </>
      }
    >
      <PanelsRow>
        <PanelWithSubscribedToggle queryKey={SUBSCRIBED_GC_QUERY_KEY} />
        <PanelWithNotifyOnChangePropsDropdown queryKey={NOTIFY_GC_QUERY_KEY} />
      </PanelsRow>
    </AccordionSection>
  )
}
