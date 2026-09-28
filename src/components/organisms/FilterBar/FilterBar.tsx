import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Card } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  Button,
  DatePicker,
  Input,
  RangePicker,
  Select,
  type SelectOption,
} from '@/components/atoms'

/** Ngày lưu dạng chuỗi YYYY-MM-DD (hợp với URL query) */
const DATE = 'YYYY-MM-DD'

export type FilterField =
  | { type: 'text'; name: string; label?: string; placeholder?: string }
  | { type: 'select'; name: string; label?: string; placeholder?: string; options: SelectOption[] }
  | { type: 'date'; name: string; label?: string; placeholder?: string }
  /** Giá trị: "YYYY-MM-DD,YYYY-MM-DD" */
  | { type: 'dateRange'; name: string; label?: string }

export type FilterValues = Record<string, string | undefined>

export type FilterBarProps = {
  fields: FilterField[]
  /** Giá trị hiện tại (thường đọc từ URL qua `useQueryParams`) */
  values: FilterValues
  /** Bấm "Lọc" hoặc Enter */
  onSubmit: (values: FilterValues) => void
  /** Bấm "Đặt lại" — mặc định gọi onSubmit với toàn bộ giá trị rỗng */
  onReset?: () => void
  className?: string
}

type FormState = Record<string, string | Dayjs | [Dayjs, Dayjs] | null | undefined>

function toForm(fields: FilterField[], values: FilterValues): FormState {
  const result: FormState = {}
  for (const f of fields) {
    const v = values[f.name]
    if (f.type === 'date') result[f.name] = v ? dayjs(v, DATE) : null
    else if (f.type === 'dateRange') {
      const [a, b] = v?.split(',') ?? []
      result[f.name] = a && b ? [dayjs(a, DATE), dayjs(b, DATE)] : null
    } else result[f.name] = v ?? undefined
  }
  return result
}

function fromForm(fields: FilterField[], state: FormState): FilterValues {
  const result: FilterValues = {}
  for (const f of fields) {
    const v = state[f.name]
    if (!v) result[f.name] = undefined
    else if (Array.isArray(v)) result[f.name] = `${v[0].format(DATE)},${v[1].format(DATE)}`
    else if (dayjs.isDayjs(v)) result[f.name] = v.format(DATE)
    else result[f.name] = String(v).trim() || undefined
  }
  return result
}

/** Organism: thanh bộ lọc cho màn danh sách, khai báo field bằng config. */
export function FilterBar({ fields, values, onSubmit, onReset, className }: FilterBarProps) {
  const { t } = useTranslation()
  const { control, handleSubmit, reset } = useForm<FormState>({
    defaultValues: toForm(fields, values),
  })

  // Đồng bộ lại khi URL đổi (back/forward trình duyệt)
  const serialized = JSON.stringify(values)
  useEffect(() => {
    reset(toForm(fields, values))
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chỉ chạy khi giá trị thực sự đổi
  }, [serialized])

  const handleReset = () => {
    const empty = Object.fromEntries(fields.map((f) => [f.name, undefined]))
    reset(toForm(fields, empty))
    if (onReset) onReset()
    else onSubmit(empty)
  }

  return (
    <Card size="small" className={className}>
      <form
        onSubmit={handleSubmit((state) => onSubmit(fromForm(fields, state)))}
        className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {fields.map((f) => (
          <label key={f.name} className="flex flex-col gap-1">
            {f.label && <span className="text-xs text-text-secondary">{f.label}</span>}
            <Controller
              control={control}
              name={f.name}
              render={({ field: { ref: _ref, value, onChange } }) => {
                switch (f.type) {
                  case 'text':
                    return (
                      <Input
                        value={(value as string | undefined) ?? ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={f.placeholder}
                      />
                    )
                  case 'select':
                    return (
                      <Select
                        value={value}
                        onChange={onChange}
                        options={f.options}
                        placeholder={f.placeholder}
                      />
                    )
                  case 'date':
                    return (
                      <DatePicker
                        value={value as Dayjs | null}
                        onChange={onChange}
                        placeholder={f.placeholder}
                      />
                    )
                  case 'dateRange':
                    return (
                      <RangePicker value={value as [Dayjs, Dayjs] | null} onChange={onChange} />
                    )
                }
              }}
            />
          </label>
        ))}
        <div className="flex gap-2">
          <Button type="submit" startIcon={<FilterAltOutlinedIcon />}>
            {t('common.filter')}
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            {t('common.reset')}
          </Button>
        </div>
      </form>
    </Card>
  )
}
