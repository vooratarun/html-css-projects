import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page';
import { LoginPageComponent } from './login-page/login-page';
import { LogoutPageComponent } from './logout-page/logout-page';
import { VideoDetailsComponent } from './video-details/video-details';
import { LikedVideosPageComponent } from './liked-videos-page/liked-videos-page';
import { RegisterPageComponent } from './register-page/register-page';

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
    path: 'liked-videos',
    component: LikedVideosPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'logout',
    component: LogoutPageComponent
  }
];

