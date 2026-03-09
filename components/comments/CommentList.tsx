'use client'

import { Comment } from '@/types/comment'
import { Space, Empty, Divider, Typography } from 'antd'
import CommentItem from './CommentItem'

const { Title } = Typography

interface CommentListProps {
  comments: Comment[]
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={0}>
      <Title level={4} style={{ marginBottom: '16px' }}>
        Comments ({comments.length})
      </Title>
      {comments.length === 0 ? (
        <Empty description="No comments yet. Be the first to comment!" />
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </Space>
  )
}
