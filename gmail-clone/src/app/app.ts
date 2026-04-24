import { Component } from '@angular/core';
import { EmailListComponent } from './components/email-list/email-list.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmailRow, SectionItem, SidebarItem } from './models';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SidebarComponent, EmailListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly sidebarItems: SidebarItem[] = [
    { icon: 'inbox', label: 'Inbox', active: true },
    { icon: 'star', label: 'Starred' },
    { icon: 'access_time', label: 'Snoozed' },
    { icon: 'label_important', label: 'Important' },
    { icon: 'near_me', label: 'Sent' },
    { icon: 'note', label: 'Drafts' },
    { icon: 'expand_more', label: 'More' }
  ];

  protected readonly sectionItems: SectionItem[] = [
    { icon: 'inbox', label: 'Primary', selected: true },
    { icon: 'people', label: 'Social' },
    { icon: 'local_offer', label: 'Promotions' }
  ];

  protected readonly emailRows: EmailRow[] = [
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'Google', subject: 'Login on New Device', description: 'is this your Device ?', time: '2am' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'Google', subject: 'Login on New Device', description: 'is this your Device ?', time: '2am' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'Google', subject: 'Login on New Device', description: 'is this your Device ?', time: '2am' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'Google', subject: 'Login on New Device', description: 'is this your Device ?', time: '2am' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'YouTube', subject: 'You Got a New Subscriber', description: 'on Your Channel Future Coders', time: '10pm' },
    { sender: 'Google', subject: 'Login on New Device', description: 'is this your Device ?', time: '2am' }
  ];
}
