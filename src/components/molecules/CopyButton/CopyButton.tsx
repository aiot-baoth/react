import CheckIcon from '@mui/icons-material/Check'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import IconButton, { type IconButtonProps } from '@mui/material/IconButton'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tooltip } from '@/components/atoms'

export type CopyButtonProps = Omit<IconButtonProps, 'onClick'> & {
  /** Nội dung sẽ được sao chép */
  text: string
  /** Gọi sau khi sao chép thành công */
  onCopied?: () => void
}

/** Molecule: nút sao chép vào clipboard, đổi icon ✓ trong 1.5s. */
export function CopyButton({ text, onCopied, size = 'small', ...rest }: CopyButtonProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    onCopied?.()
  }

  return (
    <Tooltip title={copied ? t('common.copied') : t('common.copy')}>
      <IconButton aria-label={t('common.copy')} size={size} onClick={handleCopy} {...rest}>
        {copied ? (
          <CheckIcon fontSize="inherit" color="success" />
        ) : (
          <ContentCopyIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  )
}
