'use client'

import { Layout, Button, Space, Modal } from 'antd'
import { PlusOutlined, CameraOutlined } from '@ant-design/icons'
import Link from 'next/link'
import UploadModal from '@/components/upload/UploadModal'
import { useState } from 'react'
import styles from './Navbar.module.css'

const { Header } = Layout

interface NavbarProps {
  onUploadSuccess?: () => void
}

export default function Navbar({ onUploadSuccess }: NavbarProps) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  return (
    <>
      <Header className={styles.navbar}>
        <div className={styles.navContent}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div className={styles.logo}>
              <CameraOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>PhotoGallery</span>
            </div>
          </Link>

          <Space size="large">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setUploadModalOpen(true)}
            >
              Upload Photo
            </Button>
          </Space>
        </div>
      </Header>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSuccess={() => {
          setUploadModalOpen(false)
          onUploadSuccess?.()
        }}
      />
    </>
  )
}
