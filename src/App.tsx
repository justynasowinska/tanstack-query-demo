import { useEffect, useState } from 'react'
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
import { SubscribedFocusExample } from './examples/09_subscribedFocusExample'
import { NotifyOnChangePropsTrackedValuesExample } from './examples/10_subscribedVsNotifyOnChangePropsExample'
import { SubscribedVsNotifyOnChangePropsExample } from './examples/11_subscribedVsNotifyOnChangePropsExample'

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
            aria-label={theme === 'dark' ? 'Przełącz na jasny motyw' : 'Przełącz na ciemny motyw'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 9a1 1 0 1 1 0-2h-1a1 1 0 1 1 0 2h1ZM4 12a1 1 0 1 1 0-2H3a1 1 0 1 1 0 2h1Zm14.07 7.07a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.7a1 1 0 0 1 0 1.42ZM7.05 8.05a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.7.71a1 1 0 0 1 0 1.41Zm0 10.31-.7.71a1 1 0 0 1-1.42-1.41l.71-.7a1 1 0 0 1 1.41 1.4Zm10.31-10.31a1 1 0 0 1-1.41-1.41l.7-.71a1 1 0 1 1 1.42 1.41l-.71.71Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M21 13.24A9 9 0 1 1 10.76 3a1 1 0 0 1 .79 1.63A7 7 0 1 0 19.37 12a1 1 0 0 1 1.63.79v.45Z" />
              </svg>
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
        <SelectorLimitsRerendersExample />
        <SharedCacheBetweenComponentsExample />
        <SelectorWithOverSubscribedHookExample />
        <EnabledExample />
        <StaleTimeExample />
        <SubscribedFocusExample />
        <NotifyOnChangePropsTrackedValuesExample />
        <SubscribedVsNotifyOnChangePropsExample />
      </PageShell>
    </>
  )
}

export default App
