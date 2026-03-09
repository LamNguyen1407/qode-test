'use client'

import { useState } from 'react'
import { Form, Input, Button, Space, Image, Progress, message, Divider } from 'antd'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './UploadDragger.module.css'
import { toast } from 'react-toastify'

// interface UploadDraggerProps {
//   onSubmit: (title: string, url: string, author: string, description?: string) => Promise<void>
//   loading?: boolean
// }

export default function UploadDragger() {
  const [form] = Form.useForm()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const handleFile = (file: File) => {

  if (!file.type.startsWith("image/")) {
    toast.error("Only image files are allowed")
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image must be smaller than 5MB")
    return
  }

  setFile(file)

  const reader = new FileReader()
  reader.onload = (e) => {
    setPreview(e.target?.result as string)
  }
  reader.readAsDataURL(file)
}

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files?.[0]) handleFile(files[0])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.[0]) handleFile(files[0])
  }

  const handleRemove = () => {
    setFile(null)
    setPreview('')
    setProgress(0)
  }
  const handleSubmit = async (values: any) => {
  if (!file) {
    toast.error('Please select an image')
    return
  }

  setSubmitting(true)

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', values.title)
    formData.append('author', values.author)
    formData.append('description', values.description || '')

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!res.ok) throw new Error()

    const data = await res.json()

    toast.success('Photo uploaded successfully!')

    form.resetFields()
    handleRemove()

  } catch (err) {
    toast.error(err instanceof Error ? err.message : 'Upload failed')
  } finally {
    setSubmitting(false)
  }
}

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      disabled={submitting }
    >
      {/* Upload */}
      <Form.Item label="Select Image" required>
        {!file ? (
          <div
            className={styles.dragger}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className={styles.dragContent}>
              <InboxOutlined style={{ fontSize: 48, color: '#1890ff' }} />
              <p>Drag and drop your image here</p>

              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <label htmlFor="file-input">
                <Button type="primary" onClick={() => document.getElementById('file-input')?.click()}>
                  Select File
                </Button>
              </label>
            </div>
          </div>
        ) : (
          <div className={styles.filePreview}>
            <Space direction="vertical">
              <Image
                src={preview}
                width={150}
                height={150}
                style={{ objectFit: 'cover' }}
              />

              {submitting && (
                <Progress percent={progress} status="active" />
              )}

              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={handleRemove}
              >
                Remove
              </Button>
            </Space>
          </div>
        )}
      </Form.Item>

      <Divider />

      <Form.Item
        name="title"
        label="Photo Title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="author"
        label="Your Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
          style={{ width: '100%' }}
        >
          Upload Photo
        </Button>
      </Form.Item>
    </Form>
  )
}