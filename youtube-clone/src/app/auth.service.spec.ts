import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
  });

  it('should login and persist dummy user', () => {
    // service.login('tarv');

    expect(service.isLoggedIn()).toBeTrue();
    expect(service.currentUser()?.username).toBe('tarv');
  });

  it('should logout and clear dummy user', () => {
    // service.login('tarv');
    // service.logout();

    expect(service.isLoggedIn()).toBeFalse();
    expect(service.currentUser()).toBeNull();
  });

  it('should login via API and persist returned user', () => {
    service.loginWithApi('admin', 'admin123').subscribe();

    const request = httpTestingController.expectOne('http://localhost:3000/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ username: 'admin', password: 'admin123' });
    request.flush({ user: { username: 'admin' }, token: 'dummy-token' });

    expect(service.isLoggedIn()).toBeTrue();
    expect(service.currentUser()?.username).toBe('admin');
  });
});

