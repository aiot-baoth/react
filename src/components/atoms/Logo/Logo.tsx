import { cn } from '@/utils'

export type LogoProps = {
  text?: string
  className?: string
}

/** Atom: Logo thuần Tailwind. */
export function Logo({ text = 'Base', className }: LogoProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-2 text-lg font-bold text-primary', className)}
    >
      <span className="grid size-8 place-items-center rounded-app bg-primary text-white">
        {text.charAt(0)}
      </span>
      {text}
    </span>
  )
}
