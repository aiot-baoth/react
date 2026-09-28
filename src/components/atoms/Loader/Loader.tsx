import { Spin, type SpinProps } from 'antd'
import { cn } from '@/utils'

export type LoaderProps = SpinProps & {
  /** Chiếm toàn màn hình, căn giữa */
  fullScreen?: boolean
}

/** Atom: Loader dựa trên Ant Design Spin. */
export function Loader({ fullScreen = false, className, ...rest }: LoaderProps) {
  return (
    <div className={cn('grid place-items-center p-10', fullScreen && 'h-screen', className)}>
      <Spin {...rest} />
    </div>
  )
}
