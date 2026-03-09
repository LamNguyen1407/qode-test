'use client'

import { useState } from 'react'
import { Input, Button, Space, Form, message } from 'antd'
import { SendOutlined } from '@ant-design/icons'

interface CommentInputProps {
  onSubmit: (author: string, text: string) => Promise<void> | void
  loading?: boolean
}

export default function CommentInput({ onSubmit, loading = false }: CommentInputProps) {
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    if (!author.trim()) {
      message.error('Please enter your name')
      return
    }
    if (!text.trim()) {
      message.error('Please enter a comment')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit(author, text)
      setText('')
      message.success('Comment posted successfully!')
    } catch (error) {
      message.error('Failed to post comment')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={12}>
      <Form layout="vertical">
        <Form.Item label="Your Name" required>
          <Input
            placeholder="Enter your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={submitting || loading}
          />
        </Form.Item>
        <Form.Item label="Comment" required>
          <Input.TextArea
            placeholder="Share your thoughts..."
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitting || loading}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSubmit}
            loading={submitting || loading}
            style={{ width: '100%' }}
          >
            Post Comment
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}
