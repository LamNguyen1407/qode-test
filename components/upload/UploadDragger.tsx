'use client'

import { useState } from 'react'
import { Upload, Form, Input, Button, Space, Image, Progress, message, Divider } from 'antd'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd'
import styles from './UploadDragger.module.css'

interface UploadDraggerProps {
  onSubmit: (title: string, url: string, author: string, description?: string) => Promise<void>
  loading?: boolean
}

export default function UploadDragger({ onSubmit, loading = false }: UploadDraggerProps) {
  const [form] = Form.useForm()
  const [file, setFile] = useState<UploadFile | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        handleFile(file)
      } else {
        message.error('Please upload an image file')
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      setPreview(preview)
      setFile({
        uid: `-${Date.now()}`,
        name: file.name,
        status: 'done',
        url: preview,
      })
      
      // Simulate upload progress
      setUploading(true)
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += Math.random() * 30
        if (currentProgress >= 100) {
          currentProgress = 100
          clearInterval(interval)
          setProgress(100)
          setUploading(false)
        } else {
          setProgress(currentProgress)
        }
      }, 200)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setFile(null)
    setPreview('')
    setProgress(0)
  }

  const handleSubmit = async (values: any) => {
    if (!file) {
      message.error('Please select an image')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit(values.title, preview, values.author, values.description)
      form.resetFields()
      handleRemove()
      message.success('Photo uploaded successfully!')
    } catch (error) {
      message.error('Failed to upload photo')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      disabled={submitting || loading}
    >
      {/* File Upload */}
      <Form.Item label="Select Image" required>
        {!file ? (
          <div
            className={styles.dragger}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <div className={styles.dragContent}>
              <InboxOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
              <p style={{ fontSize: '16px', fontWeight: 500 }}>
                Drag and drop your image here
              </p>
              <p style={{ fontSize: '14px', color: '#8c8c8c' }}>
                or
              </p>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                <Button type="primary">Click to select file</Button>
              </label>
              <p style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '12px' }}>
                Supported formats: JPG, PNG, GIF, WebP
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.filePreview}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div className={styles.preview}>
                <Image
                  src={preview}
                  alt="Preview"
                  width={150}
                  height={150}
                  style={{ objectFit: 'cover', borderRadius: '4px' }}
                />
              </div>
              {uploading && (
                <Progress percent={Math.round(progress)} status="active" />
              )}
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={handleRemove}
                disabled={uploading}
              >
                Remove image
              </Button>
            </Space>
          </div>
        )}
      </Form.Item>

      <Divider />

      {/* Photo Details */}
      <Form.Item
        name="title"
        label="Photo Title"
        rules={[{ required: true, message: 'Please enter a title' }]}
      >
        <Input placeholder="e.g., Beautiful Sunset" />
      </Form.Item>

      <Form.Item
        name="author"
        label="Your Name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input placeholder="Your name" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description (Optional)"
      >
        <Input.TextArea
          placeholder="Add a description of your photo"
          rows={3}
        />
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
