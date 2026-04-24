import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

type DummyUser = {
  username: string;
};

const AUTH_STORAGE_KEY = 'youtube-clone-auth-user';
const AUTH_TOKEN_STORAGE_KEY = 'youtube-clone-auth-token';

type LoginApiResponse = {
  username?: string;
  token?: string;
  message?: string;
  user?: {
    id?: number;
    "username": string,
    "name": string
  };
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly loginApiUrl = 'http://localhost:3000/login';
  private readonly currentUserSignal = signal<DummyUser | null>(this.readStoredUser());

  readonly currentUser = computed(() => this.currentUserSignal());
  readonly isLoggedIn = computed(() => this.currentUserSignal() !== null);

  // login(username: string): void {
  //   const user = this.toStoredUser(username);
  //   this.persistUser(user);
  // }

  loginWithApi(username: string, password: string): Observable<void> {
    return this.http.post<LoginApiResponse>(this.loginApiUrl, { username, password }).pipe(
      tap((response) => {
        const resolvedUsername = response.user?.username ?? response.username ?? username;
        const user = this.toStoredUser(resolvedUsername);

        if (response.token) {
          localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, response.token);
        }

        this.persistUser(user);
      }),
      map(() => void 0)
    );
  }

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    this.currentUserSignal.set(null);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  }

  private persistUser(user: DummyUser): void {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    this.currentUserSignal.set(user);
  }

  private toStoredUser(username: string): DummyUser {
    const trimmedUsername = username.trim() || 'Guest User';
    return { username: trimmedUsername };
  }

  private readStoredUser(): DummyUser | null {
    const rawUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as DummyUser;
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  }
}
