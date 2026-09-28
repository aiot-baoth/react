import type { Transition, Variants } from 'motion/react'

/**
 * Motion tokens — dùng chung cho mọi animation để chuyển động nhất quán.
 * Thời gian tính bằng giây (chuẩn của Motion).
 */
export const motionTokens = {
  duration: {
    fast: 0.15,
    base: 0.25,
    slow: 0.4,
  },
  easing: {
    /** Chuẩn cho hầu hết chuyển động */
    standard: [0.2, 0, 0, 1],
    /** Vào màn hình (xuất hiện) */
    enter: [0, 0, 0.2, 1],
    /** Rời màn hình (biến mất) */
    exit: [0.4, 0, 1, 1],
  },
  /** Khoảng trễ giữa các phần tử trong danh sách (stagger) */
  stagger: 0.05,
} as const satisfies {
  duration: Record<string, number>
  easing: Record<string, Transition['ease']>
  stagger: number
}

/** Các kiểu xuất hiện dựng sẵn: trạng thái `hidden` -> `visible` */
export const motionPresets = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -12 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
} satisfies Record<string, Variants>

export type MotionPreset = keyof typeof motionPresets

/** Variants cho container: các con xuất hiện lần lượt */
export const staggerContainer = (
  stagger: number = motionTokens.stagger,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})
