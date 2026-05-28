import { queryOptions } from '@tanstack/react-query'
import { fetchDemoUser } from '../api/mockApi'

type userProfileOptionsParams = {
  queryKey: string[]
}

export function userProfileOptions({
  queryKey,
}: userProfileOptionsParams) {
  return queryOptions({
    queryKey,
    queryFn: () =>
      fetchDemoUser({
        errorMessage: 'Demo error: failed to load user.',
      }),
  })
}