import { Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/atoms'
import { ROUTES } from '@/constants'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Trang bạn tìm không tồn tại."
      extra={<Button onClick={() => navigate(ROUTES.HOME)}>Về trang chủ</Button>}
    />
  )
}
