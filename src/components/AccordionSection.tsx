import { AnimatePresence, motion } from 'framer-motion'
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
          <motion.span
            className="accordion-chevron"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            aria-hidden
          >
            ▾
          </motion.span>
        </span>
        <span className="accordion-description">{description}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={`panel-${id}`}
            role="region"
            aria-labelledby={`trigger-${id}`}
            className="accordion-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <div className="accordion-panel-content">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}