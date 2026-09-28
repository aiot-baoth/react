import { Card } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import { Animate, Logo } from '@/components/atoms'
import { LanguageSwitcher, ThemeToggle } from '@/components/molecules'
import { ENV } from '@/constants'

/** Template: trang đăng nhập / đăng ký — panel thương hiệu bên trái, form ở giữa bên phải. */
export function AuthLayout() {
  const { pathname } = useLocation()

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-primary p-10 text-white lg:flex">
        <Logo
          text={ENV.APP_NAME}
          className="text-white [&>span:first-child]:bg-white [&>span:first-child]:text-primary"
        />
        <Animate preset="slideUp" delay={0.1} className="flex flex-col gap-3">
          <p className="m-0 text-3xl leading-tight font-bold">
            React · MUI · Ant Design · Tailwind
          </p>
          <p className="m-0 text-white/80">Atomic Design · TanStack Query · Redux Toolkit</p>
        </Animate>
        <span className="text-sm text-white/70">© {new Date().getFullYear()}</span>
      </aside>
      <main className="relative flex items-center justify-center p-4">
        <div className="absolute top-4 right-4 flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        {/* key theo URL: chuyển login <-> register có hiệu ứng */}
        <Animate key={pathname} preset="scale" className="w-full max-w-md">
          <Card>
            <Outlet />
          </Card>
        </Animate>
      </main>
    </div>
  )
}
