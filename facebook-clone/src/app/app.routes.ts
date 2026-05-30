import { Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { CovidInfoComponent } from './pages/covid-info/covid-info.component';
import { PagesComponent } from './pages/pages/pages.component';
import { PeopleComponent } from './pages/people/people.component';
import { MessengerComponent } from './pages/messenger/messenger.component';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { VideosComponent } from './pages/videos/videos.component';
import { MoreComponent } from './pages/more/more.component';

export const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'covid-info/:count', component: CovidInfoComponent },
  { path: 'pages/:count', component: PagesComponent },
  { path: 'people/:count', component: PeopleComponent },
  { path: 'messenger/:count', component: MessengerComponent },
  { path: 'marketplace/:count', component: MarketplaceComponent },
  { path: 'videos/:count', component: VideosComponent },
  { path: 'more/:count', component: MoreComponent }
];

