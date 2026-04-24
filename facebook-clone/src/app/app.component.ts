import { Component } from '@angular/core';
import { FeedComponent } from './components/feed/feed.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WidgetsComponent } from './components/widgets/widgets.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FeedComponent, WidgetsComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}

