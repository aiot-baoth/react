import { animate, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

export type AnimatedNumberProps = {
  value: number
  /** Định dạng hiển thị, vd tiền tệ; mặc định phân tách hàng nghìn theo vi-VN */
  format?: (value: number) => string
  /** Số chữ số thập phân khi đang chạy */
  decimals?: number
  /** Thời lượng (giây) */
  duration?: number
  className?: string
}

const defaultFormat = (value: number) => value.toLocaleString('vi-VN')

/**
 * Atom: số chạy từ giá trị cũ tới giá trị mới (lần đầu chạy từ 0).
 * Cập nhật thẳng vào DOM (không re-render React mỗi frame). Tắt khi bật "Giảm chuyển động".
 */
export function AnimatedNumber({
  value,
  format = defaultFormat,
  decimals = 0,
  duration = 0.8,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  /** Giá trị đang hiển thị — animation mới luôn chạy tiếp từ đây */
  const current = useRef(0)
  /** Giữ format mới nhất mà không làm effect chạy lại (tránh cắt animation khi cha re-render) */
  const formatRef = useRef(format)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    formatRef.current = format
  })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (reduceMotion) {
      node.textContent = formatRef.current(value)
      current.current = value
      return
    }
    const controls = animate(current.current, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        current.current = latest
        node.textContent = formatRef.current(Number(latest.toFixed(decimals)))
      },
    })
    return () => controls.stop()
  }, [value, decimals, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {format(reduceMotion ? value : 0)}
    </span>
  )
}
