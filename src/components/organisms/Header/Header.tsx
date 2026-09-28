import { NavLink } from 'react-router-dom'
import { Logo } from '@/components/atoms'
import { SearchBar } from '@/components/molecules'
import { ENV } from '@/constants'
import { cn } from '@/utils'

export type HeaderNavItem = { label: string; to: string }

export type HeaderProps = {
  navItems?: HeaderNavItem[]
  onSearch?: (keyword: string) => void
}

/** Organism: Logo + Navigation + SearchBar. */
export function Header({ navItems = [], onSearch }: HeaderProps) {
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
        <SearchBar className="ml-auto w-80" onSearch={onSearch} />
      </div>
    </header>
  )
}
