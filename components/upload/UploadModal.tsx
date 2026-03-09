'use client'

import { Modal } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import UploadDragger from './UploadDragger'
import { addPhoto } from '@/lib/mockData'
import { useState } from 'react'

interface UploadModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function UploadModal({ open, onClose, onSuccess }: UploadModalProps) {
  const [loading, setLoading] = useState(false)

  const handleUpload = async (title: string, url: string, author: string, description?: string) => {
    setLoading(true)
    try {
      // Simulate a slight delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
      addPhoto(title, url, author, description)
      onSuccess?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CloudUploadOutlined />
          <span>Upload a Photo</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <UploadDragger onSubmit={handleUpload} loading={loading} />
    </Modal>
  )
}
