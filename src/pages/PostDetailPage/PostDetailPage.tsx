import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { App, Card, Descriptions } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Button, Stagger, StaggerItem, Text } from '@/components/atoms'
import { CopyButton, EmptyState } from '@/components/molecules'
import { FormDrawer, PostForm } from '@/components/organisms'
import { DetailPageTemplate } from '@/components/templates'
import { ROUTES } from '@/constants'
import { usePost, usePostComments, useUpdatePost } from '@/hooks'
import type { PostFormValues } from '@/schemas'

/** Page: chi tiết bài viết — tab Thông tin / Bình luận, sửa bằng drawer. */
export default function PostDetailPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const id = Number(useParams().id)

  const { data: post, isPending, error, refetch } = usePost(id)
  const { data: comments = [] } = usePostComments(id)
  const updatePost = useUpdatePost()
  const [editing, setEditing] = useState(false)

  const handleUpdate = async (values: PostFormValues) => {
    await updatePost.mutateAsync({ id, ...values })
    void message.success(t('post.updated', { id }))
    setEditing(false)
  }

  return (
    <>
      <DetailPageTemplate
        loading={isPending}
        error={error}
        onRetry={() => void refetch()}
        header={{
          title: post?.title ?? t('post.detail'),
          onBack: () => void navigate(ROUTES.POSTS),
          extra: post && (
            <Button startIcon={<EditOutlinedIcon />} onClick={() => setEditing(true)}>
              {t('common.edit')}
            </Button>
          ),
        }}
        tabs={[
          {
            key: 'info',
            label: t('post.tabInfo'),
            children: post && (
              <Descriptions
                column={1}
                bordered
                items={[
                  {
                    key: 'id',
                    label: t('post.fieldId'),
                    children: (
                      <span className="flex items-center gap-1">
                        #{post.id} <CopyButton text={String(post.id)} />
                      </span>
                    ),
                  },
                  { key: 'title', label: t('post.fieldTitle'), children: post.title },
                  {
                    key: 'user',
                    label: t('post.fieldUser'),
                    children: t('post.userOption', { id: post.userId }),
                  },
                  {
                    key: 'body',
                    label: t('post.fieldBody'),
                    children: <span className="whitespace-pre-line">{post.body}</span>,
                  },
                ]}
              />
            ),
          },
          {
            key: 'comments',
            label: t('post.tabComments', { count: comments.length }),
            children:
              comments.length === 0 ? (
                <EmptyState variant="simple" />
              ) : (
                <Stagger className="flex flex-col gap-4" role="list">
                  {comments.map((c) => (
                    <StaggerItem key={c.id} className="flex gap-3" role="listitem">
                      <Avatar name={c.email} />
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <Text variant="strong">{c.name}</Text>
                        <Text variant="caption">{c.email}</Text>
                        <Text variant="body">{c.body}</Text>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              ),
          },
        ]}
        aside={
          post && (
            <Card size="small" title={t('post.fieldUser')}>
              <div className="flex items-center gap-3">
                <Avatar name={t('post.userOption', { id: post.userId })} size="large" />
                <Text variant="strong">{t('post.userOption', { id: post.userId })}</Text>
              </div>
            </Card>
          )
        }
      />
      <FormDrawer
        open={editing}
        title={t('post.editTitle', { id })}
        formId="post-detail-edit-form"
        submitting={updatePost.isPending}
        onClose={() => setEditing(false)}
      >
        {post && (
          <PostForm id="post-detail-edit-form" defaultValues={post} onSubmit={handleUpdate} />
        )}
      </FormDrawer>
    </>
  )
}
