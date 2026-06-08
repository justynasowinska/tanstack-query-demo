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
const DEFAULT_FETCH_DEMO_USER_STABLE_VALUE = 0.5
let fetchDemoUserCallCount = 0
let fetchDemoUserShouldFail = false
let fetchDemoUserUseRandomChangingValue = true
let fetchDemoUserStableChangingValue = DEFAULT_FETCH_DEMO_USER_STABLE_VALUE
const fetchDemoUserCallCountSubscribers = new Set<() => void>()
const fetchDemoUserShouldFailSubscribers = new Set<() => void>()
const fetchDemoUserValueModeSubscribers = new Set<() => void>()

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

export function getFetchDemoUserUseRandomChangingValue() {
  return fetchDemoUserUseRandomChangingValue
}

export function setFetchDemoUserUseRandomChangingValue(value: boolean) {
  fetchDemoUserUseRandomChangingValue = value
  fetchDemoUserValueModeSubscribers.forEach((notify) => notify())
}

export function getFetchDemoUserStableChangingValue() {
  return fetchDemoUserStableChangingValue
}

export function setFetchDemoUserStableChangingValue(value: number) {
  fetchDemoUserStableChangingValue = Number.isFinite(value)
    ? Number(value.toFixed(5))
    : DEFAULT_FETCH_DEMO_USER_STABLE_VALUE
  fetchDemoUserValueModeSubscribers.forEach((notify) => notify())
}

export function subscribeFetchDemoUserShouldFail(onStoreChange: () => void) {
  fetchDemoUserShouldFailSubscribers.add(onStoreChange)

  return () => {
    fetchDemoUserShouldFailSubscribers.delete(onStoreChange)
  }
}

export function subscribeFetchDemoUserValueMode(onStoreChange: () => void) {
  fetchDemoUserValueModeSubscribers.add(onStoreChange)

  return () => {
    fetchDemoUserValueModeSubscribers.delete(onStoreChange)
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

  const roundedChangingValue = fetchDemoUserUseRandomChangingValue
    ? Number(Math.random().toFixed(5))
    : fetchDemoUserStableChangingValue

  return mockApiRequest(
    () => ({
      id: 1,
      firstName: 'Demo',
      changingValue: roundedChangingValue,
    }),
    {
      ...options,
      shouldFail: options?.shouldFail ?? fetchDemoUserShouldFail,
    },
  )
}