'use client'

import { useState, useCallback, useEffect } from 'react'
import { Layout, Space, Typography } from 'antd'
import Navbar from '@/components/layout/Navbar'
import PhotoGrid from '@/components/photo/PhotoGrid'
import styles from './page.module.css'

const { Content } = Layout
const { Title } = Typography

export default function Home() {

  const [photos, setPhotos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/photos')
      const data = await res.json()
      setPhotos(data)
      console.log('Fetched photos:', data)
    } catch (err) {
      console.error('Failed to fetch photos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  const handleUploadSuccess = useCallback(() => {
    fetchPhotos()
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

            <PhotoGrid photos={photos} loading={loading} />

          </Space>
        </div>
      </Content>

    </Layout>
  )
}