import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  isNavbarBlack$: Observable<boolean>;

  constructor() {
    this.isNavbarBlack$ = fromEvent(window, 'scroll').pipe(
      map(() => window.scrollY >= 100),
      startWith(false)
    );
  }
}

