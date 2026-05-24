type DemoQueryToolbarProps = {
  onRefetch: () => void
  onRemount?: () => void
  shouldFail: boolean
  onShouldFailChange: (value: boolean) => void
  failLabel?: string
}

export function DemoQueryToolbar({
  onRefetch,
  onRemount,
  shouldFail,
  onShouldFailChange,
  failLabel = 'Force error',
}: DemoQueryToolbarProps) {
  return (
    <div className="query-toolbar">
      <label htmlFor="should-fail-input">
        <input
          id="should-fail-input"
          type="checkbox"
          checked={shouldFail}
          onChange={(event) => onShouldFailChange(event.target.checked)}
        />
        {failLabel}
      </label>

      <button type="button" onClick={onRefetch}>
        Refetch
      </button>

      {onRemount && (
        <button type="button" onClick={onRemount}>
          Remount component
        </button>
      )}
    </div>
  )
}