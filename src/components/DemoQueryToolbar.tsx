type DemoQueryToolbarProps = {
  onRefetch: () => void
  onRemount?: () => void
}

export function DemoQueryToolbar({
  onRefetch,
  onRemount,
}: DemoQueryToolbarProps) {
  return (
    <div className="query-toolbar">
      <button type="button" onClick={onRefetch}>
        Refetch
      </button>

      {onRemount && (
        <button type="button" onClick={onRemount}>
          Remount this component
        </button>
      )}
    </div>
  )
}