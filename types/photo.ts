export interface Photo {
  id: string
  url: string
  title: string
  description?: string
  createdAt: Date
  author: string
  commentCount: number
}
