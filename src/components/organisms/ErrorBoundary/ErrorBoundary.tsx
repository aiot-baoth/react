import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorState } from '@/components/molecules'

export type ErrorBoundaryProps = {
  children: ReactNode
  /** Giao diện thay thế; mặc định ErrorState + nút thử lại */
  fallback?: (error: Error, reset: () => void) => ReactNode
  /** Gửi lỗi lên Sentry / log server... */
  onError?: (error: Error, info: ErrorInfo) => void
}

type State = { error: Error | null }

/**
 * Organism: bắt lỗi render của cây component con, tránh trắng cả trang.
 * Bọc quanh từng khu vực độc lập (widget, tab...) để lỗi chỉ ảnh hưởng khu vực đó.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
    if (import.meta.env.DEV) console.error('[ErrorBoundary]', error, info.componentStack)
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    if (!error) return this.props.children
    return this.props.fallback ? (
      this.props.fallback(error, this.reset)
    ) : (
      <ErrorState error={error} onRetry={this.reset} />
    )
  }
}
