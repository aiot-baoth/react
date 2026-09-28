import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

type ParamValue = string | number | undefined | null

/**
 * Đọc/ghi state trên URL query (?page=2&q=abc) — reload/chia sẻ link vẫn giữ bộ lọc.
 *
 * const [params, setParams] = useQueryParams({ page: '1', pageSize: '10', q: '' })
 * setParams({ q: 'react', page: 1 })
 */
export function useQueryParams<T extends Record<string, string>>(defaults: T) {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useMemo(() => {
    const result = { ...defaults } as Record<string, string>
    for (const key of Object.keys(defaults)) {
      const value = searchParams.get(key)
      if (value !== null) result[key] = value
    }
    return result as T
    // eslint-disable-next-line react-hooks/exhaustive-deps -- defaults thường là object literal, chỉ phụ thuộc URL
  }, [searchParams])

  const setParams = useCallback(
    (patch: Partial<Record<keyof T, ParamValue>>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          for (const [key, value] of Object.entries(patch)) {
            // Bỏ khỏi URL nếu rỗng hoặc bằng giá trị mặc định -> URL gọn
            if (
              value === undefined ||
              value === null ||
              value === '' ||
              String(value) === defaults[key]
            ) {
              next.delete(key)
            } else {
              next.set(key, String(value))
            }
          }
          return next
        },
        { replace: true },
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- như trên
    [setSearchParams],
  )

  return [params, setParams] as const
}
