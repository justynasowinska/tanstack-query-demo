import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const SHARED_NOTIFY_QUERY_KEY = ['10-notify']

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

type NotifyPanelWithTrackedValuesProps = PanelQueryContentProps & {
  notifyMode: NotifyMode
}

function PanelWithTrackedDataAndFetching({
  queryKey,
  notifyMode,
}: NotifyPanelWithTrackedValuesProps) {
  const { data, isFetching } = useQuery({
    ...userProfileQueryOptions({ queryKey }),
    notifyOnChangeProps: resolveNotifyOnChangeProps(notifyMode),
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

function PanelWithTrackedDataOnly({ queryKey, notifyMode }: NotifyPanelWithTrackedValuesProps) {
  const { data } = useQuery({
    ...userProfileQueryOptions({ queryKey }),
    notifyOnChangeProps: resolveNotifyOnChangeProps(notifyMode),
  })
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName ?? '(no data)'}</p>
        <p>changingValue: {data?.changingValue ?? '(no data)'}</p>
        <p>isFetching: not tracked in this component</p>
      </div>
    </div>
  )
}

function PanelWithTrackedDataAndFetchingControls({ queryKey }: PanelQueryContentProps) {
  const [notifyMode, setNotifyMode] = useState<NotifyMode>('tracked')

  return (
    <QueryToolsWrapper
      queryKey={queryKey}
      title="Panel A ({ data, isFetching } tracked)"
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
  ...userProfileQueryOptions({ queryKey }),
  notifyOnChangeProps,
})`}</pre>
      }
    >
      <PanelWithTrackedDataAndFetching queryKey={queryKey} notifyMode={notifyMode} />
    </QueryToolsWrapper>
  )
}

function PanelWithTrackedDataOnlyControls({ queryKey }: PanelQueryContentProps) {
  const [notifyMode, setNotifyMode] = useState<NotifyMode>('tracked')

  return (
    <QueryToolsWrapper
      queryKey={queryKey}
      title="Panel B ({ data } only tracked)"
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
        <pre className="query-tools-code-block">{`const { data } = useQuery({
  ...userProfileQueryOptions({ queryKey }),
  notifyOnChangeProps,
})`}</pre>
      }
    >
      <PanelWithTrackedDataOnly queryKey={queryKey} notifyMode={notifyMode} />
    </QueryToolsWrapper>
  )
}

export function NotifyOnChangePropsTrackedValuesExample() {
  return (
    <AccordionSection
      id="10_notify-on-change-props-tracked-values"
      title="10 notifyOnChangeProps (tracked values)"
      description="Both panels share the same queryKey (shared cache) and each panel configures notifyOnChangeProps separately. Panel A reads { data, isFetching }, while Panel B reads only { data }. With tracked mode, rerenders depend on which fields are actually used by each component."
    >
      <PanelsRow>
        <PanelWithTrackedDataAndFetchingControls queryKey={SHARED_NOTIFY_QUERY_KEY} />
        <PanelWithTrackedDataOnlyControls queryKey={SHARED_NOTIFY_QUERY_KEY} />
      </PanelsRow>
    </AccordionSection>
  )
}
