'use client'

import { Photo } from '@/types/photo'
import { Card, Space, Typography, Badge } from 'antd'
import { CommentOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import styles from './PhotoCard.module.css'

const { Title, Text } = Typography

interface PhotoCardProps {
  photo: Photo
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <Link href={`/photos/${photo.id}`}>
      <Card
        className={styles.card}
        cover={
          <div className={styles.imageContainer}>
            <Image
              src={photo.url}
              alt={photo.title}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        }
        hoverable
      >
        <Space direction="vertical" style={{ width: '100%' }} size={8}>
          <Title level={5} style={{ margin: 0, textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {photo.title}
          </Title>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            by {photo.author}
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge
              count={photo.commentCount}
              style={{ backgroundColor: '#1890ff' }}
              icon={<CommentOutlined />}
            />
          </div>
        </Space>
      </Card>
    </Link>
  )
}
