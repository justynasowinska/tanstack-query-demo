import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const SELECTOR_WITH_FUNCTION = ['15-selector-with-function']

type DemoUserLike = {
  firstName?: string
}

type SelectDataResult = {
  getDataByName: (name: string) => string
}

function selectData(data: DemoUserLike): SelectDataResult {
  return {
    getDataByName: (name: string) => {
      if (!data.firstName) {
        return '(no data)'
      }

      return data.firstName === name ? data.firstName : '(filtered out)'
    },
  }
}

type PanelQueryContentProps = {
  queryKey: string[]
}

type FilteredPanelProps = PanelQueryContentProps & {
  expectedName: string
}

function ObjectSelectorPanel({ queryKey, expectedName }: FilteredPanelProps) {
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  const { data: selectResult } = useQuery({
    ...userProfileOptions({ queryKey }),
    select: selectData,
  })

  const result = selectResult?.getDataByName(expectedName) ?? '(no data)'

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>expectedName: {expectedName}</p>
        <p>Result: {result}</p>
      </div>
    </div>
  )
}

function CallbackSelectorPanel({ queryKey, expectedName }: FilteredPanelProps) {
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  const { data: result } = useQuery({
    ...userProfileOptions({ queryKey }),
    select: useCallback(
    (data: DemoUserLike): string => {
      if (!data.firstName) {
        return '(no data)'
      }

      return data.firstName === expectedName ? data.firstName : '(filtered out)'
    },
    [expectedName],
  ),
  })

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>expectedName: {expectedName}</p>
        <p>Result: {result ?? '(no data)'}</p>
      </div>
    </div>
  )
}

function ObjectSelectorPanelControls({ queryKey }: PanelQueryContentProps) {
  const [expectedName, setExpectedName] = useState('Demo')

  return (
    <QueryToolsWrapper
      queryKey={queryKey}
      title="Panel A (selector returns object with function)"
      localControls={
        <label className="panel-inline-toggle">
          expectedName
          <input
            type="text"
            value={expectedName}
            onChange={(event) => setExpectedName(event.target.value)}
          />
        </label>
      }
      description={
        <pre className="query-tools-code-block">{`function selectData(data) {
  return {
    getDataByName: (name) =>
      data.firstName === name
        ? data.firstName
        : '(filtered out)',
  }
}

const { data: selectResult } = useQuery({
  ...userProfileOptions({ queryKey }),
  select: selectData,
})

// called in component:
selectResult?.getDataByName(expectedName)`}</pre>
      }
    >
      <ObjectSelectorPanel queryKey={queryKey} expectedName={expectedName} />
    </QueryToolsWrapper>
  )
}

function CallbackSelectorPanelControls({ queryKey }: PanelQueryContentProps) {
  const [expectedName, setExpectedName] = useState('Demo')

  return (
    <QueryToolsWrapper
      queryKey={queryKey}
      title="Panel B (useCallback selector)"
      localControls={
        <label className="panel-inline-toggle">
          expectedName
          <input
            type="text"
            value={expectedName}
            onChange={(event) => setExpectedName(event.target.value)}
          />
        </label>
      }
      description={
        <pre className="query-tools-code-block">{`

const { data: result } = useQuery({
  ...userProfileOptions({ queryKey }),
  select: useCallback(
    (data) =>
      data.firstName === expectedName
        ? data.firstName
        : '(filtered out)',
    [expectedName],
  ),
),
})`}</pre>
      }
    >
      <CallbackSelectorPanel queryKey={queryKey} expectedName={expectedName} />
    </QueryToolsWrapper>
  )
}

export function SelectorReturningFunctionExample() {
  return (
    <AccordionSection
      id="15_selector-returning-function"
      title="15 Selector Returning a Function"
      description={
        <>
          Panel A returns a function from the selector: <strong>selectData</strong> returns an
          object with <strong>getDataByName</strong>. Every time the selector runs, a new function
          is created (new reference), so React Query sees the selected result as changed and the
          component can rerender unnecessarily. Panel B uses a selector created with{' '}
          <strong>useCallback</strong> (dependent on <strong>expectedName</strong>) and returns a
          primitive string, which makes the selected value more stable.{' '}
          <strong>Enable Math.random() and refetch both queries.</strong> Now API returns new data on each refetch,
          so the selector runs in both panels. However, both panels only use{' '}
          <strong>firstName</strong>, so changes in <strong>changingValue</strong> should not be
          relevant by themselves. In Panel A, returning a function from the selector still causes
          rerenders on every data change.
        </>
      }
    >
      <PanelsRow>
        <ObjectSelectorPanelControls queryKey={SELECTOR_WITH_FUNCTION} />
        <CallbackSelectorPanelControls queryKey={SELECTOR_WITH_FUNCTION} />
      </PanelsRow>
    </AccordionSection>
  )
}
