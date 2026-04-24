import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly avatar = 'https://www.shareicon.net/data/2016/05/24/770139_man_512x512.png';
}

