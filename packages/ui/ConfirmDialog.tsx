"use client"

import React from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import { AlertTriangle, Info, AlertCircle } from 'lucide-react'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'info',
  isLoading = false,
}: ConfirmDialogProps) => {
  const icons = {
    danger: <AlertCircle className="w-12 h-12 text-red-600" />,
    warning: <AlertTriangle className="w-12 h-12 text-accent" />,
    info: <Info className="w-12 h-12 text-secondary" />,
  }

  const iconBg = {
    danger: 'bg-red-50',
    warning: 'bg-accent/10',
    info: 'bg-secondary/10',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={false} size="sm" className="max-w-[400px]">
      <div className="flex flex-col items-center text-center px-2 py-4">
        <div className={`mb-5 p-4 rounded-full ${iconBg[variant]}`}>
          {icons[variant]}
        </div>
        <h3 className="text-2xl font-display font-bold text-text mb-3">{title}</h3>
        <p className="text-muted text-sm font-sans mb-8 leading-relaxed max-w-[280px]">
          {description}
        </p>
        <div className="flex gap-3 w-full">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
