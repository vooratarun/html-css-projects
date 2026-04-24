import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface WidgetArticle {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-widgets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widgets.component.html'
})
export class WidgetsComponent {
  articles: WidgetArticle[] = [
    { id: 1, title: 'Coding LinkedIn Clone', description: 'Top news - 4500 readers' },
    { id: 2, title: 'Coding LinkedIn Clone', description: 'Top news - 4500 readers' },
    { id: 3, title: 'Coding LinkedIn Clone', description: 'Top news - 4500 readers' }
  ];

  trackByArticleId(index: number, article: WidgetArticle): number {
    return article.id;
  }
}

