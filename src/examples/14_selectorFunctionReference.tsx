import { useQuery } from '@tanstack/react-query'
import { useCallback, useSyncExternalStore } from 'react'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const INLINE_SELECTOR_QUERY_KEY = ['14-selector-inline']
const STABLE_SELECTOR_QUERY_KEY = ['14-selector-stable']

type DemoUserLike = {
  firstName: string
}

type TransformedUser = {
  firstName: string
}

type PanelQueryContentProps = {
  queryKey: string[]
}

let inlineSelectorTransformDataCalls = 0
let stableSelectorTransformDataCalls = 0
const inlineSelectorCallsSubscribers = new Set<() => void>()
const stableSelectorCallsSubscribers = new Set<() => void>()

function subscribeInlineSelectorCalls(onStoreChange: () => void) {
  inlineSelectorCallsSubscribers.add(onStoreChange)

  return () => {
    inlineSelectorCallsSubscribers.delete(onStoreChange)
  }
}

function subscribeStableSelectorCalls(onStoreChange: () => void) {
  stableSelectorCallsSubscribers.add(onStoreChange)

  return () => {
    stableSelectorCallsSubscribers.delete(onStoreChange)
  }
}

function getInlineSelectorCalls() {
  return inlineSelectorTransformDataCalls
}

function getStableSelectorCalls() {
  return stableSelectorTransformDataCalls
}

function incrementInlineSelectorCalls() {
  inlineSelectorTransformDataCalls += 1
  inlineSelectorCallsSubscribers.forEach((notify) => notify())
}

function incrementStableSelectorCalls() {
  stableSelectorTransformDataCalls += 1
  stableSelectorCallsSubscribers.forEach((notify) => notify())
}

function resetInlineSelectorCalls() {
  inlineSelectorTransformDataCalls = 0
  inlineSelectorCallsSubscribers.forEach((notify) => notify())
}

function resetStableSelectorCalls() {
  stableSelectorTransformDataCalls = 0
  stableSelectorCallsSubscribers.forEach((notify) => notify())
}

type TransformDataCallsInfoProps = {
  subscribe: (onStoreChange: () => void) => () => void
  getSnapshot: () => number
  onReset: () => void
}

function TransformDataCallsInfo({
  subscribe,
  getSnapshot,
  onReset,
}: TransformDataCallsInfoProps) {
  const callsCount = useSyncExternalStore(subscribe, getSnapshot)

  return (
    <p>
      transformData calls: {callsCount}{' '}
      <button type="button" onClick={onReset}>
        Reset
      </button>
    </p>
  )
}

function InlineSelectorPanel({ queryKey }: PanelQueryContentProps) {
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  const transformData = useCallback((data: DemoUserLike): TransformedUser => {
    incrementInlineSelectorCalls()

    return {
      firstName: data.firstName.toUpperCase(),
    }
  }, [])

  const { data } = useQuery({
    ...userProfileOptions({ queryKey }),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: (incomingData) => transformData(incomingData),
  })

  return (
    <>
      <TransformDataCallsInfo
        subscribe={subscribeInlineSelectorCalls}
        getSnapshot={getInlineSelectorCalls}
        onReset={resetInlineSelectorCalls}
      />

      <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
        <span className="query-state-panel-label">Rendered component</span>
        <div className="query-state-panel">
          <p>First Name: {data?.firstName ?? '(no data)'}</p>
        </div>
      </div>
    </>
  )
}

function StableSelectorPanel({ queryKey }: PanelQueryContentProps) {
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  const transformData = useCallback((data: DemoUserLike): TransformedUser => {
    incrementStableSelectorCalls()

    return {
      firstName: data.firstName.toUpperCase(),
    }
  }, [])

  const { data } = useQuery({
    ...userProfileOptions({ queryKey }),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: transformData,
  })

  return (
    <>
      <TransformDataCallsInfo
        subscribe={subscribeStableSelectorCalls}
        getSnapshot={getStableSelectorCalls}
        onReset={resetStableSelectorCalls}
      />

      <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
        <span className="query-state-panel-label">Rendered component</span>
        <div className="query-state-panel">
          <p>First Name: {data?.firstName ?? '(no data)'}</p>
        </div>
      </div>
    </>
  )
}

export function SelectorFunctionReferenceExample() {
  return (
    <AccordionSection
      id="14_selector-function-reference"
      title="14 Selector Function Reference"
      description={
        <>
          Panel A passes a new select wrapper on each render:{' '}
          <strong>select: (data) =&gt; transformData(data)</strong>. Panel B passes a stable
          function reference: <strong>select: transformData</strong>. Remount each component and compare{' '}
          <strong>transformData calls</strong> shown above each rendered panel. Disable{' '}
          <strong>Use Math.random()</strong> in the Mocked API panel above to get stable return
          values and better observe selector behavior.
        </>
      }
    >
      <PanelsRow>
        <QueryToolsWrapper
          queryKey={INLINE_SELECTOR_QUERY_KEY}
          title="Panel A (new wrapper each render)"
          description={
            <pre className="query-tools-code-block">{`const transformData = (data) => ({
  firstName: data.firstName.toUpperCase(),
})

const { data } = useQuery({
  ...userProfileOptions({ queryKey }),
  select: (data) => transformData(data),
})`}</pre>
          }
        >
          <InlineSelectorPanel queryKey={INLINE_SELECTOR_QUERY_KEY} />
        </QueryToolsWrapper>

        <QueryToolsWrapper
          queryKey={STABLE_SELECTOR_QUERY_KEY}
          title="Panel B (stable function reference)"
          description={
            <pre className="query-tools-code-block">{`const transformData = (data) => ({
  firstName: data.firstName.toUpperCase(),
})

const { data } = useQuery({
  ...userProfileOptions({ queryKey }),
  select: transformData,
})`}</pre>
          }
        >
          <StableSelectorPanel queryKey={STABLE_SELECTOR_QUERY_KEY} />
        </QueryToolsWrapper>
      </PanelsRow>
    </AccordionSection>
  )
}
