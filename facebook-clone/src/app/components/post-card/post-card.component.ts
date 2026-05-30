import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Post } from '../../models/feed.models';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html'
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;

  postOptions = [
    {
      icon: 'thumb_up',
      label: 'Like'
    },
    {
      icon: 'chat_bubble_outline',
      label: 'Comment'
    },
    {
      icon: 'near_me',
      label: 'Share'
    }
  ];
}

