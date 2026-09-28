import { Card } from 'antd'
import { useState } from 'react'
import { Button } from '@/components/atoms'
import { FormField } from '@/components/molecules'

/** Page: ghép template + organisms/molecules với dữ liệu thật. */
export default function HomePage() {
  const [name, setName] = useState('')

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card title="Ant Design + Tailwind">
        <FormField
          label="Họ tên"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={name ? undefined : 'Vui lòng nhập họ tên'}
        />
      </Card>
      <Card title="MUI + Tailwind">
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button variant="outlined">Outlined</Button>
          <Button loading>Loading</Button>
          <Button className="bg-success!">Tailwind override</Button>
        </div>
      </Card>
    </div>
  )
}
