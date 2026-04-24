export type VideoCard = {
  id: number;
  thumbnailUrl: string;
  authorImageUrl: string;
  title: string;
  channelName: string;
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

export interface VideoCardAdd {
  thumbnailUrl: string;
  authorImageUrl: string;
  title: string;
  channelName: string;
  meta: string;
}

export type VideoUploadPayload = VideoCardAdd;

