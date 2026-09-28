import { z } from 'zod'
import { vi } from 'zod/locales'

// Thông báo lỗi mặc định bằng tiếng Việt cho mọi schema
z.config(vi())

export { z }
