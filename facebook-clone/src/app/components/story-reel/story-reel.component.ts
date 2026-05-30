import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { Story } from '../../models/feed.models';
import {StoryComponent} from "../story-component/story.component";

@Component({
  selector: 'app-story-reel',
  standalone: true,
  imports: [CommonModule, StoryComponent],
  templateUrl: './story-reel.component.html'
})
export class StoryReelComponent {
  @Input({ required: true }) stories: Story[] = [];
  storyDeleted = output<Story>();


  protected handleStoryClick($event: Story) {
    alert(`Story clicked: ${$event.id}`);
  }

  protected handleStoryDelete(story: Story) {
    this.storyDeleted.emit(story);
  }
}

