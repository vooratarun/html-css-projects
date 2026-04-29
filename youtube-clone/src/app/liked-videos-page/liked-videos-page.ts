import { Component, OnInit, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { VideoCard } from '../video.model';
import { VideosService } from '../videos.service';

@Component({
  selector: 'app-liked-videos-page',
  imports: [RouterLink],
  templateUrl: './liked-videos-page.html',
  styleUrl: './liked-videos-page.css'
})
export class LikedVideosPageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly videosService = inject(VideosService);

  protected isLoading = true;
  protected errorMessage = '';
  protected likedVideos: VideoCard[] = [];
  protected unlikeErrorMessage = '';
  protected pendingUnlikeVideoId: number | null = null;

  protected get authRoute(): string {
    return this.authService.isLoggedIn() ? '/logout' : '/login';
  }

  protected get authLabel(): string {
    return this.authService.isLoggedIn() ? 'Logout' : 'Login';
  }

  protected get authUsername(): string {
    return this.authService.currentUser()?.username ?? 'Guest';
  }

  constructor() {
    effect(() => {
      const state = this.videosService.getLikedVideosState();
      if (state.status === 'OK') {
        this.isLoading = false;
        this.errorMessage = '';
        this.likedVideos = state.value ?? [];
      } else if (state.status === 'ERROR') {
        this.isLoading = false;
        this.likedVideos = [];
        this.errorMessage = 'Unable to load liked videos. Make sure you are logged in.';
      }
    });

    effect(() => {
      const state = this.videosService.unlikeVid();
      if (this.pendingUnlikeVideoId === null) {
        return;
      }

      if (state.status === 'OK') {
        const removedId = this.pendingUnlikeVideoId;
        this.pendingUnlikeVideoId = null;
        this.unlikeErrorMessage = '';
        this.likedVideos = this.likedVideos.filter((video) => video.id !== removedId);
      } else if (state.status === 'ERROR') {
        this.pendingUnlikeVideoId = null;
        this.unlikeErrorMessage = 'Failed to remove liked video. Please try again.';
      }
    });
  }

  ngOnInit(): void {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      this.isLoading = false;
      this.errorMessage = 'You must be logged in to view liked videos.';
      return;
    }
    this.videosService.getLikedVideosAPI(userId);
  }

  protected onUnlikeVideo(videoId: number): void {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      this.unlikeErrorMessage = 'You must be logged in to remove liked videos.';
      return;
    }

    if (this.pendingUnlikeVideoId !== null) {
      return;
    }

    this.unlikeErrorMessage = '';
    this.pendingUnlikeVideoId = videoId;
    this.videosService.unlikeVideo(userId, videoId);
  }
}

