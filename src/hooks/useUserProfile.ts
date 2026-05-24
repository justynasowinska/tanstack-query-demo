import { queryOptions } from '@tanstack/react-query'
import { fetchDemoUser } from '../api/mockApi'

type UserProfileQueryOptionsParams = {
  queryKey: string[]
}

export function userProfileQueryOptions({
  queryKey,
}: UserProfileQueryOptionsParams) {
  return queryOptions({
    queryKey,
    queryFn: () =>
      fetchDemoUser({
        errorMessage: 'Demo error: failed to load user.',
      }),
  })
}