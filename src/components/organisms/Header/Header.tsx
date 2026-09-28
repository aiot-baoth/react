import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from '@/components/atoms'
import { LanguageSwitcher, SearchBar, ThemeToggle } from '@/components/molecules'
import { ENV } from '@/constants'
import { cn } from '@/utils'

export type HeaderNavItem = { label: string; to: string }

export type HeaderProps = {
  /** Danh sách link điều hướng */
  navItems?: HeaderNavItem[]
  /** Gọi khi submit ô tìm kiếm; không truyền thì ẩn ô tìm kiếm */
  onSearch?: (keyword: string) => void
  /** Nội dung thêm bên phải, vd nút Đăng nhập */
  actions?: ReactNode
}

/** Organism: header trang public — Logo + Navigation + SearchBar + ngôn ngữ + theme. */
export function Header({ navItems = [], onSearch, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
        <Logo text={ENV.APP_NAME} />
        <nav className="flex gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  'text-sm text-text-secondary hover:text-primary',
                  isActive && 'font-semibold text-primary',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {onSearch && <SearchBar className="w-80" onSearch={onSearch} />}
          <LanguageSwitcher />
          <ThemeToggle />
          {actions}
        </div>
      </div>
    </header>
  )
}
