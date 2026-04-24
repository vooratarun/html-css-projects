import { TestBed } from '@angular/core/testing';
import { App } from './app';
describe('App', () => {
  beforeEach(async () => {
    document.getElementById('twitter-wjs')?.remove();
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });
  afterEach(() => {
    document.getElementById('twitter-wjs')?.remove();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should render the Twitter clone feed', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.feed__header h2')?.textContent).toContain('Home');
    expect(compiled.querySelectorAll('.post').length).toBe(2);
  });
});
