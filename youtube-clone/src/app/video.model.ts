export type VideoCard = {
  id: number;
  thumbnailUrl: string;
  authorImageUrl: string;
  title: string;
  channelName: string;
  category?: string;
  categoryId?: number;
  categoryName?: string;
  meta: string;
};

export type ApiVideo = Partial<VideoCard> & {
  id: number;
  thumbnail?: string;
  authorImage?: string;
  channel?: string;
  views?: string;
  publishedAt?: string;
};

export type VideoComment = {
  id: number;
  videoId: number;
  userId: number;
  username: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiVideoComment = Partial<VideoComment> & {
  id: number;
};

export interface VideoCardAdd {
  thumbnailUrl: string;
  authorImageUrl: string;
  title: string;
  channelName: string;
  categoryId: number;
  categoryName: string;
  meta: string;
}

export type VideoUploadPayload = VideoCardAdd;

