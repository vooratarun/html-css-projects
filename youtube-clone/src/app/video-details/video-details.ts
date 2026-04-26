import { Component, OnInit, inject } from '@angular/core';
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

  private readonly  videoService = inject(VideosService);

  constructor() {}

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
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.video = null;
        this.errorMessage = 'Unable to load video details.';
      }
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

