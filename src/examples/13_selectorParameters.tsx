import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AccordionSection } from '../components/AccordionSection'
import { PanelsRow } from '../components/PanelsRow'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const SELECTOR_PARAMS_QUERY_KEY = ['13-selector-params']

type PanelQueryContentProps = {
  queryKey: string[]
}

type DemoUserLike = {
  firstName?: string
}

type SelectDataResult = {
  getFilteredName: (expectedName: string) => string
}

function selectData(data: DemoUserLike): SelectDataResult {
  return {
    getFilteredName: (expectedName: string) => {
      if (!data.firstName) {
        return '(no data)'
      }

      return data.firstName === expectedName ? data.firstName : '(filtered out)'
    },
  }
}

const selectFirstName = (expectedName: string) => {
  return (data: DemoUserLike) => {
    if (!data.firstName) {
      return '(no data)'
    }

    return data.firstName === expectedName ? data.firstName : '(filtered out)'
  }
}

type FilteredPanelProps = PanelQueryContentProps & {
  expectedName: string
}

function PanelWithHelperInSelect({ queryKey, expectedName }: FilteredPanelProps) {
  const { data: getFirstName } = useQuery({
    ...userProfileOptions({ queryKey }),
    select: selectData,
  })
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()
  const filteredName = getFirstName?.getFilteredName(expectedName) ?? '(no data)'

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>Expected firstName: {expectedName}</p>
        <p>Filtered result: {filteredName}</p>
      </div>
    </div>
  )
}

function PanelWithClosureInSelect({ queryKey, expectedName }: FilteredPanelProps) {
  const { data: filteredName } = useQuery({
    ...userProfileOptions({ queryKey }),
    select: selectFirstName(expectedName),
  })
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>Expected firstName: {expectedName}</p>
        <p>Filtered result: {filteredName ?? '(no data)'}</p>
      </div>
    </div>
  )
}

function PanelWithHelperInSelectControls({ queryKey }: PanelQueryContentProps) {
  const [expectedName, setExpectedName] = useState('Demo')

  return (
    <QueryToolsWrapper
      queryKey={queryKey}
      title="Panel A (selectData returns getFilteredName)"
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
    getFilteredName: (expectedName) =>
      data.firstName === expectedName
        ? data.firstName
        : '(filtered out)',
  }
}

const { data: getFirstName } = useQuery({
  ...userProfileOptions({ queryKey }),
  select: selectData,
})`}</pre>
      }
    >
      <PanelWithHelperInSelect queryKey={queryKey} expectedName={expectedName} />
    </QueryToolsWrapper>
  )
}

function PanelWithClosureInSelectControls({ queryKey }: PanelQueryContentProps) {
  const [expectedName, setExpectedName] = useState('Demo')

  return (
    <QueryToolsWrapper
      queryKey={queryKey}
      title="Panel B (closure in select)"
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
        <pre className="query-tools-code-block">{`const selectFirstName = (expectedName) => {
  return (data) => {
    return data.firstName === expectedName
      ? data.firstName
      : '(filtered out)'
  }
}

const { data: filteredName } = useQuery({
  ...userProfileOptions({ queryKey }),
  select: selectFirstName(expectedName),
})`}</pre>
      }
    >
      <PanelWithClosureInSelect queryKey={queryKey} expectedName={expectedName} />
    </QueryToolsWrapper>
  )
}

export function SelectorParametersExample() {
  return (
    <AccordionSection
      id="13_selector-parameters"
      title="13 Selector with parameters"
      description={
        <>
          Panel A returns <strong>getFilteredName</strong> from <strong>selectData</strong>, then calls it
          in the component with expectedName. Panel B defines a closure and passes it as{' '}
          <strong>select: selectFirstName(expectedName)</strong>. Returning a function as selected{' '}
          <strong>data</strong> in Panel A causes rerenders on each select run, even when source values stay
          the same. Compare rerender flashes in both panels while changing expectedName and running Refetch.
        </>
      }
    >
      <PanelsRow>
        <PanelWithHelperInSelectControls queryKey={SELECTOR_PARAMS_QUERY_KEY} />
        <PanelWithClosureInSelectControls queryKey={SELECTOR_PARAMS_QUERY_KEY} />
      </PanelsRow>
    </AccordionSection>
  )
}
