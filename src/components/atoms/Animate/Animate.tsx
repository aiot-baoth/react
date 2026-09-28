import { m, type HTMLMotionProps } from 'motion/react'
import { motionPresets, motionTokens, type MotionPreset } from '@/theme'

export type AnimateProps = Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'variants'> & {
  /** Kiểu xuất hiện */
  preset?: MotionPreset
  /** Trễ trước khi chạy (giây) */
  delay?: number
  /** Thời lượng (giây) */
  duration?: number
  /** Chỉ chạy khi cuộn tới phần tử (1 lần) */
  inView?: boolean
}

/**
 * Atom: bọc nội dung để có hiệu ứng xuất hiện (fade / slide / scale).
 * Tự tắt khi người dùng bật "Giảm chuyển động" (MotionConfig reducedMotion="user").
 */
export function Animate({
  preset = 'slideUp',
  delay = 0,
  duration = motionTokens.duration.base,
  inView = false,
  transition,
  children,
  ...rest
}: AnimateProps) {
  return (
    <m.div
      variants={motionPresets[preset]}
      initial="hidden"
      {...(inView
        ? { whileInView: 'visible', viewport: { once: true, amount: 0.2 } }
        : { animate: 'visible' })}
      transition={{ duration, delay, ease: motionTokens.easing.enter, ...transition }}
      {...rest}
    >
      {children}
    </m.div>
  )
}
