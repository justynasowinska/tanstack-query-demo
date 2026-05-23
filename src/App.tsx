import './App.css'
import { GlobalFetchDemoUserStatsPanel } from './components/GlobalFetchDemoUserStatsPanel'
import { GlobalQueryOptionsToolbar } from './components/GlobalQueryOptionsToolbar'
import { PageShell } from './components/PageShell'
import { BasicUserQueryExample } from './examples/01_basicUserQueryExample'
import { SharedCacheBetweenComponentsExample } from './examples/02_sharedCacheBetweenComponentsExample'
import { SelectorLimitsRerendersExample } from './examples/03_selectorLimitsRerendersExample'
import { IsFetchingSubscriptionRerenderExample } from './examples/04_isFetchingSubscriptionRerenderExample'
import { HookOverSubscriptionRerenderExample } from './examples/05_hookOverSubscriptionRerenderExample'
import { SelectorWithOverSubscribedHookExample } from './examples/06_selectorWithOverSubscribedHookExample'
import { EnabledExample } from './examples/07_enabledAndStaleTimeExample'
import { StaleTimeExample } from './examples/08_staleTimeExample'

function App() {
  return (
    <PageShell title="useQuery Demo">
      <GlobalQueryOptionsToolbar />
      <GlobalFetchDemoUserStatsPanel />
      <BasicUserQueryExample />
      <SharedCacheBetweenComponentsExample />
      <SelectorLimitsRerendersExample />
      <IsFetchingSubscriptionRerenderExample />
      <HookOverSubscriptionRerenderExample />
      <SelectorWithOverSubscribedHookExample />
      <EnabledExample />
      <StaleTimeExample />
    </PageShell>
  )
}

export default App
