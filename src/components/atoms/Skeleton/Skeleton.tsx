import { Skeleton as AntdSkeleton, type SkeletonProps as AntdSkeletonProps } from 'antd'

export type SkeletonProps = AntdSkeletonProps

/** Atom: khung chờ tải nội dung (antd), mặc định có hiệu ứng `active`. */
export function Skeleton(props: SkeletonProps) {
  return <AntdSkeleton active {...props} />
}

/** Khung chờ cho 1 ô nhập / nút / avatar */
Skeleton.Input = AntdSkeleton.Input
Skeleton.Button = AntdSkeleton.Button
Skeleton.Avatar = AntdSkeleton.Avatar
Skeleton.Image = AntdSkeleton.Image
