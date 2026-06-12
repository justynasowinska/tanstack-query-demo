import { QueryClient } from '@tanstack/react-query'
import { fetchDemoUser } from '../../api/mockApi'
import { userProfileOptions } from '../useUserProfile'

jest.mock('../../api/mockApi', () => ({
  fetchDemoUser: jest.fn(),
}))

const mockedFetchDemoUser = fetchDemoUser as jest.MockedFunction<typeof fetchDemoUser>

describe('userProfileOptions', () => {
  beforeEach(() => {
    mockedFetchDemoUser.mockReset()
  })

  it('returns query options with provided queryKey', () => {
    const options = userProfileOptions({ queryKey: ['user', '1'] })

    expect(options.queryKey).toEqual(['user', '1'])
    expect(typeof options.queryFn).toBe('function')
  })

  it('queryFn calls fetchDemoUser with project error message', async () => {
    mockedFetchDemoUser.mockResolvedValue({
      id: 1,
      firstName: 'Demo',
      changingValue: 0.5,
    })

    const queryClient = new QueryClient()
    const options = userProfileOptions({ queryKey: ['demo'] })
    const result = await queryClient.fetchQuery(options)

    expect(mockedFetchDemoUser).toHaveBeenCalledTimes(1)
    expect(mockedFetchDemoUser).toHaveBeenCalledWith({
      errorMessage: 'Demo error: failed to load user.',
    })
    expect(result).toEqual({
      id: 1,
      firstName: 'Demo',
      changingValue: 0.5,
    })
  })
})