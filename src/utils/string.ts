/** Lấy tối đa 2 chữ cái đầu: "Nguyễn Văn An" -> "NA" */
export function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  const first = words[0].charAt(0)
  const last = words.length > 1 ? words[words.length - 1].charAt(0) : ''
  return (first + last).toUpperCase()
}

/** Hash chuỗi -> số nguyên dương ổn định (dùng chọn màu theo tên...) */
export function hashString(value: string) {
  let hash = 0
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) | 0
  return Math.abs(hash)
}
