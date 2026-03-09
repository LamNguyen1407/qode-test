'use client'

import { Modal, message } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import UploadDragger from './UploadDragger'
import { useState } from 'react'

interface UploadModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function UploadModal({ open, onClose, onSuccess }: UploadModalProps) {

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
      styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
    >
      <UploadDragger onUploadSuccess={onSuccess} />
    </Modal>
  )
}