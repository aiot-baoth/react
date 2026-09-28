import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import StarIcon from '@mui/icons-material/Star'
import { Alert, App, Card, type UploadFile } from 'antd'
import { useState } from 'react'
import {
  AnimatedNumber,
  Animate,
  Avatar,
  Badge,
  Button,
  Divider,
  Heading,
  Icon,
  Link,
  Skeleton,
  Stagger,
  StaggerItem,
  StatusTag,
  Text,
  Tooltip,
} from '@/components/atoms'
import {
  CopyButton,
  FileUpload,
  FormCheckbox,
  FormDatePicker,
  FormInput,
  FormNumberInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormTextarea,
  StatCard,
} from '@/components/molecules'
import { ErrorBoundary, PageHeader } from '@/components/organisms'
import { usePosts, useZodForm } from '@/hooks'
import { profileDemoSchema } from '@/schemas'
import {
  selectSidebarCollapsed,
  selectThemeMode,
  toggleSidebar,
  toggleThemeMode,
  useAppDispatch,
  useAppSelector,
} from '@/store'

/** Atoms cơ bản */
function AtomsDemo() {
  return (
    <Card title="Atoms">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Heading level={4}>Heading level 4</Heading>
          <Text>Body text</Text>
          <Text variant="secondary">Secondary text</Text>
          <Text variant="caption">Caption text</Text>
          <Text>
            Inline <Text variant="code">code</Text> và{' '}
            <Link to="https://react.dev">link ngoài</Link>
          </Text>
        </div>
        <Divider className="my-0" />
        <div className="flex flex-wrap items-center gap-2">
          <Button>Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button variant="outlined">Outlined</Button>
          <Button loading>Loading</Button>
          <Button className="bg-success!">Tailwind override</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusTag status="success">Hoạt động</StatusTag>
          <StatusTag status="processing">Đang xử lý</StatusTag>
          <StatusTag status="warning">Chờ duyệt</StatusTag>
          <StatusTag status="error">Đã huỷ</StatusTag>
          <StatusTag>Nháp</StatusTag>
        </div>
        <div className="flex items-center gap-4">
          <Badge count={5}>
            <Avatar name="Nguyễn Văn An" />
          </Badge>
          <Avatar name="Trần Bình" />
          <Avatar src="https://i.pravatar.cc/80?img=5" name="Ảnh" />
          <Tooltip title="Tooltip nè">
            <span className="text-primary">
              <Icon icon={InfoOutlinedIcon} />
            </span>
          </Tooltip>
          <Icon icon={StarIcon} color="warning" size="lg" />
          <CopyButton text="Nội dung đã sao chép" />
        </div>
        <Skeleton paragraph={{ rows: 2 }} />
      </div>
    </Card>
  )
}

/** Form đủ loại field — React Hook Form + Zod (`profileDemoSchema`) */
function KitchenSinkForm() {
  const { message } = App.useApp()
  const [files, setFiles] = useState<UploadFile[]>([])
  const { control, handleSubmit, formState } = useZodForm(profileDemoSchema, {
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      skills: [],
      bio: '',
      newsletter: true,
    },
  })

  return (
    <Card title="Form — tất cả loại field">
      <form
        noValidate
        onSubmit={handleSubmit(async (values) => {
          await new Promise((r) => setTimeout(r, 500))
          void message.success(`Đã lưu: ${values.name} — ${values.birthday.format('DD/MM/YYYY')}`)
        })}
        className="grid gap-4 md:grid-cols-2"
      >
        <FormInput control={control} name="name" label="Họ tên" required />
        <FormInput control={control} name="email" label="Email" required />
        <FormInput control={control} name="phone" label="Số điện thoại" hint="Không bắt buộc" />
        <FormSelect
          control={control}
          name="role"
          label="Vai trò"
          required
          placeholder="Chọn vai trò"
          options={[
            { value: 'admin', label: 'Quản trị' },
            { value: 'editor', label: 'Biên tập' },
            { value: 'viewer', label: 'Người xem' },
          ]}
        />
        <FormSelect
          control={control}
          name="skills"
          label="Kỹ năng"
          required
          mode="multiple"
          placeholder="Chọn nhiều"
          options={['React', 'TypeScript', 'Tailwind', 'Node.js'].map((v) => ({
            value: v,
            label: v,
          }))}
        />
        <FormDatePicker control={control} name="birthday" label="Ngày sinh" required />
        <FormNumberInput control={control} name="salary" label="Mức lương" required currency />
        <FormRadioGroup
          control={control}
          name="gender"
          label="Giới tính"
          required
          options={[
            { value: 'male', label: 'Nam' },
            { value: 'female', label: 'Nữ' },
            { value: 'other', label: 'Khác' },
          ]}
        />
        <FormTextarea
          control={control}
          name="bio"
          label="Giới thiệu"
          showCount
          maxLength={200}
          className="md:col-span-2"
        />
        <div className="md:col-span-2">
          <FileUpload
            value={files}
            onChange={setFiles}
            accept="image/*,.pdf"
            maxCount={3}
            maxSizeMB={2}
          />
        </div>
        <FormSwitch control={control} name="newsletter" label="Nhận bản tin" />
        <FormCheckbox control={control} name="agree" label="Tôi đồng ý với điều khoản sử dụng" />
        <div className="md:col-span-2">
          <Button type="submit" loading={formState.isSubmitting}>
            Lưu
          </Button>
        </div>
      </form>
    </Card>
  )
}

/** Client state (Redux) + server state (TanStack Query) */
function StateDemo() {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const sidebarCollapsed = useAppSelector(selectSidebarCollapsed)
  const { data: posts, isFetching, refetch } = usePosts({ _limit: 3 })

  return (
    <Card title="State — Redux Toolkit + TanStack Query">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Text>Theme:</Text>
          <StatusTag status="processing">{themeMode}</StatusTag>
          <Button size="small" variant="outlined" onClick={() => dispatch(toggleThemeMode())}>
            Toggle theme
          </Button>
          <Text>Sidebar:</Text>
          <StatusTag>{sidebarCollapsed ? 'collapsed' : 'expanded'}</StatusTag>
          <Button size="small" variant="outlined" onClick={() => dispatch(toggleSidebar())}>
            Toggle sidebar
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="small"
            variant="outlined"
            loading={isFetching}
            onClick={() => void refetch()}
          >
            Refetch posts
          </Button>
        </div>
        <ul className="m-0 divide-y divide-border p-0">
          {posts?.map((post) => (
            <li key={post.id} className="list-none truncate py-2">
              <b>#{post.id}</b> {post.title}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

/** Animation (Motion): preset, stagger, số chạy */
function MotionDemo() {
  const [replay, setReplay] = useState(0)
  const [revenue, setRevenue] = useState(128_500_000)
  const presets = ['fade', 'slideUp', 'slideDown', 'slideLeft', 'scale'] as const

  return (
    <Card
      title="Animation — Motion"
      extra={
        <Button size="small" variant="outlined" onClick={() => setReplay((n) => n + 1)}>
          Chạy lại
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-5 gap-2">
          {presets.map((preset, i) => (
            <Animate key={`${preset}-${replay}`} preset={preset} delay={i * 0.08}>
              <div className="rounded-app bg-primary/10 py-3 text-center text-xs font-medium text-primary">
                {preset}
              </div>
            </Animate>
          ))}
        </div>
        <Stagger key={replay} className="flex flex-col gap-2">
          {['Bước 1: khai báo schema', 'Bước 2: tạo form', 'Bước 3: gọi API'].map((label) => (
            <StaggerItem key={label} preset="slideLeft">
              <div className="rounded-app border border-border px-3 py-2 text-sm text-text">
                {label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="flex items-center gap-3">
          <Text variant="secondary">Doanh thu:</Text>
          <span className="text-xl font-bold text-text tabular-nums">
            <AnimatedNumber value={revenue} format={(v) => `${v.toLocaleString('vi-VN')}₫`} />
          </span>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setRevenue(Math.round(Math.random() * 500_000_000))}
          >
            Đổi số
          </Button>
        </div>
      </div>
    </Card>
  )
}

/** Component cố tình lỗi để minh hoạ ErrorBoundary */
function Bomb({ explode }: { explode: boolean }) {
  if (explode) throw new Error('Lỗi render mẫu từ component <Bomb />')
  return <Text variant="success">Component đang chạy bình thường.</Text>
}

function ErrorBoundaryDemo() {
  const [explode, setExplode] = useState(false)
  return (
    <Card title="ErrorBoundary">
      <div className="flex flex-col gap-3">
        <Alert
          type="info"
          showIcon
          title="Lỗi chỉ ảnh hưởng khu vực được bọc, phần còn lại vẫn chạy."
        />
        <Button color="error" variant="outlined" onClick={() => setExplode(true)}>
          Gây lỗi
        </Button>
        <ErrorBoundary key={String(explode)}>
          <Bomb explode={explode} />
        </ErrorBoundary>
        {explode && (
          <Button size="small" variant="text" onClick={() => setExplode(false)}>
            Khôi phục
          </Button>
        )}
      </div>
    </Card>
  )
}

/** Page: trình diễn các component dựng sẵn. Xem đầy đủ trong Storybook (`npm run storybook`). */
export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        breadcrumb={false}
        title="Components"
        subtitle="Xem đầy đủ tài liệu trong Storybook: npm run storybook"
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Atoms" value="20" icon={<StarIcon />} />
        <StatCard title="Molecules" value="22" trend={10} trendLabel="mới" />
        <StatCard title="Organisms" value="14" trend={-2} />
        <StatCard title="Loading" value="-" loading />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <AtomsDemo />
        <div className="flex flex-col gap-4">
          <MotionDemo />
          <StateDemo />
          <ErrorBoundaryDemo />
        </div>
      </div>
      <KitchenSinkForm />
    </div>
  )
}
