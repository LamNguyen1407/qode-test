export interface Photo {
  id: string;
  url: string;
  title: string;
  description?: string;
  createdAt: Date;
  authorName: string;
  _count: {
    comments: number;
  };
}
