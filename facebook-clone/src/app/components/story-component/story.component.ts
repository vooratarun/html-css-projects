import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Story } from '../../models/feed.models';

@Component({
    selector: 'app-story',
    standalone: true,
    templateUrl: './story.component.html'

})
export class StoryComponent {

    @Input() story!: Story;

    @Output() storyClicked = new EventEmitter<Story>();
    @Output() storyDeleted = new EventEmitter<Story>();

    onStoryClick() {
        this.storyClicked.emit(this.story);
    }

    onDeleteClick(event: MouseEvent) {
        event.stopPropagation();
        this.storyDeleted.emit(this.story);
    }
}
