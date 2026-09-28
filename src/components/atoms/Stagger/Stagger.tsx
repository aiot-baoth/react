import { m, type HTMLMotionProps } from 'motion/react'
import { motionPresets, motionTokens, staggerContainer, type MotionPreset } from '@/theme'

export type StaggerProps = Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'variants'> & {
  /** Khoảng trễ giữa các con (giây) */
  stagger?: number
  /** Trễ trước khi con đầu tiên chạy (giây) */
  delay?: number
  /** Chỉ chạy khi cuộn tới (1 lần) */
  inView?: boolean
}

/**
 * Atom: container làm các `StaggerItem` bên trong xuất hiện lần lượt.
 *
 * <Stagger className="grid grid-cols-4 gap-4">
 *   {items.map((i) => <StaggerItem key={i.id}>...</StaggerItem>)}
 * </Stagger>
 */
export function Stagger({
  stagger = motionTokens.stagger,
  delay = 0,
  inView = false,
  children,
  ...rest
}: StaggerProps) {
  return (
    <m.div
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      {...(inView
        ? { whileInView: 'visible', viewport: { once: true, amount: 0.1 } }
        : { animate: 'visible' })}
      {...rest}
    >
      {children}
    </m.div>
  )
}

export type StaggerItemProps = Omit<HTMLMotionProps<'div'>, 'variants'> & {
  /** Kiểu xuất hiện của từng phần tử */
  preset?: MotionPreset
}

/** Atom: 1 phần tử trong `Stagger` — nhận thời điểm chạy từ container. */
export function StaggerItem({
  preset = 'slideUp',
  transition,
  children,
  ...rest
}: StaggerItemProps) {
  return (
    <m.div
      variants={motionPresets[preset]}
      transition={{
        duration: motionTokens.duration.base,
        ease: motionTokens.easing.enter,
        ...transition,
      }}
      {...rest}
    >
      {children}
    </m.div>
  )
}
