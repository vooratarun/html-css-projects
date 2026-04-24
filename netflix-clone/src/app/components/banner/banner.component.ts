import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  title = 'Money Heist';
  description = 'To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: n...';

  onPlayClick(): void {
    console.log('Play button clicked');
  }

  onMyListClick(): void {
    console.log('My List button clicked');
  }
}

