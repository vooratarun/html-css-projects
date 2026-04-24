import { Component, OnInit, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { SidebarCategoryComponent } from '../sidebar-category/sidebar-category';
import { VideoCard, VideoUploadPayload } from '../video.model';
import { VideosService } from '../videos.service';
import { VideoFormComponent } from '../video-form/video-form';

type SidebarCategory = {
  id: number;
  icon: string;
  label: string;
};

@Component({
  selector: 'app-home-page',
  imports: [SidebarCategoryComponent, VideoFormComponent, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly videosService = inject(VideosService);

  protected isSidebarVisible = false;
  protected searchQuery = '';
  protected isLoadingVideos = true;
  protected videosError = '';
  protected isUploadingVideo = false;
  protected isDeletingVideo = false;
  protected isLoadingMore = false;
  protected uploadVideoError = '';
  protected uploadVideoSuccess = '';
  protected videoFormResetKey = 0;
  protected isEditMode = false;
  protected selectedVideoForEdit: VideoCard | null = null;
  protected readonly primarySidebarCategories: SidebarCategory[] = [
    { id: 1, icon: 'home', label: 'Home' },
    { id: 2, icon: 'local_fire_department', label: 'Trending' },
    { id: 3, icon: 'subscriptions', label: 'Subcriptions' }
  ];
  protected readonly librarySidebarCategories: SidebarCategory[] = [
    { id: 1, icon: 'library_add_check', label: 'Library' },
    { id: 2, icon: 'history', label: 'History' },
    { id: 3, icon: 'play_arrow', label: 'Your Videos' },
    { id: 4, icon: 'watch_later', label: 'Watch Later' },
    { id: 5, icon: 'thumb_up', label: 'Liked Videos' }
  ];
  protected videos: VideoCard[] = [];

  ngOnInit(): void {
    this.videosService.getAllAPI();
  }

  constructor() {
    effect(() => {
      const response = this.videosService.getAllVideos();

      if (response.status === 'OK') {
        this.isLoadingVideos = false;
        this.isLoadingMore = false;
        this.videosError = '';
        this.videos = response.value ?? [];
      } else if (response.status === 'ERROR') {
        this.isLoadingVideos = false;
        this.isLoadingMore = false;
        this.videos = [];
        this.videosError = 'Unable to load videos right now.';
      }
    });

    effect(() => {
      const response = this.videosService.addVid();
      if (response.status === 'OK') {
        this.isUploadingVideo = false;
        this.uploadVideoSuccess = 'Video uploaded successfully.';
        this.videoFormResetKey += 1;
        this.isLoadingVideos = true;
        this.videosService.getAllAPI();
      } else if (response.status === 'ERROR') {
        this.isUploadingVideo = false;
        this.uploadVideoError = 'Failed to upload video. Please try again.';
      }
    });

    effect(() => {
      const response = this.videosService.editVid();
      if (response.status === 'OK') {
        this.isUploadingVideo = false;
        this.uploadVideoSuccess = 'Video updated successfully.';
        this.videoFormResetKey += 1;
        this.selectedVideoForEdit = null;
        this.isEditMode = false;
        this.isLoadingVideos = true;
        this.videosService.getAllAPI();
      } else if (response.status === 'ERROR') {
        this.isUploadingVideo = false;
        this.uploadVideoError = 'Failed to update video. Please try again.';
      }
    });

    effect(() => {
      const response = this.videosService.deleteVid();
      if (response.status === 'OK') {
        this.isDeletingVideo = false;
        this.uploadVideoSuccess = 'Video deleted successfully.';
        this.uploadVideoError = '';
        this.isLoadingVideos = true;
        this.videosService.getAllAPI();
      } else if (response.status === 'ERROR') {
        this.isDeletingVideo = false;
        this.uploadVideoError = 'Failed to delete video. Please try again.';
      }
    });
  }

  protected onEditVideo(video: VideoCard): void {
    this.selectedVideoForEdit = video;
    this.isEditMode = true;
    this.uploadVideoError = '';
    this.uploadVideoSuccess = '';
  }

  protected onCancelEdit(): void {
    this.selectedVideoForEdit = null;
    this.isEditMode = false;
    this.videoFormResetKey += 1;
    this.uploadVideoError = '';
    this.uploadVideoSuccess = '';
  }

  protected onVideoSubmit(payload: VideoUploadPayload): void {
    this.isUploadingVideo = true;
    this.uploadVideoError = '';
    this.uploadVideoSuccess = '';

    if (this.isEditMode && this.selectedVideoForEdit) {
      this.videosService.updateVideo(this.selectedVideoForEdit.id, payload);
    } else {
      this.videosService.addVideo(payload);
    }
  }

  protected onDeleteVideo(video: VideoCard): void {
    const confirmed = window.confirm(`Are you sure you want to delete "${video.title}"?`);
    if (!confirmed) {
      return;
    }

    this.isDeletingVideo = true;
    this.uploadVideoError = '';
    this.uploadVideoSuccess = '';

    if (this.selectedVideoForEdit?.id === video.id) {
      this.onCancelEdit();
    }

    this.videosService.deleteVideo(video.id);
  }

  protected get filteredVideos(): VideoCard[] {
    return this.videos;
  }

  protected get showNoVideosMessage(): boolean {
    return !this.isLoadingVideos && !this.videosError && !this.filteredVideos.length;
  }

  protected get emptyVideosMessage(): string {
    return this.searchQuery.trim()
      ? `No videos found for "${this.searchQuery}".`
      : 'No videos available.';
  }

  protected onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.isLoadingVideos = true;
    this.isLoadingMore = false;
    this.videosError = '';
    this.videosService.searchVideosAPI(this.searchQuery);
  }

  protected onLoadMoreVideos(): void {
    if (!this.canLoadMoreVideos || this.isLoadingMore) {
      return;
    }

    this.isLoadingMore = true;
    this.videosService.loadMoreVideosAPI();
  }

  protected get canLoadMoreVideos(): boolean {
    return this.videosService.getCanLoadMoreVideos();
  }

  protected get authRoute(): string {
    return this.authService.isLoggedIn() ? '/logout' : '/login';
  }

  protected get authLabel(): string {
    return this.authService.isLoggedIn() ? 'Logout' : 'Login';
  }

  protected get authUsername(): string {
    return this.authService.currentUser()?.username ?? 'Guest';
  }

  protected toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}

