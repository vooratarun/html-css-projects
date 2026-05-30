import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarItem } from '../../models/feed.models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  readonly avatar = 'https://www.shareicon.net/data/2016/05/24/770139_man_512x512.png';

  selectedTitle = "";

  readonly items: SidebarItem[] = [
    {
      icon: 'local_hospital',
      label: 'Covid - 19 Information Center',
      data: { count: Math.floor(Math.random() * 1000), message: 'Safety updates available' }
    },
    {
      icon: 'emoji_flags',
      label: 'Pages',
      data: { count: Math.floor(Math.random() * 500), message: 'New pages to follow' }
    },
    {
      icon: 'people',
      label: 'People',
      data: { count: Math.floor(Math.random() * 2000), message: 'Friend suggestions' }
    },
    {
      icon: 'chat',
      label: 'Messenger',
      data: { count: Math.floor(Math.random() * 50), message: 'Unread messages' }
    },
    {
      icon: 'storefront',
      label: 'Marketplace',
      data: { count: Math.floor(Math.random() * 300), message: 'Items for sale' }
    },
    {
      icon: 'video_library',
      label: 'Videos',
      data: { count: Math.floor(Math.random() * 150), message: 'Trending videos' }
    },
    {
      icon: 'expand_more',
      label: 'More',
      data: { count: Math.floor(Math.random() * 100), message: 'More options' }
    }
  ];

  private routeMap: { [key: string]: string } = {
    'Covid - 19 Information Center': '/covid-info',
    'Pages': '/pages',
    'People': '/people',
    'Messenger': '/messenger',
    'Marketplace': '/marketplace',
    'Videos': '/videos',
    'More': '/more'
  };

  constructor(private router: Router) {}

  onItemClick(item: SidebarItem) {
    console.log('Clicked:', item);

    this.selectedTitle = item.label;

    const route = this.routeMap[item.label];
    if (route) {
      this.router.navigate([route, item.data?.count ?? 0], {
        queryParams: { message: item.data?.message ?? '' }
      });
    }
  }
}

