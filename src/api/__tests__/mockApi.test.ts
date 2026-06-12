import {
    fetchDemoUser,
    getFetchDemoUserCallCount,
    getFetchDemoUserShouldFail,
    getFetchDemoUserStableChangingValue,
    getFetchDemoUserUseRandomChangingValue,
    getMockApiDelayMs,
    mockApiRequest,
    resetFetchDemoUserCallCount,
    setFetchDemoUserShouldFail,
    setFetchDemoUserStableChangingValue,
    setFetchDemoUserUseRandomChangingValue,
    setMockApiDelayMs,
    subscribeFetchDemoUserCallCount,
    subscribeFetchDemoUserShouldFail,
    subscribeFetchDemoUserValueMode,
} from '../mockApi'

describe('mockApi', () => {
  beforeEach(() => {
    setMockApiDelayMs(0)
    resetFetchDemoUserCallCount()
    setFetchDemoUserShouldFail(false)
    setFetchDemoUserUseRandomChangingValue(true)
    setFetchDemoUserStableChangingValue(0.5)
  })

  it('setMockApiDelayMs stores non-negative integer values', () => {
    setMockApiDelayMs(123.9)
    expect(getMockApiDelayMs()).toBe(123)

    setMockApiDelayMs(0)
    expect(getMockApiDelayMs()).toBe(0)
  })

  it('setMockApiDelayMs resets to default when value is invalid', () => {
    setMockApiDelayMs(-10)
    expect(getMockApiDelayMs()).toBe(2000)

    setMockApiDelayMs(Number.NaN)
    expect(getMockApiDelayMs()).toBe(2000)
  })

  it('mockApiRequest resolves with createResponse output', async () => {
    const response = await mockApiRequest(() => ({ ok: true }))
    expect(response).toEqual({ ok: true })
  })

  it('mockApiRequest throws when shouldFail is true', async () => {
    await expect(
      mockApiRequest(() => ({ ok: true }), {
        shouldFail: true,
        errorMessage: 'Boom',
      }),
    ).rejects.toThrow('Boom')
  })

  it('subscribeFetchDemoUserCallCount notifies on fetch and reset', async () => {
    const onChange = jest.fn()
    const unsubscribe = subscribeFetchDemoUserCallCount(onChange)

    await fetchDemoUser()
    resetFetchDemoUserCallCount()

    expect(onChange).toHaveBeenCalledTimes(2)

    unsubscribe()
    await fetchDemoUser()

    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('subscribeFetchDemoUserShouldFail notifies when fail flag changes', () => {
    const onChange = jest.fn()
    const unsubscribe = subscribeFetchDemoUserShouldFail(onChange)

    setFetchDemoUserShouldFail(true)
    setFetchDemoUserShouldFail(false)

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(getFetchDemoUserShouldFail()).toBe(false)

    unsubscribe()
    setFetchDemoUserShouldFail(true)

    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('subscribeFetchDemoUserValueMode notifies on mode and stable value changes', () => {
    const onChange = jest.fn()
    const unsubscribe = subscribeFetchDemoUserValueMode(onChange)

    setFetchDemoUserUseRandomChangingValue(false)
    setFetchDemoUserStableChangingValue(0.123456)

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(getFetchDemoUserUseRandomChangingValue()).toBe(false)
    expect(getFetchDemoUserStableChangingValue()).toBe(0.12346)

    unsubscribe()
    setFetchDemoUserStableChangingValue(0.9)

    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('setFetchDemoUserStableChangingValue falls back to default for invalid number', () => {
    setFetchDemoUserStableChangingValue(Number.POSITIVE_INFINITY)
    expect(getFetchDemoUserStableChangingValue()).toBe(0.5)
  })

  it('fetchDemoUser increments counter and returns rounded random value', async () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1234567)

    const user = await fetchDemoUser()

    expect(getFetchDemoUserCallCount()).toBe(1)
    expect(user).toEqual({
      id: 1,
      firstName: 'Demo',
      changingValue: 0.12346,
    })

    randomSpy.mockRestore()
  })

  it('fetchDemoUser uses stable changing value when random mode is disabled', async () => {
    setFetchDemoUserUseRandomChangingValue(false)
    setFetchDemoUserStableChangingValue(0.77777)

    const user = await fetchDemoUser()

    expect(user.changingValue).toBe(0.77777)
  })

  it('fetchDemoUser uses global shouldFail flag by default', async () => {
    setFetchDemoUserShouldFail(true)

    await expect(fetchDemoUser()).rejects.toThrow('Mock API error')
  })

  it('fetchDemoUser allows overriding global shouldFail via options', async () => {
    setFetchDemoUserShouldFail(true)

    const user = await fetchDemoUser({ shouldFail: false })

    expect(user.firstName).toBe('Demo')
  })
})