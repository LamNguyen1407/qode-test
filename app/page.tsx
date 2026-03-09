'use client'

import { useState, useCallback } from 'react'
import { Layout, Space, Typography } from 'antd'
import Navbar from '@/components/layout/Navbar'
import PhotoGrid from '@/components/photo/PhotoGrid'
import { getAllPhotos } from '@/lib/mockData'
import styles from './page.module.css'

const { Content } = Layout
const { Title } = Typography

export default function Home() {
  const [photos, setPhotos] = useState(getAllPhotos())
  const [key, setKey] = useState(0)

  const handleUploadSuccess = useCallback(() => {
    // Refresh the photos by getting fresh data
    setPhotos(getAllPhotos())
    setKey(prev => prev + 1)
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar onUploadSuccess={handleUploadSuccess} />
      <Content className={styles.content}>
        <div className={styles.container}>
          <Space direction="vertical" style={{ width: '100%' }} size={24}>
            <div>
              <Title level={2} style={{ margin: 0 }}>
                Photo Gallery
              </Title>
              <Typography.Text type="secondary">
                Explore beautiful photos from our community
              </Typography.Text>
            </div>
            <PhotoGrid key={key} photos={photos} />
          </Space>
        </div>
      </Content>
    </Layout>
  )
}
