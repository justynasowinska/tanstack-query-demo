import { useState, type ReactNode } from 'react'

type ExampleAccordionSectionProps = {
  id: string
  title: string
  description: string
  defaultOpen?: boolean
  children: ReactNode
}

export function AccordionSection({
  id,
  title,
  description,
  defaultOpen = false,
  children,
}: ExampleAccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <article className="accordion-item">
      <button
        type="button"
        className="accordion-trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        id={`trigger-${id}`}
      >
        <span className="accordion-trigger-header">
          <span className="accordion-title">{title}</span>
          <span className="accordion-chevron" aria-hidden>
            ▾
          </span>
        </span>
        <span className="accordion-description">{description}</span>
      </button>

      {isOpen && (
        <div
          id={`panel-${id}`}
          role="region"
          aria-labelledby={`trigger-${id}`}
          className="accordion-panel"
        >
          <div className="accordion-panel-content">{children}</div>
        </div>
      )}
    </article>
  )
}