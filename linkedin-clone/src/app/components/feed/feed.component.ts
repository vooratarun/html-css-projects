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

  trackByPostId(index: number, post: FeedPost): number {
    return post.id;
  }
}

