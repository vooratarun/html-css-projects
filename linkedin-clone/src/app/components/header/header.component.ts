import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  headerOptions = [
    { icon: 'home', label: 'Home' },
    { icon: 'supervisor_account', label: 'My Network' },
    { icon: 'business_center', label: 'Jobs' },
    { icon: 'chat', label: 'Messaging' },
    { icon: 'notifications', label: 'Notifications' },
    { icon: 'account_circle', label: 'Me' }
  ];

}

