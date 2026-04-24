import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-row.component.html',
  styleUrl: './movie-row.component.scss'
})
export class MovieRowComponent {
  @Input() title: string = '';
  @Input() posters: string[] = [];
  @Input() isLarge: boolean = false;
}

