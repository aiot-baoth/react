import SearchIcon from '@mui/icons-material/Search'
import { useState, type FormEvent } from 'react'
import { Button, Input } from '@/components/atoms'
import { cn } from '@/utils'

export type SearchBarProps = {
  placeholder?: string
  defaultValue?: string
  onSearch?: (keyword: string) => void
  className?: string
}

/** Molecule: Input (antd) + Button (MUI). */
export function SearchBar({
  placeholder = 'Tìm kiếm...',
  defaultValue = '',
  onSearch,
  className,
}: SearchBarProps) {
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
        placeholder={placeholder}
      />
      <Button type="submit" size="small" startIcon={<SearchIcon />}>
        Tìm
      </Button>
    </form>
  )
}
