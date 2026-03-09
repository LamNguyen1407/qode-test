'use client'

import { Comment } from '@/types/comment'
import { Avatar, Space, Typography, Divider } from 'antd'
import Image from 'next/image'

const { Text } = Typography

interface CommentItemProps {
  comment: Comment
}

export default function CommentItem({ comment }: CommentItemProps) {
  const formatDate = (date: Date) => {
    const d = new Date(date)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return d.toLocaleDateString()
  }

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size={8}>
        <Space align="start">
          <Avatar
            size={32}
            src={
              comment.avatar ? (
                <Image
                  src={comment.avatar}
                  alt={comment.author}
                  fill
                  sizes="32px"
                  style={{ objectFit: 'cover' }}
                />
              ) : undefined
            }
          >
            {comment.author[0].toUpperCase()}
          </Avatar>
          <Space direction="vertical" size={0} style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Text strong>{comment.author}</Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {formatDate(comment.createdAt)}
              </Text>
            </div>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{comment.text}</Text>
          </Space>
        </Space>
      </Space>
      <Divider style={{ margin: '12px 0' }} />
    </>
  )
}
