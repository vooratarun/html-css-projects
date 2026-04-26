import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable, inject, WritableSignal, signal, computed} from '@angular/core';
import {map, Observable } from 'rxjs';
import {ApiVideo, VideoCard, VideoUploadPayload, VideoCardAdd} from './video.model';
import {State} from './state.model';



type VideosApiResponse = ApiVideo[] | { videos?: ApiVideo[]; data?: ApiVideo[] };
type VideosPagedApiResponse = {
  page?: number;
  limit?: number;
  total?: number;
  hasMore?: boolean;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  data: ApiVideo[];
};


type VideoByIdApiResponse = ApiVideo | { data?: ApiVideo | null; video?: ApiVideo | null };

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private readonly http = inject(HttpClient);
  private readonly videosApiUrl = 'http://localhost:3000/get-videos-paginated';
  private readonly searchVideosApiUrl = 'http://localhost:3000/search';
  private readonly videoByIdApiUrl = 'http://localhost:3000/get-video';
  private readonly uploadVideoApiUrl = 'http://localhost:3000/add-video';
  private readonly deleteVideoApiUrl = 'http://localhost:3000/delete-video';
  private readonly pageSize = 5;
  private currentPage = 1;
  private currentQuery = '';
  private isSearchMode = false;

  getVideos(): Observable<VideoCard[]> {
    return this.http.get<VideosApiResponse>(this.videosApiUrl).pipe(
      map((response) => this.normalizeVideos(response))
    );
  }

  private add$: WritableSignal<State<VideoCardAdd, HttpErrorResponse>> =
    signal(State.Builder<VideoCardAdd, HttpErrorResponse>().forInit().build());
  addVid = computed(() => this.add$());

  private edit$: WritableSignal<State<VideoCardAdd, HttpErrorResponse>> =
    signal(State.Builder<VideoCardAdd, HttpErrorResponse>().forInit().build());
  editVid = computed(() => this.edit$());

  private delete$: WritableSignal<State<unknown, HttpErrorResponse>> =
    signal(State.Builder<unknown, HttpErrorResponse>().forInit().build());
  deleteVid = computed(() => this.delete$());

  private getAll$: WritableSignal<State<Array<VideoCard>, HttpErrorResponse>> =
    signal(State.Builder<Array<VideoCard>, HttpErrorResponse>().forInit().build());
  getAllVideos = computed(() => this.getAll$());

  private getById$: WritableSignal<State<VideoCard | null, HttpErrorResponse>> =
    signal(State.Builder<VideoCard | null, HttpErrorResponse>().forInit().build());
  getVideoByIdState = computed(() => this.getById$());

  private hasMore$: WritableSignal<boolean> = signal(true);

  getCanLoadMoreVideos(): boolean {
    return this.hasMore$();
  }

  uploadVideo(payload: VideoUploadPayload): Observable<unknown> {
    return this.http.post(this.uploadVideoApiUrl, payload);
  }


  addVideo(payload : VideoUploadPayload): void {
    this.http.post<VideoCardAdd>(`http://localhost:3000/add-video`, payload)
      .subscribe({
        next: savedVid => this.add$.set(State.Builder<VideoCardAdd, HttpErrorResponse>().forSuccess(savedVid).build()),
        error: err => this.add$.set(State.Builder<VideoCardAdd, HttpErrorResponse>().forError(err).build())
      })
  }

  updateVideo(id: number, payload: VideoUploadPayload): void {
    this.http.put<VideoCardAdd>(`http://localhost:3000/update-video/${id}`, payload)
      .subscribe({
        next: updatedVid => this.edit$.set(State.Builder<VideoCardAdd, HttpErrorResponse>().forSuccess(updatedVid).build()),
        error: err => this.edit$.set(State.Builder<VideoCardAdd, HttpErrorResponse>().forError(err).build())
      })
  }

  deleteVideo(id: number): void {
    this.http.delete(`${this.deleteVideoApiUrl}/${id}`)
      .subscribe({
        next: (response) => this.delete$.set(State.Builder<unknown, HttpErrorResponse>().forSuccess(response).build()),
        error: (err) => this.delete$.set(State.Builder<unknown, HttpErrorResponse>().forError(err).build())
      });
  }


  getAllAPI(): void {
    this.currentPage = 1;
    this.currentQuery = '';
    this.isSearchMode = false;
    this.fetchVideosPage(false);
  }

  loadMoreVideos(): void {
    if (!this.hasMore$()) {
      return;
    }

    this.currentPage += 1;
    this.fetchVideosPage(true);
  }

  loadMoreVideosAPI(): void {
    this.loadMoreVideos();
  }

  searchVideosAPI(query: string): void {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      this.getAllAPI();
      return;
    }

    this.currentPage = 1;
    this.currentQuery = normalizedQuery;
    this.isSearchMode = true;
    this.fetchVideosPage(false);
  }

  getVideoByIdAPI(id: number): void {
    this.http.get<VideoByIdApiResponse>(`${this.videoByIdApiUrl}/${id}`)
      .subscribe({
        next: (response) => {
          const video = this.normalizeSingleVideo(response, id);
          this.getById$.set(
            State.Builder<VideoCard | null, HttpErrorResponse>()
              .forSuccess(video)
              .build()
          );
        },
        error: (err) => {
          this.getById$.set(
            State.Builder<VideoCard | null, HttpErrorResponse>()
              .forError(err)
              .build()
          );
        }
      });
  }

  private fetchVideosPage(append: boolean): void {
    const url = this.isSearchMode ? this.searchVideosApiUrl : this.videosApiUrl;
    const queryParam = this.isSearchMode ? `q=${encodeURIComponent(this.currentQuery)}&` : '';
    const requestUrl = `${url}?${queryParam}page=${this.currentPage}&limit=${this.pageSize}`;

    this.http.get<VideosPagedApiResponse>(requestUrl)
      .subscribe({
        next: (response) => {
          const videoCards = this.normalizeVideos(response);
          const existingVideos = append ? this.getAll$().value ?? [] : [];
          const mergedVideos = append ? this.mergeVideos(existingVideos, videoCards) : videoCards;
          const hasMore = this.resolveHasMore(response, videoCards.length);

          this.hasMore$.set(hasMore);
          this.getAll$.set(
            State.Builder<VideoCard[], HttpErrorResponse>()
              .forSuccess(mergedVideos)
              .build()
          );
        },
        error: (err) => {
          this.getAll$.set(
            State.Builder<VideoCard[], HttpErrorResponse>()
              .forError(err)
              .build()
          );
          if (append) {
            this.currentPage = Math.max(1, this.currentPage - 1);
          }
        }

      });
  }

  private mergeVideos(existingVideos: VideoCard[], incomingVideos: VideoCard[]): VideoCard[] {
    const videoById = new Map<number, VideoCard>();
    existingVideos.forEach((video) => videoById.set(video.id, video));
    incomingVideos.forEach((video) => videoById.set(video.id, video));
    return [...videoById.values()];
  }

  private resolveHasMore(response: VideosPagedApiResponse, incomingCount: number): boolean {
    const responseLimit =
      typeof response === 'object' && response !== null && typeof response.limit === 'number'
        ? response.limit
        : undefined;

    if (typeof response === 'object' && response !== null && 'hasNextPage' in response && typeof response.hasNextPage === 'boolean') {
      return response.hasNextPage;
    }

    if (typeof response === 'object' && response !== null && 'totalPages' in response && typeof response.totalPages === 'number') {
      return this.currentPage < response.totalPages;
    }

    if (typeof response === 'object' && response !== null && 'hasMore' in response && typeof response.hasMore === 'boolean') {
      return response.hasMore;
    }

    if (typeof response === 'object' && response !== null && 'total' in response && typeof response.total === 'number') {
      const effectiveLimit = responseLimit && responseLimit > 0 ? responseLimit : this.pageSize;
      return this.currentPage * effectiveLimit < response.total;
    }

    const effectiveLimit = responseLimit && responseLimit > 0 ? responseLimit : this.pageSize;
    return incomingCount >= effectiveLimit;
  }

  private normalizeVideos(response: VideosApiResponse): VideoCard[] {
    const apiVideos = Array.isArray(response) ? response : response.videos ?? response.data ?? [];

    return apiVideos.map((video, index) => ({
      id: video.id ?? index + 1,
      thumbnailUrl: video.thumbnailUrl ?? video.thumbnail ?? '',
      authorImageUrl: video.authorImageUrl ?? video.authorImage ?? '/profile.png',
      title: video.title ?? 'Untitled video',
      channelName: video.channelName ?? video.channel ?? 'Unknown channel',
      meta: video.meta ?? this.buildMeta(video)
    }));
  }

  private normalizeSingleVideo(response: VideoByIdApiResponse, fallbackId: number): VideoCard | null {
    const rawVideo = this.extractVideoFromByIdResponse(response);

    if (!rawVideo) {
      return null;
    }

    return {
      id: rawVideo.id ?? fallbackId,
      thumbnailUrl: rawVideo.thumbnailUrl ?? rawVideo.thumbnail ?? '',
      authorImageUrl: rawVideo.authorImageUrl ?? rawVideo.authorImage ?? '/profile.png',
      title: rawVideo.title ?? 'Untitled video',
      channelName: rawVideo.channelName ?? rawVideo.channel ?? 'Unknown channel',
      meta: rawVideo.meta ?? this.buildMeta(rawVideo)
    };
  }

  private extractVideoFromByIdResponse(response: VideoByIdApiResponse): ApiVideo | null {
    if (!response || Array.isArray(response) || typeof response !== 'object') {
      return null;
    }

    if ('data' in response || 'video' in response) {
      return response.data ?? response.video ?? null;
    }

    return response as ApiVideo;
  }

  private buildMeta(video: ApiVideo): string {
    return [video.views, video.publishedAt].filter(Boolean).join(' • ');
  }
}

