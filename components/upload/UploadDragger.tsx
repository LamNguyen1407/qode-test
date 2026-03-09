'use client'

import { useState, useRef } from 'react'
import { Form, Input, Button, Space, Image, Progress, Divider, Typography } from 'antd'
import { InboxOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import styles from './UploadDragger.module.css'

const { Text } = Typography

interface UploadDraggerProps {
  onUploadSuccess?: () => void
}

export default function UploadDragger({ onUploadSuccess }: UploadDraggerProps) {

  const [form] = Form.useForm()

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [progress, setProgress] = useState(0)
  const [uploadSpeed, setUploadSpeed] = useState('')
  const [uploadedSize, setUploadedSize] = useState(0)

  const [submitting, setSubmitting] = useState(false)

  const xhrRef = useRef<XMLHttpRequest | null>(null)

  /* ---------------- file validation ---------------- */

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

  /* ---------------- drag drop ---------------- */

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files?.[0]) handleFile(files[0])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.[0]) handleFile(files[0])
  }

  /* ---------------- remove file ---------------- */

  const handleRemove = () => {
    setFile(null)
    setPreview('')
    setProgress(0)
    setUploadSpeed('')
    setUploadedSize(0)
  }

  /* ---------------- cancel upload ---------------- */

  const cancelUpload = () => {
    xhrRef.current?.abort()
    setSubmitting(false)
    setProgress(0)
    toast.info("Upload cancelled")
  }

  /* ---------------- upload ---------------- */

  const handleSubmit = async (values: any) => {

    if (!file) {
      toast.error("Please select an image")
      return
    }

    setSubmitting(true)
    setProgress(0)

    const formData = new FormData()

    formData.append('file', file)
    formData.append('title', values.title)
    formData.append('author', values.author)
    formData.append('description', values.description || '')

    const xhr = new XMLHttpRequest()

    xhrRef.current = xhr

    xhr.open("POST", "/api/upload")

    let startTime = Date.now()

    xhr.upload.onprogress = (event) => {

      if (!event.lengthComputable) return

      const percent = Math.round((event.loaded / event.total) * 100)

      setProgress(percent)

      setUploadedSize(event.loaded)

      const timeElapsed = (Date.now() - startTime) / 1000

      const speed = event.loaded / timeElapsed

      setUploadSpeed(formatSpeed(speed))
    }

    xhr.onload = () => {

      if (xhr.status >= 200 && xhr.status < 300) {

        setProgress(100)

        toast.success("Photo uploaded successfully!")

        form.resetFields()

        handleRemove()

        onUploadSuccess?.()

      } else {

        toast.error("Upload failed")

      }

      setSubmitting(false)
    }

    xhr.onerror = () => {
      toast.error("Upload failed")
      setSubmitting(false)
    }

    xhr.send(formData)
  }

  /* ---------------- helpers ---------------- */

  const formatSize = (bytes: number) => {

    if (bytes < 1024) return bytes + " B"

    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"

    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  const formatSpeed = (bytesPerSecond: number) => {

    if (bytesPerSecond < 1024) return bytesPerSecond.toFixed(0) + " B/s"

    if (bytesPerSecond < 1024 * 1024)
      return (bytesPerSecond / 1024).toFixed(1) + " KB/s"

    return (bytesPerSecond / (1024 * 1024)).toFixed(2) + " MB/s"
  }

  /* ---------------- UI ---------------- */

  return (

    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      disabled={submitting}
    >

      {/* Upload area */}

      <Form.Item label="Select Image" required>

        {!file ? (

          <div
            className={styles.dragger}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >

            <div className={styles.dragContent}>

              <InboxOutlined style={{ fontSize: 48, color: "#1890ff" }} />

              <p>Drag and drop your image here</p>

              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              <label htmlFor="file-input">

                <Button
                  type="primary"
                  onClick={() =>
                    document.getElementById("file-input")?.click()
                  }
                >
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
                width={160}
                height={160}
                style={{ objectFit: "cover" }}
              />

              {submitting && (

                <>
                  <Progress percent={progress} status="active" />

                  <Text type="secondary">
                    {formatSize(uploadedSize)} / {formatSize(file.size)}
                  </Text>

                  <Text type="secondary">
                    Speed: {uploadSpeed}
                  </Text>

                  <Button
                    danger
                    icon={<CloseCircleOutlined />}
                    onClick={cancelUpload}
                  >
                    Cancel Upload
                  </Button>
                </>
              )}

              {!submitting && (

                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleRemove}
                >
                  Remove
                </Button>

              )}

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
          style={{ width: "100%" }}
        >
          Upload Photo
        </Button>

      </Form.Item>

    </Form>
  )
}