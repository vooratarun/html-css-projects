import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FeedPost {
  id: number;
  author: string;
  role: string;
  message: string;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html'
})
export class FeedComponent {
  posts: FeedPost[] = [
    { id: 1, author: 'Somanath Goudar', role: 'Job Description', message: 'Message here' },
    { id: 2, author: 'Somanath Goudar', role: 'Job Description', message: 'Message here' },
    { id: 3, author: 'Somanath Goudar', role: 'Job Description', message: 'Message here' },
    { id: 4, author: 'Somanath Goudar', role: 'Job Description', message: 'Message here' },
    { id: 5, author: 'Somanath Goudar', role: 'Job Description', message: 'Message here' },
    { id: 6, author: 'Somanath Goudar', role: 'Job Description', message: 'Message here' },
    { id: 7, author: 'Somanath Goudar', role: 'Job Description', message: 'Message here' }
  ];

  inputOptions = [
    { icon: 'thumb_up', label: 'Like', color: 'gray' },
    { icon: 'comment', label: 'Comment', color: 'gray' },
    { icon: 'share', label: 'Share', color: 'gray' },
    { icon: 'send', label: 'Send', color: 'gray' }
  ];

  feedOptions = [
    { icon: 'insert_photo', label: 'Photo', color: '#70b5f9' },
    { icon: 'subscriptions', label: 'Video', color: '#e7a33e' },
    { icon: 'event_note', label: 'Event', color: '#c0cbcd' },
    { icon: 'calendar_view_day', label: 'Write Article', color: '#7fc15e' }
  ];


  trackByPostId(index: number, post: FeedPost): number {
    return post.id;
  }
}

