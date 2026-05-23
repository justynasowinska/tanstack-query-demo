import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AccordionSection } from '../components/AccordionSection'
import { QueryToolsWrapper } from '../components/QueryToolsWrapper'
import { userProfileQueryOptions } from '../hooks/useUserProfile'

const DEMO_QUERY_KEY = ['01-demo']

type UserProfileQueryContentProps = {
  queryKey: string[]
  shouldFail: boolean
}

function UserProfileQueryContent({
  queryKey,
  shouldFail,
}: UserProfileQueryContentProps) {
  const { data } = useQuery(userProfileQueryOptions({ queryKey, shouldFail }))

  return (
    <div className="query-state-panel-wrapper">
      <span className="query-state-panel-label">Rendered component</span>
      <div className="query-state-panel">
        <p>First Name: {data?.firstName}</p>
      </div>
    </div>
  )
}

export function BasicUserQueryExample() {
  const [shouldFail, setShouldFail] = useState(false)

  return (
    <AccordionSection
      id="01_basic-user-query"
      title="01 Basic Query"
      description="Basic query lifecycle (loading / success / error)."
    >
      <QueryToolsWrapper
        queryKey={DEMO_QUERY_KEY}
        shouldFail={shouldFail}
        onShouldFailChange={setShouldFail}
      >
        <UserProfileQueryContent
          queryKey={DEMO_QUERY_KEY}
          shouldFail={shouldFail}
        />
      </QueryToolsWrapper>
    </AccordionSection>
  )
}