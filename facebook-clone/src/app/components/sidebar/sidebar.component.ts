import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarItem } from '../../models/feed.models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  readonly avatar = 'https://www.shareicon.net/data/2016/05/24/770139_man_512x512.png';

  readonly items: SidebarItem[] = [
    { icon: 'local_hospital', label: 'Covid - 19 Information Center' },
    { icon: 'emoji_flags', label: 'Pages' },
    { icon: 'people', label: 'People' },
    { icon: 'chat', label: 'Messenger' },
    { icon: 'storefront', label: 'Marketplace' },
    { icon: 'video_library', label: 'Videos' },
    { icon: 'expand_more', label: 'More' }
  ];
}

