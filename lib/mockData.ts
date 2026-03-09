// import { Photo } from '@/types/photo'
// import { Comment } from '@/types/comment'

// // Mock photos - using placeholder images from Unsplash
// const mockPhotos: Photo[] = [
//   {
//     id: '1',
//     url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
//     title: 'Mountain Landscape',
//     description: 'Beautiful mountain scenery at sunset',
//     createdAt: new Date('2024-03-08'),
//     author: 'Alex Chen',
//     commentCount: 5,
//   },
//   {
//     id: '2',
//     url: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800&h=600&fit=crop',
//     title: 'Ocean Waves',
//     description: 'Calm ocean waves on a peaceful morning',
//     createdAt: new Date('2024-03-07'),
//     author: 'Jordan Lee',
//     commentCount: 3,
//   },
//   {
//     id: '3',
//     url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop',
//     title: 'Desert Dunes',
//     description: 'Golden sands under a clear sky',
//     createdAt: new Date('2024-03-06'),
//     author: 'Sam Taylor',
//     commentCount: 8,
//   },
//   {
//     id: '4',
//     url: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&h=600&fit=crop',
//     title: 'Aurora Borealis',
//     description: 'Northern lights dancing across the sky',
//     createdAt: new Date('2024-03-05'),
//     author: 'Morgan Lake',
//     commentCount: 12,
//   },
//   {
//     id: '5',
//     url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
//     title: 'Forest Path',
//     description: 'A peaceful walk through nature',
//     createdAt: new Date('2024-03-04'),
//     author: 'Casey Woods',
//     commentCount: 4,
//   },
//   {
//     id: '6',
//     url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
//     title: 'Starry Night',
//     description: 'Countless stars in the night sky',
//     createdAt: new Date('2024-03-03'),
//     author: 'Riley Park',
//     commentCount: 6,
//   },
//   {
//     id: '7',
//     url: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800&h=600&fit=crop',
//     title: 'Waterfall',
//     description: 'Cascading water in a lush valley',
//     createdAt: new Date('2024-03-02'),
//     author: 'Alex Chen',
//     commentCount: 7,
//   },
//   {
//     id: '8',
//     url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop',
//     title: 'City Lights',
//     description: 'Urban landscape at night',
//     createdAt: new Date('2024-03-01'),
//     author: 'Jordan Lee',
//     commentCount: 9,
//   },
// ]

// const mockComments: Comment[] = [
//   {
//     id: 'c1',
//     photoId: '1',
//     author: 'Emma Wilson',
//     text: 'Absolutely stunning! The colors are breathtaking.',
//     createdAt: new Date('2024-03-08T10:30:00'),
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
//   },
//   {
//     id: 'c2',
//     photoId: '1',
//     author: 'David Park',
//     text: 'When was this taken? I need to visit this place!',
//     createdAt: new Date('2024-03-08T11:15:00'),
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
//   },
//   {
//     id: 'c3',
//     photoId: '1',
//     author: 'Sarah Johnson',
//     text: 'Amazing perspective and lighting. Professional work!',
//     createdAt: new Date('2024-03-08T12:00:00'),
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
//   },
//   {
//     id: 'c4',
//     photoId: '2',
//     author: 'Mike Chen',
//     text: 'So peaceful. This is my new desktop background.',
//     createdAt: new Date('2024-03-07T14:20:00'),
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
//   },
//   {
//     id: 'c5',
//     photoId: '2',
//     author: 'Lisa Anderson',
//     text: 'Great shot! Love the composition.',
//     createdAt: new Date('2024-03-07T15:45:00'),
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
//   },
//   {
//     id: 'c6',
//     photoId: '4',
//     author: 'Tom Bradley',
//     text: 'I saw this in Iceland last year. Magical experience!',
//     createdAt: new Date('2024-03-05T08:30:00'),
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
//   },
// ]

// export function getAllPhotos(): Photo[] {
//   return mockPhotos
// }

// export function getPhotoById(id: string): Photo | undefined {
//   return mockPhotos.find(photo => photo.id === id)
// }

// export function getCommentsByPhotoId(photoId: string): Comment[] {
//   return mockComments.filter(comment => comment.photoId === photoId)
// }

// export function addComment(photoId: string, author: string, text: string): Comment {
//   const newComment: Comment = {
//     id: `c${Date.now()}`,
//     photoId,
//     author,
//     text,
//     createdAt: new Date(),
//     avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`,
//   }
//   mockComments.push(newComment)
  
//   // Update comment count
//   const photo = mockPhotos.find(p => p.id === photoId)
//   if (photo) {
//     photo.commentCount++
//   }
  
//   return newComment
// }

// export function addPhoto(title: string, url: string, author: string, description?: string): Photo {
//   const newPhoto: Photo = {
//     id: `p${Date.now()}`,
//     url,
//     title,
//     description,
//     createdAt: new Date(),
//     author,
//     commentCount: 0,
//   }
//   mockPhotos.unshift(newPhoto)
//   return newPhoto
// }
