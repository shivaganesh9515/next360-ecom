import React from 'react'
import { cn } from '@next360/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700 ml-1"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-slate-100 border-none px-6 py-4 rounded-3xl text-sm font-sans min-h-[140px] resize-none',
            'transition-all duration-300 ring-1 ring-transparent focus:ring-secondary focus:bg-white outline-none',
            'placeholder:text-slate-500',
            error && 'ring-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 ml-4">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
