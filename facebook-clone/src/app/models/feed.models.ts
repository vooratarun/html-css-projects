export interface SidebarItem {
  icon: string;
  label: string;
  data?: any;
}

export interface Story {
  backgroundImage: string;
  avatar: string;
  title: string;
  id : number
}

export interface Post {
  author: string;
  timestamp: string;
  message: string;
  avatar: string;
  imageUrl?: string;
}

