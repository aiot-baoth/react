import { cn } from '@/utils'

export type LogoProps = {
  /** Tên hiển thị; ký tự đầu dùng làm icon */
  text?: string
  /** Class Tailwind bổ sung */
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
