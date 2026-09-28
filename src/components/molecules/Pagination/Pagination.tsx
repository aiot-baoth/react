import { Pagination as AntdPagination, type PaginationProps as AntdPaginationProps } from 'antd'
import { useTranslation } from 'react-i18next'

export type PaginationProps = Omit<AntdPaginationProps, 'onChange'> & {
  /** Trang hiện tại (bắt đầu từ 1) */
  page: number
  pageSize: number
  total: number
  onChange: (page: number, pageSize: number) => void
}

/** Molecule: phân trang (antd) có hiển thị tổng số mục + đổi số dòng/trang. */
export function Pagination({ page, pageSize, total, onChange, ...rest }: PaginationProps) {
  const { t } = useTranslation()
  return (
    <AntdPagination
      current={page}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      showSizeChanger
      pageSizeOptions={[10, 20, 50, 100]}
      showTotal={(count) => t('common.total', { count })}
      {...rest}
    />
  )
}
