import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  recentTopics: string[] = ['reactjs', 'programming', 'softwareengineering', 'design', 'developer'];
}

