import { useQuery } from '@tanstack/react-query'
import { AccordionSection } from '../components/AccordionSection'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { useRerenderFlash } from '../components/useRerenderFlash'
import { userProfileOptions } from '../hooks/useUserProfile'

const BASIC_INFORMATION_QUERY_KEY = ['01-basic']

type UserProfileQueryContentProps = {
  queryKey: string[]
}

function UserProfileQueryContent({ queryKey }: UserProfileQueryContentProps) {
  const { data } = useQuery(userProfileOptions({ queryKey }))
  const rerenderFlashRef = useRerenderFlash<HTMLDivElement>()

  return (
    <div ref={rerenderFlashRef} className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName}</p>
      </div>
    </div>
  )
}

export function BasicUserQueryExample() {
  return (
    <AccordionSection
      id="01_basic-user-query"
      title="01 Introduction"
      description={
        <>
          Start by watching TanStack DevTools while opening and closing this
          accordion: the component that uses useQuery mounts and unmounts, and
          cache metadata changes (observers, Stale, Inactive). Then run Refetch
          and Remount this component to compare cache transitions. You can also run
          refetch and other actions from DevTools Actions.
        </>
      }
    >
      <details className="basic-query-guide" open>
        <summary className="basic-query-guide-summary">How to test this demo</summary>

        <div className="basic-query-guide-content">
          <p>
            If TanStack DevTools is hidden, open it with the palm tree icon in the
            bottom-right corner. Select this query cache entry and watch Query Details
            while using Refetch and Remount.
          </p>

          <p>
            When this component rerenders, it briefly flashes purple so you can
            immediately see rerender moments.
          </p>

          <p>
            The function below is the one used to fetch data for this demo query.
          </p>

          <pre className="query-tools-code-block">{`export async function fetchDemoUser(options?: MockRequestOptions) {
  return mockApiRequest(
    () => ({
      id: 1,
      firstName: 'Demo',
      changingValue: Math.random(),
    }),
    options,
  )
}`}</pre>

          <p>
            Requests include an artificial API delay to simulate backend response time.
            You can change it in Mocked API function using the API delay field.
          </p>

          <p>
            In DevTools - Actions you can run operations on selected cache (for
            example refetch, invalidate and more).
          </p>

          <p>
            This project is open source, so after cloning from GitHub you can freely
            experiment with code. Repository link is available in the top-right
            corner.
          </p>
        </div>
      </details>

      <QueryToolsWrapper
        queryKey={BASIC_INFORMATION_QUERY_KEY}
        description={
          <pre className="query-tools-code-block">{`queryKey: ['01-basic']
const { data } = useQuery(...)`}</pre>
        }
      >
        <UserProfileQueryContent queryKey={BASIC_INFORMATION_QUERY_KEY} />
      </QueryToolsWrapper>
    </AccordionSection>
  )
}