import React from 'react'
import { cn } from '@next360/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 min-h-[120px]',
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
              : 'border-border focus:border-secondary focus:ring-secondary/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
        {hint && !error && <p className="text-xs text-muted mt-0.5">{hint}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
