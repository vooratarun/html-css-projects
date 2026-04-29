import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

const LIKED_VIDEOS_URL_PATTERN = /\/users\/\d+\/liked-videos/;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();

  // Attach Bearer token specifically for liked-videos API calls
  if (token && LIKED_VIDEOS_URL_PATTERN.test(req.url)) {
    const clonedRequest = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};

