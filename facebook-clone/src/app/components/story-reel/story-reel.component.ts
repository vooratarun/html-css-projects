import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Story } from '../../models/feed.models';

@Component({
  selector: 'app-story-reel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story-reel.component.html'
})
export class StoryReelComponent {
  @Input({ required: true }) stories: Story[] = [];
}

