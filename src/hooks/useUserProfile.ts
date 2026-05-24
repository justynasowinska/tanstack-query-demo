import { queryOptions } from '@tanstack/react-query'
import { fetchDemoUser } from '../api/mockApi'

type UserProfileQueryOptionsParams = {
  queryKey: string[]
  shouldFail: boolean
}

export function userProfileQueryOptions({
  queryKey,
  shouldFail,
}: UserProfileQueryOptionsParams) {
  return queryOptions({
    queryKey,
    queryFn: () =>
      fetchDemoUser({
        shouldFail,
        errorMessage: 'Demo error: failed to load user.',
      }),
  })
}