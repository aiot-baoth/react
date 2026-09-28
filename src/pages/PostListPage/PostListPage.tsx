import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import IconButton from '@mui/material/IconButton'
import { App } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Button, Link, Tooltip } from '@/components/atoms'
import { useConfirmDelete } from '@/components/molecules'
import { DataTable, FilterBar, FormDrawer, FormModal, PostForm } from '@/components/organisms'
import { ListPageTemplate } from '@/components/templates'
import { buildPath, ROUTES, USER_IDS } from '@/constants'
import { useCreatePost, useDeletePost, usePostPage, useQueryParams, useUpdatePost } from '@/hooks'
import type { PostFormValues } from '@/schemas'
import type { Post } from '@/services/api'

const DEFAULT_PARAMS = { page: '1', pageSize: '10', q: '', userId: '', sort: '', order: '' }

/** Page: danh sách bài viết — lọc/phân trang/sort đồng bộ URL, tạo (modal), sửa (drawer), xoá (confirm). */
export default function PostListPage() {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const confirmDelete = useConfirmDelete()

  const [params, setParams] = useQueryParams(DEFAULT_PARAMS)
  const { data, isFetching, error, refetch } = usePostPage({
    page: Number(params.page),
    pageSize: Number(params.pageSize),
    q: params.q,
    userId: params.userId ? Number(params.userId) : undefined,
    sort: params.sort || undefined,
    order: (params.order || undefined) as 'asc' | 'desc' | undefined,
  })

  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<Post | null>(null)
  const createPost = useCreatePost()
  const updatePost = useUpdatePost()
  const deletePost = useDeletePost()

  const handleCreate = async (values: PostFormValues) => {
    const post = await createPost.mutateAsync(values)
    void message.success(t('post.created', { id: post.id }))
    setCreating(false)
  }

  const handleUpdate = async (values: PostFormValues) => {
    if (!editing) return
    const post = await updatePost.mutateAsync({ id: editing.id, ...values })
    void message.success(t('post.updated', { id: post.id }))
    setEditing(null)
  }

  const handleDelete = (post: Post) =>
    confirmDelete({
      content: t('post.deleteContent', { id: post.id }),
      onConfirm: async () => {
        await deletePost.mutateAsync(post.id)
        void message.success(t('post.deleted', { id: post.id }))
      },
    })

  return (
    <ListPageTemplate
      header={{
        title: t('post.list'),
        subtitle: t('post.listSubtitle'),
        extra: (
          <Button startIcon={<AddIcon />} onClick={() => setCreating(true)}>
            {t('common.create')}
          </Button>
        ),
      }}
      filters={
        <FilterBar
          values={{ q: params.q, userId: params.userId }}
          onSubmit={(values) => setParams({ ...values, page: 1 })}
          fields={[
            {
              type: 'text',
              name: 'q',
              label: t('filter.keyword'),
              placeholder: t('common.searchPlaceholder'),
            },
            {
              type: 'select',
              name: 'userId',
              label: t('filter.user'),
              options: USER_IDS.map((id) => ({
                value: String(id),
                label: t('post.userOption', { id }),
              })),
            },
          ]}
        />
      }
    >
      <DataTable<Post>
        data={data?.items}
        loading={isFetching}
        error={error}
        onRetry={() => void refetch()}
        sort={{
          field: params.sort || undefined,
          order: (params.order || undefined) as 'asc' | 'desc',
        }}
        onSortChange={({ field, order }) => setParams({ sort: field, order, page: 1 })}
        pagination={{
          page: Number(params.page),
          pageSize: Number(params.pageSize),
          total: data?.total ?? 0,
          onChange: (page, pageSize) => setParams({ page, pageSize }),
        }}
        emptyAction={<Button onClick={() => setCreating(true)}>{t('common.create')}</Button>}
        columns={[
          { title: t('post.fieldId'), dataIndex: 'id', width: 80, sorter: true },
          {
            title: t('post.fieldTitle'),
            dataIndex: 'title',
            sorter: true,
            render: (title: string, post) => (
              <Link to={buildPath(ROUTES.POST_DETAIL, { id: post.id })}>{title}</Link>
            ),
          },
          {
            title: t('post.fieldUser'),
            dataIndex: 'userId',
            width: 160,
            render: (id: number) => {
              const name = t('post.userOption', { id })
              return (
                <span className="flex items-center gap-2">
                  <Avatar name={name} size="small" />
                  {name}
                </span>
              )
            },
          },
          {
            title: t('common.actions'),
            key: 'actions',
            width: 110,
            fixed: 'right',
            render: (_, post) => (
              <span className="flex gap-1">
                <Tooltip title={t('common.edit')}>
                  <IconButton
                    size="small"
                    aria-label={t('common.edit')}
                    onClick={() => setEditing(post)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('common.delete')}>
                  <IconButton
                    size="small"
                    color="error"
                    aria-label={t('common.delete')}
                    onClick={() => void handleDelete(post)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </span>
            ),
          },
        ]}
      />

      <FormModal
        open={creating}
        title={t('post.createTitle')}
        formId="post-create-form"
        submitting={createPost.isPending}
        onClose={() => setCreating(false)}
      >
        <PostForm id="post-create-form" onSubmit={handleCreate} />
      </FormModal>

      <FormDrawer
        open={Boolean(editing)}
        title={t('post.editTitle', { id: editing?.id })}
        formId="post-edit-form"
        submitting={updatePost.isPending}
        onClose={() => setEditing(null)}
      >
        {editing && (
          <PostForm id="post-edit-form" defaultValues={editing} onSubmit={handleUpdate} />
        )}
      </FormDrawer>
    </ListPageTemplate>
  )
}
