import SearchIcon from '@mui/icons-material/Search'
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input } from '@/components/atoms'
import { cn } from '@/utils'

export type SearchBarProps = {
  /** Placeholder của input; mặc định "Tìm kiếm..." (theo ngôn ngữ) */
  placeholder?: string
  /** Giá trị khởi tạo */
  defaultValue?: string
  /** Gọi khi submit (Enter hoặc bấm nút), keyword đã trim */
  onSearch?: (keyword: string) => void
  /** Class Tailwind bổ sung cho form */
  className?: string
}

/** Molecule: Input (antd) + Button (MUI). */
export function SearchBar({ placeholder, defaultValue = '', onSearch, className }: SearchBarProps) {
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState(defaultValue)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch?.(keyword.trim())
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex items-center gap-2', className)}>
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder ?? t('common.searchPlaceholder')}
      />
      <Button type="submit" size="small" startIcon={<SearchIcon />}>
        {t('common.search')}
      </Button>
    </form>
  )
}
