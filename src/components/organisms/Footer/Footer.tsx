import { useTranslation } from 'react-i18next'
import { Link } from '@/components/atoms'
import { cn } from '@/utils'

export type FooterLink = { label: string; to: string }

export type FooterProps = {
  links?: FooterLink[]
  className?: string
}

/** Organism: chân trang cho trang public — bản quyền + link. */
export function Footer({ links = [], className }: FooterProps) {
  const { t } = useTranslation()

  return (
    <footer className={cn('border-t border-border bg-surface', className)}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-text-secondary sm:flex-row">
        <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
        {links.length > 0 && (
          <nav className="flex gap-4">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="text-text-secondary hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </footer>
  )
}
