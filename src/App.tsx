import './App.css'
import { GlobalFetchDemoUserStatsPanel } from './components/GlobalFetchDemoUserStatsPanel'
import { GlobalQueryOptionsToolbar } from './components/GlobalQueryOptionsToolbar'
import { PageShell } from './components/PageShell'
import { BasicUserQueryExample } from './examples/01_basicUserQueryExample'
import { SharedCacheBetweenComponentsExample } from './examples/02_sharedCacheBetweenComponentsExample'
import { SelectorLimitsRerendersExample } from './examples/03_selectorLimitsRerendersExample'

function App() {
  return (
    <PageShell title="useQuery Demo">
      <GlobalQueryOptionsToolbar />
      <GlobalFetchDemoUserStatsPanel />
      <BasicUserQueryExample />
      <SharedCacheBetweenComponentsExample />
      <SelectorLimitsRerendersExample />
    </PageShell>
  )
}

export default App
