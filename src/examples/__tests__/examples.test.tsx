import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import {
  BasicUserQueryExample,
  HowToTestDemoGuide,
} from '../01_introduction'
import { IsFetchingSubscriptionRerenderExample } from '../02_trackedValuesRerender'
import { HookOverSubscriptionRerenderExample } from '../03_hookOverSubscriptionRerender'
import { SharedCacheBetweenComponentsExample } from '../04_fullDataSubscription'
import { SelectorLimitsRerendersExample } from '../05_selectorLimitsRerenders'
import { SelectorWithOverSubscribedHookExample } from '../06_selectorWithOverSubscribedHook'
import { SelectorParametersExample } from '../07_selectorParameters'
import { EnabledExample } from '../08_enabled'
import { StaleTimeExample } from '../09_staleTimeAndInvalidation'
import { GcTimeExample } from '../10_gcTime'
import { SubscribedFocusExample } from '../11_subscribed'
import { NotifyOnChangePropsTrackedValuesExample } from '../12_notifyOnChangeProps'
import { SubscribedVsNotifyOnChangePropsExample } from '../13_subscribedVsNotifyOnChangeProps'
import { SelectorFunctionReferenceExample } from '../14_selectorFunctionReference'
import { SelectorReturningFunctionExample } from '../15_selectorReturningFunction'

function renderExample(example: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>{example}</QueryClientProvider>,
  )
}

describe('examples', () => {
  it.each([
    ['HowToTestDemoGuide', <HowToTestDemoGuide />, '00 How to test this demo'],
    ['BasicUserQueryExample', <BasicUserQueryExample />, '01 Introduction'],
    [
      'IsFetchingSubscriptionRerenderExample',
      <IsFetchingSubscriptionRerenderExample />,
      '02 Tracked Values Rerender',
    ],
    [
      'HookOverSubscriptionRerenderExample',
      <HookOverSubscriptionRerenderExample />,
      '03 Hook Over-Subscription Rerender',
    ],
    [
      'SharedCacheBetweenComponentsExample',
      <SharedCacheBetweenComponentsExample />,
      '04 Full Data Subscription',
    ],
    [
      'SelectorLimitsRerendersExample',
      <SelectorLimitsRerendersExample />,
      '05 Selector Limits Rerenders',
    ],
    [
      'SelectorWithOverSubscribedHookExample',
      <SelectorWithOverSubscribedHookExample />,
      '06 Selector With Over-Subscribed Hook',
    ],
    [
      'SelectorParametersExample',
      <SelectorParametersExample />,
      '07 Selector Parameters',
    ],
    ['EnabledExample', <EnabledExample />, '08 Enabled'],
    [
      'StaleTimeExample',
      <StaleTimeExample />,
      '09 Stale Time and Invalidation',
    ],
    ['GcTimeExample', <GcTimeExample />, '10 gcTime'],
    ['SubscribedFocusExample', <SubscribedFocusExample />, '11 Subscribed'],
    [
      'NotifyOnChangePropsTrackedValuesExample',
      <NotifyOnChangePropsTrackedValuesExample />,
      '12 notifyOnChangeProps',
    ],
    [
      'SubscribedVsNotifyOnChangePropsExample',
      <SubscribedVsNotifyOnChangePropsExample />,
      '13 Subscribed vs notifyOnChangeProps',
    ],
    [
      'SelectorFunctionReferenceExample',
      <SelectorFunctionReferenceExample />,
      '14 Selector Function Reference',
    ],
    [
      'SelectorReturningFunctionExample',
      <SelectorReturningFunctionExample />,
      '15 Selector Returning a Function',
    ],
  ])('renders %s', (_name, example, expectedTitle) => {
    renderExample(example as ReactElement)

    expect(screen.getByText(expectedTitle)).toBeInTheDocument()
  })
})