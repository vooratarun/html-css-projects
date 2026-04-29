import { Component, OnInit, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiVideo, VideoCard } from '../video.model';
import {VideosService} from '../videos.service';

type VideoByIdApiResponse = ApiVideo | { data?: ApiVideo | null; video?: ApiVideo | null };

@Component({
  selector: 'app-video-details',
  imports: [RouterLink],
  templateUrl: './video-details.html',
  styleUrl: './video-details.css'
})
export class VideoDetailsComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly videoByIdApiUrl = 'http://localhost:3000/get-video';

  protected video: VideoCard | null = null;
  protected isLoading = true;
  protected errorMessage = '';
  protected isLiked = false;
  protected isLikeSubmitting = false;
  protected likeError = '';
  protected likeSuccess = '';

  private readonly videoService = inject(VideosService);
  private pendingLikeAction: 'LIKE' | 'UNLIKE' | null = null;

  constructor() {
    effect(() => {
      const state = this.videoService.likeVid();
      if (this.pendingLikeAction !== 'LIKE') {
        return;
      }

      if (state.status === 'OK') {
        this.isLikeSubmitting = false;
        this.pendingLikeAction = null;
        this.likeError = '';
        this.likeSuccess = 'Added to liked videos.';
      } else if (state.status === 'ERROR') {
        this.isLikeSubmitting = false;
        this.pendingLikeAction = null;
        this.isLiked = false;
        this.likeSuccess = '';
        this.likeError = 'Failed to like this video. Please try again.';
      }
    });

    effect(() => {
      const state = this.videoService.unlikeVid();
      if (this.pendingLikeAction !== 'UNLIKE') {
        return;
      }

      if (state.status === 'OK') {
        this.isLikeSubmitting = false;
        this.pendingLikeAction = null;
        this.likeError = '';
        this.likeSuccess = 'Removed from liked videos.';
      } else if (state.status === 'ERROR') {
        this.isLikeSubmitting = false;
        this.pendingLikeAction = null;
        this.isLiked = true;
        this.likeSuccess = '';
        this.likeError = 'Failed to remove like. Please try again.';
      }
    });
  }

  protected get authRoute(): string {
    return this.authService.isLoggedIn() ? '/logout' : '/login';
  }

  protected get authLabel(): string {
    return this.authService.isLoggedIn() ? 'Logout' : 'Login';
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isFinite(id) || id <= 0) {
      this.isLoading = false;
      this.errorMessage = 'Invalid video id.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.http.get<VideoByIdApiResponse>(`${this.videoByIdApiUrl}/${id}`).subscribe({
      next: (response) => {
        const rawVideo = this.extractVideo(response);
        this.video = rawVideo
          ? {
              id: rawVideo.id ?? id,
              thumbnailUrl: rawVideo.thumbnailUrl ?? rawVideo.thumbnail ?? '',
              authorImageUrl: rawVideo.authorImageUrl ?? rawVideo.authorImage ?? '/profile.png',
              title: rawVideo.title ?? 'Untitled video',
              channelName: rawVideo.channelName ?? rawVideo.channel ?? 'Unknown channel',
              meta: rawVideo.meta ?? [rawVideo.views, rawVideo.publishedAt].filter(Boolean).join(' • ')
            }
          : null;

        if (this.video) {
          this.syncLikeStatus(this.video.id);
        }

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.video = null;
        this.errorMessage = 'Unable to load video details.';
      }
    });
  }

  protected onToggleLike(): void {
    const userId = this.authService.currentUser()?.id;
    const videoId = this.video?.id;

    if (!userId || !videoId) {
      this.likeSuccess = '';
      this.likeError = 'You must be logged in to like this video.';
      return;
    }

    if (this.isLikeSubmitting) {
      return;
    }

    this.isLikeSubmitting = true;
    this.likeError = '';
    this.likeSuccess = '';

    if (this.isLiked) {
      this.isLiked = false;
      this.pendingLikeAction = 'UNLIKE';
      this.videoService.unlikeVideo(userId, videoId);
      return;
    }

    this.isLiked = true;
    this.pendingLikeAction = 'LIKE';
    this.videoService.likeVideo(userId, videoId);
  }

  private syncLikeStatus(videoId: number): void {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      this.isLiked = false;
      return;
    }

    this.videoService.getVideoLikeStatus(userId, videoId)
      .subscribe((isLiked) => {
        this.isLiked = isLiked;
      });
  }

  private extractVideo(response: VideoByIdApiResponse): ApiVideo | null {
    if (!response || typeof response !== 'object' || Array.isArray(response)) {
      return null;
    }

    if ('data' in response || 'video' in response) {
      return response.data ?? response.video ?? null;
    }

    return response as ApiVideo;
  }
}

