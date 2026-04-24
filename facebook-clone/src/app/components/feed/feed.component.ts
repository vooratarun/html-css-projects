import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { StoryReelComponent } from '../story-reel/story-reel.component';
import { MessageSenderComponent } from '../message-sender/message-sender.component';
import { Post, Story } from '../../models/feed.models';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, StoryReelComponent, MessageSenderComponent, PostCardComponent],
  templateUrl: './feed.component.html'
})
export class FeedComponent {
  readonly stories: Story[] = [
    {
      backgroundImage:
        'https://images.unsplash.com/photo-1527082395-e939b847da0d?ixlib=rb-1.2.1&w=1000&q=80',
      avatar: 'https://www.shareicon.net/data/2016/05/24/770139_man_512x512.png',
      title: 'Somanath Goudar'
    },
    {
      backgroundImage: 'https://cellularnews.com/wp-content/uploads/2020/04/Delete-photo-337x600.jpg',
      avatar: 'https://image.freepik.com/free-vector/businessman-avatar-cartoon-character-profile_18591-50584.jpg',
      title: 'Somanath Goudar'
    },
    {
      backgroundImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBHC2s4NFdzXEsVzvBPGjkrSePQa-8XFuNtQ&usqp=CAU',
      avatar: 'https://www.shareicon.net/data/2016/05/24/770139_man_512x512.png',
      title: 'Somanath Goudar'
    },
    {
      backgroundImage: 'https://wallpapercave.com/wp/wp7357832.jpg',
      avatar: 'https://www.shareicon.net/data/2016/05/24/770139_man_512x512.png',
      title: 'Somanath Goudar'
    }
  ];

  readonly posts: Post[] = [
    {
      author: 'Somanath Goudar',
      timestamp: '25 April at 20:30',
      message: 'Message',
      avatar: 'https://www.shareicon.net/data/2016/05/24/770139_man_512x512.png',
      imageUrl:
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
      author: 'Somanath Goudar',
      timestamp: '25 April at 20:30',
      message: 'Post Without Image',
      avatar: 'https://www.shareicon.net/data/2016/05/24/770139_man_512x512.png'
    },
    {
      author: 'Somanath Goudar',
      timestamp: '25 April at 20:30',
      message: 'Message',
      avatar: 'https://www.shareicon.net/data/2016/05/24/770139_man_512x512.png',
      imageUrl: 'https://wallpapercave.com/wp/wp7357832.jpg'
    }
  ];
}

