export type MockRequestOptions = {
  shouldFail?: boolean
  errorMessage?: string
}

export type DemoUser = {
  id: number
  firstName: string
  changingValue: number
}

const DEFAULT_MOCK_API_DELAY_MS = 2000
let fetchDemoUserCallCount = 0
let fetchDemoUserShouldFail = false
const fetchDemoUserCallCountSubscribers = new Set<() => void>()
const fetchDemoUserShouldFailSubscribers = new Set<() => void>()

const wait = (delayMs: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, delayMs))

let mockApiDelayMs = DEFAULT_MOCK_API_DELAY_MS

export function getMockApiDelayMs() {
  return mockApiDelayMs
}

export function setMockApiDelayMs(nextDelayMs: number) {
  mockApiDelayMs = Number.isFinite(nextDelayMs) && nextDelayMs >= 0
    ? Math.floor(nextDelayMs)
    : DEFAULT_MOCK_API_DELAY_MS
}

export function getFetchDemoUserCallCount() {
  return fetchDemoUserCallCount
}

export function subscribeFetchDemoUserCallCount(onStoreChange: () => void) {
  fetchDemoUserCallCountSubscribers.add(onStoreChange)

  return () => {
    fetchDemoUserCallCountSubscribers.delete(onStoreChange)
  }
}

export function getFetchDemoUserShouldFail() {
  return fetchDemoUserShouldFail
}

export function setFetchDemoUserShouldFail(value: boolean) {
  fetchDemoUserShouldFail = value
  fetchDemoUserShouldFailSubscribers.forEach((notify) => notify())
}

export function subscribeFetchDemoUserShouldFail(onStoreChange: () => void) {
  fetchDemoUserShouldFailSubscribers.add(onStoreChange)

  return () => {
    fetchDemoUserShouldFailSubscribers.delete(onStoreChange)
  }
}

export function resetFetchDemoUserCallCount() {
  fetchDemoUserCallCount = 0
  fetchDemoUserCallCountSubscribers.forEach((notify) => notify())
}

export async function mockApiRequest<T>(
  createResponse: () => T | Promise<T>,
  options: MockRequestOptions = {},
): Promise<T> {
  const { shouldFail = false, errorMessage = 'Mock API error' } = options

  await wait(mockApiDelayMs)

  if (shouldFail) {
    throw new Error(errorMessage)
  }

  return createResponse()
}

export async function fetchDemoUser(
  options?: MockRequestOptions,
): Promise<DemoUser> {
  fetchDemoUserCallCount += 1
  fetchDemoUserCallCountSubscribers.forEach((notify) => notify())

  return mockApiRequest(
    () => ({
      id: 1,
      firstName: 'Demo',
      changingValue: Math.random(),
    }),
    {
      ...options,
      shouldFail: options?.shouldFail ?? fetchDemoUserShouldFail,
    },
  )
}