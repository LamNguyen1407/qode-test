'use client'

import { useState, useCallback, useEffect } from 'react'
import { Layout, Space, Typography, Pagination } from 'antd'
import Navbar from '@/components/layout/Navbar'
import PhotoGrid from '@/components/photo/PhotoGrid'
import styles from './page.module.css'

const { Content } = Layout
const { Title } = Typography

export default function Home() {

  const [photos, setPhotos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [limit] = useState(12)
  const [total, setTotal] = useState(0)

  const fetchPhotos = async (pageNumber = 1) => {
    setLoading(true)

    try {
      const res = await fetch(`/api/photos?page=${pageNumber}&limit=${limit}`)
      const data = await res.json()

      setPhotos(data.data)
      setTotal(data.total)

    } catch (err) {
      console.error('Failed to fetch photos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos(page)
  }, [page])

  const handleUploadSuccess = useCallback(() => {
    fetchPhotos(page)
  }, [page])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

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

            <Pagination
              align='center'
              current={page}
              total={total}
              pageSize={limit}
              onChange={handlePageChange}
              style={{ textAlign: 'center', marginTop: 24 }}
            />

          </Space>

        </div>
      </Content>

    </Layout>
  )
}