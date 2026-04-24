import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: () => void;
      };
    };
  }
}

type SidebarOption = {
  icon: string;
  label: string;
  active?: boolean;
};

type Post = {
  displayName: string;
  username: string;
  description: string;
  image: string;
  avatar: string;
  verified: boolean;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  readonly sidebarOptions: SidebarOption[] = [
    { icon: 'home', label: 'Home', active: true },
    { icon: 'search', label: 'Explore' },
    { icon: 'notifications_none', label: 'Notifications' },
    { icon: 'mail_outline', label: 'Messages' },
    { icon: 'bookmark_border', label: 'Bookmarks' },
    { icon: 'list_alt', label: 'Lists' },
    { icon: 'perm_identity', label: 'Profile' },
    { icon: 'more_horiz', label: 'More' }
  ];

  readonly posts: Post[] = [
    {
      displayName: 'Somanath Goudar',
      username: '@somanathg',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      image: 'images/car.jpg',
      avatar: 'images/profile.png',
      verified: true
    },
    {
      displayName: 'Somanath Goudar',
      username: '@somanathg',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      image: 'images/car.jpg',
      avatar: 'images/profile.png',
      verified: true
    }
  ];

  readonly profileImage = 'images/profile.png';

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  ngAfterViewInit(): void {
    this.loadTwitterWidgets();
  }

  trackByLabel(_: number, option: SidebarOption): string {
    return option.label;
  }

  trackByPost(index: number, post: Post): string {
    return `${index}-${post.username}-${post.image}`;
  }

  private loadTwitterWidgets(): void {
    const existingScript = this.document.getElementById('twitter-wjs');

    if (existingScript) {
      window.twttr?.widgets?.load();
      return;
    }

    const script = this.document.createElement('script');
    script.id = 'twitter-wjs';
    script.async = true;
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';
    script.onload = () => window.twttr?.widgets?.load();

    this.document.body.appendChild(script);
  }
}
