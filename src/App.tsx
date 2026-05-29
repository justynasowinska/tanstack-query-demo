import { useEffect, useState } from 'react'
import './App.css'
import { GlobalFetchDemoUserStatsPanel } from './components/GlobalFetchDemoUserStatsPanel'
import { GlobalQueryOptionsToolbar } from './components/GlobalQueryOptionsToolbar'
import { PageShell } from './components/PageShell'
import { BasicUserQueryExample } from './examples/01_introduction'
import { IsFetchingSubscriptionRerenderExample } from './examples/02_trackedValuesRerender'
import { HookOverSubscriptionRerenderExample } from './examples/03_hookOverSubscriptionRerender'
import { SharedCacheBetweenComponentsExample } from './examples/04_fullDataSubscription'
import { SelectorLimitsRerendersExample } from './examples/05_selectorLimitsRerenders'
import { SelectorWithOverSubscribedHookExample } from './examples/06_selectorWithOverSubscribedHook'
import { SelectorParametersExample } from './examples/07_selectorParameters'
import { EnabledExample } from './examples/08_enabled'
import { StaleTimeExample } from './examples/09_staleTimeAndInvalidation'
import { GcTimeExample } from './examples/10_gcTime'
import { SubscribedFocusExample } from './examples/11_subscribed'
import { NotifyOnChangePropsTrackedValuesExample } from './examples/12_notifyOnChangeProps'
import { SubscribedVsNotifyOnChangePropsExample } from './examples/13_subscribedVsNotifyOnChangeProps'

type Theme = 'dark' | 'light'

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    const savedTheme = window.localStorage.getItem('app-theme')
    return savedTheme === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('app-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <header className="top-nav" aria-label="Main">
        <div className="top-nav-left">
          <span className="top-nav-brand">TanStack query demo</span>
          <a
            className="top-nav-link"
            href="https://tanstack.com/query/latest"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </div>

        <div className="top-nav-right">
          <button
            type="button"
            className="top-nav-icon-button"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun w-3.5 h-3.5 hidden light:block" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path fill="none" d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>
            )}
          </button>

          <a
            className="top-nav-icon-button"
            href="https://github.com/justynasowinska/tanstack-query-demo"
            target="_blank"
            rel="noreferrer"
            aria-label="Repozytorium GitHub"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.66-.22.66-.48v-1.87c-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .08 1.53 1.05 1.53 1.05.88 1.56 2.3 1.11 2.86.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.97a9.2 9.2 0 0 1 2.5.35c1.9-1.33 2.74-1.05 2.74-1.05.56 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.67.95.67 1.93v2.85c0 .27.17.59.67.48A10.27 10.27 0 0 0 22 12.25C22 6.6 17.52 2 12 2Z" />
            </svg>
          </a>
        </div>
      </header>

      <PageShell>
        <GlobalQueryOptionsToolbar />
        <GlobalFetchDemoUserStatsPanel />
        <BasicUserQueryExample />
        <IsFetchingSubscriptionRerenderExample />
        <HookOverSubscriptionRerenderExample />
        <SharedCacheBetweenComponentsExample />
        <SelectorLimitsRerendersExample />
        <SelectorWithOverSubscribedHookExample />
        <SelectorParametersExample />
        <EnabledExample />
        <StaleTimeExample />
        <GcTimeExample />
        <SubscribedFocusExample />
        <NotifyOnChangePropsTrackedValuesExample />
        <SubscribedVsNotifyOnChangePropsExample />
      </PageShell>
    </>
  )
}

export default App
