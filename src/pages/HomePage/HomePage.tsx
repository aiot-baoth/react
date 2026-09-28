import { Alert, App, Card, Skeleton, Tag } from 'antd'
import { Button } from '@/components/atoms'
import { LoginForm } from '@/components/organisms'
import { useCreatePost, usePosts } from '@/hooks'
import {
  logout,
  selectIsAuthenticated,
  selectSidebarCollapsed,
  setCredentials,
  toggleSidebar,
  useAppDispatch,
  useAppSelector,
} from '@/store'

/** Demo client state: Redux Toolkit. */
function ClientStateDemo() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const sidebarCollapsed = useAppSelector(selectSidebarCollapsed)

  return (
    <Card title="Client state — Redux Toolkit">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span>Đăng nhập:</span>
          <Tag color={isAuthenticated ? 'green' : 'default'}>
            {isAuthenticated ? 'Có' : 'Không'}
          </Tag>
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              dispatch(
                isAuthenticated
                  ? logout()
                  : setCredentials({
                      token: 'demo-token',
                      user: { id: 1, name: 'Demo', email: 'demo@example.com' },
                    }),
              )
            }
          >
            {isAuthenticated ? 'Logout' : 'Login (fake)'}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span>Sidebar:</span>
          <Tag>{sidebarCollapsed ? 'Thu gọn' : 'Mở rộng'}</Tag>
          <Button size="small" variant="outlined" onClick={() => dispatch(toggleSidebar())}>
            Toggle
          </Button>
        </div>
      </div>
    </Card>
  )
}

/** Demo server state: TanStack Query + axios. */
function ServerStateDemo() {
  const { data: posts, isPending, isFetching, error, refetch } = usePosts({ _limit: 5 })
  const createPost = useCreatePost()

  return (
    <Card
      title="Server state — TanStack Query + axios"
      extra={
        <div className="flex gap-2">
          <Button size="small" variant="outlined" loading={isFetching} onClick={() => refetch()}>
            Refetch
          </Button>
          <Button
            size="small"
            loading={createPost.isPending}
            onClick={() => createPost.mutate({ userId: 1, title: 'Bài viết mới', body: '...' })}
          >
            Tạo post
          </Button>
        </div>
      }
    >
      {error && <Alert type="error" showIcon title={error.message} className="mb-3" />}
      {createPost.isSuccess && (
        <Alert
          type="success"
          showIcon
          title={`Đã tạo post #${createPost.data.id}`}
          className="mb-3"
        />
      )}
      {isPending ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <ul className="divide-y divide-border">
          {posts?.map((post) => (
            <li key={post.id} className="truncate py-2">
              <b>#{post.id}</b> {post.title}
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

/** Demo form: React Hook Form + Zod, submit thành công -> lưu vào Redux. */
function FormDemo() {
  const dispatch = useAppDispatch()
  const { message } = App.useApp()

  return (
    <Card title="Form — React Hook Form + Zod">
      <LoginForm
        onSubmit={async ({ email }) => {
          await new Promise((r) => setTimeout(r, 600)) // giả lập gọi API
          if (email === 'fail@example.com') throw new Error('Sai email hoặc mật khẩu')
          dispatch(setCredentials({ token: 'demo-token', user: { id: 1, name: 'Demo', email } }))
          message.success(`Đăng nhập thành công: ${email}`)
        }}
      />
    </Card>
  )
}

/** Page: ghép template + organisms/molecules với dữ liệu thật. */
export default function HomePage() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormDemo />
      <Card title="MUI + Tailwind">
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button variant="outlined">Outlined</Button>
          <Button loading>Loading</Button>
          <Button className="bg-success!">Tailwind override</Button>
        </div>
      </Card>
      <ClientStateDemo />
      <ServerStateDemo />
    </div>
  )
}
