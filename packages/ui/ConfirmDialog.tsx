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
    danger: <AlertCircle className="w-12 h-12 text-red-500" />,
    warning: <AlertTriangle className="w-12 h-12 text-accent" />,
    info: <Info className="w-12 h-12 text-secondary" />,
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="sm">
      <div className="flex flex-col items-center text-center p-4">
        <div className="mb-4">{icons[variant]}</div>
        <h3 className="text-xl font-display text-text mb-2">{title}</h3>
        <p className="text-muted text-sm mb-8">{description}</p>
        <div className="flex gap-3 w-full">
          <Button variant="ghost" className="flex-1" onClick={onClose} disabled={isLoading}>
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
