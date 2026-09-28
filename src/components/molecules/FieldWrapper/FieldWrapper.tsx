import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { translateError } from '@/i18n/validation'
import { cn } from '@/utils'

export type FieldWrapperProps = {
  /** Nhãn phía trên control */
  label?: ReactNode
  /** `id` của control để label trỏ tới (click label -> focus control) */
  htmlFor?: string
  /** Hiện dấu `*` bắt buộc */
  required?: boolean
  /** Thông báo lỗi (ưu tiên hiển thị hơn `hint`); message từ `vmsg()` được tự dịch */
  error?: string
  /** Gợi ý nhỏ dưới control */
  hint?: ReactNode
  className?: string
  children: ReactNode
}

/** Molecule: khung chung Label + Control + Lỗi/Gợi ý cho mọi field trong form. */
export function FieldWrapper({
  label,
  htmlFor,
  required,
  error,
  hint,
  className,
  children,
}: FieldWrapperProps) {
  const { t } = useTranslation()
  const errorText = translateError(t, error)

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-text">
          {label}
          {required && <span className="ml-0.5 text-error">*</span>}
        </label>
      )}
      {children}
      {errorText ? (
        <span role="alert" className="text-xs text-error">
          {errorText}
        </span>
      ) : (
        hint && <span className="text-xs text-text-secondary">{hint}</span>
      )}
    </div>
  )
}
