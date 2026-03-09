'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Layout, Row, Col, Card, Space, Typography, Button, Image, Spin, Empty, message } from 'antd'
import { ArrowLeftOutlined, CalendarOutlined, UserOutlined, CommentOutlined } from '@ant-design/icons'
import Navbar from '@/components/layout/Navbar'
import CommentList from '@/components/comments/CommentList'
import CommentInput from '@/components/comments/CommentInput'
// import { getPhotoById, getCommentsByPhotoId, addComment } from '@/lib/mockData'
import { Photo } from '@/types/photo'
import { Comment } from '@/types/comment'
import styles from './page.module.css'

const { Content } = Layout
const { Title, Text } = Typography

export default function PhotoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const photoId = params.id as string
  
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const photo = getPhotoById(photoId)
    if (photo) {
      setPhoto(photo)
      setComments(getCommentsByPhotoId(photoId))
    }
    setLoading(false)
  }, [photoId])

  const handleAddComment = async (author: string, text: string) => {
    setSubmitting(true)
    try {
      const newComment = addComment(photoId, author, text)
      setComments([...comments, newComment])
      if (photo) {
        setPhoto({ ...photo, commentCount: photo.commentCount + 1 })
      }
      message.success('Comment posted!')
    } catch (error) {
      message.error('Failed to post comment')
      throw error
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar />
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Spin />
        </Content>
      </Layout>
    )
  }

  if (!photo) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar />
        <Content className={styles.content}>
          <div className={styles.container}>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
              Back
            </Button>
            <Empty description="Photo not found" style={{ marginTop: '48px' }} />
          </div>
        </Content>
      </Layout>
    )
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content className={styles.content}>
        <div className={styles.container}>
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
            Back
          </Button>

          <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
            {/* Photo Section */}
            <Col xs={24} md={14} className={styles.photoSection}>
              <Card className={styles.photoCard}>
                <div className={styles.photoContainer}>
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    width="100%"
                    className={styles.photo}
                    preview={false}
                  />
                </div>
              </Card>
            </Col>

            {/* Details Section */}
            <Col xs={24} md={10}>
              <Space direction="vertical" style={{ width: '100%' }} size={24}>
                {/* Photo Info Card */}
                <Card>
                  <Space direction="vertical" style={{ width: '100%' }} size={16}>
                    <Title level={3} style={{ margin: 0 }}>
                      {photo.title}
                    </Title>
                    
                    {photo.description && (
                      <Text>{photo.description}</Text>
                    )}

                    <div className={styles.metaInfo}>
                      <Space>
                        <UserOutlined />
                        <Text>{photo.authorName}</Text>
                      </Space>
                    </div>

                    <div className={styles.metaInfo}>
                      <Space>
                        <CalendarOutlined />
                        <Text>{formatDate(photo.createdAt)}</Text>
                      </Space>
                    </div>

                    <div className={styles.metaInfo}>
                      <Space>
                        <CommentOutlined />
                        <Text>{photo.commentCount} comments</Text>
                      </Space>
                    </div>
                  </Space>
                </Card>

                {/* Comments Section */}
                <Card className={styles.commentsCard}>
                  <CommentList comments={comments} />
                </Card>

                {/* Comment Input */}
                <Card>
                  <CommentInput onSubmit={handleAddComment} loading={submitting} />
                </Card>
              </Space>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  )
}
