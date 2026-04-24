import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page';
import { LoginPageComponent } from './login-page/login-page';
import { LogoutPageComponent } from './logout-page/logout-page';
import { VideoDetailsComponent } from './video-details/video-details';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'video/:id',
    component: VideoDetailsComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'logout',
    component: LogoutPageComponent
  }
];

