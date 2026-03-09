'use client'

import { Photo } from '@/types/photo'
import { Row, Col, Empty, Skeleton, Space } from 'antd'
import PhotoCard from './PhotoCard'
import styles from './PhotoGrid.module.css'

interface PhotoGridProps {
  photos: Photo[]
  loading?: boolean
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    xxl?: number
  }
}

export default function PhotoGrid({
  photos,
  loading = false,
  columns = {
    xs: 1,
    sm: 1,
    md: 2,
    lg: 4,
    xl: 4,
    xxl: 4,
  },
}: PhotoGridProps) {
  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        {[...Array(8)].map((_, index) => (
          <Col key={index} xs={columns.xs} sm={columns.sm} md={columns.md} lg={columns.lg} xl={columns.xl} xxl={columns.xxl}>
            <Skeleton.Avatar active size={{ width: '100%', height: 200 }} shape="square" />
          </Col>
        ))}
      </Row>
    )
  }

  if (photos.length === 0) {
    return <Empty description="No photos found" style={{ marginTop: '48px' }} />
  }

  return (
    <Row gutter={[16, 16]} className={styles.grid}>
      {photos.map((photo) => (
        <Col key={photo.id} xs={columns.xs} sm={columns.sm} md={columns.md} lg={columns.lg} xl={columns.xl} xxl={columns.xxl}>
          <PhotoCard photo={photo} />
        </Col>
      ))}
    </Row>
  )
}
