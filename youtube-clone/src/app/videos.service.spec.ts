import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { VideosService } from './videos.service';
import { VideoUploadPayload } from './video.model';

describe('VideosService', () => {
  let service: VideosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(VideosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should map API videos into video cards', () => {
    service.getAllAPI();

    const request = httpTestingController.expectOne('http://localhost:3000/get-videos-paginated?page=1&limit=5');
    expect(request.request.method).toBe('GET');
    request.flush({
      page: 1,
      limit: 5,
      total: 1,
      totalPages: 1,
      hasNextPage: false,
      data: [
        {
          thumbnailUrl: 'thumb.jpg',
          authorImageUrl: 'author.jpg',
          title: 'Angular Search Demo',
          channelName: 'FutureCoders',
          meta: '10 views • now'
        }
      ]
    });

    expect(service.getAllVideos().status).toBe('OK');
    expect(service.getAllVideos().value).toEqual([
      {
        id: 1,
        thumbnailUrl: 'thumb.jpg',
        authorImageUrl: 'author.jpg',
        title: 'Angular Search Demo',
        channelName: 'FutureCoders',
        meta: '10 views • now'
      }
    ]);
  });

  it('should build meta from views and publishedAt when meta is missing', () => {
    service.getAllAPI();

    const request = httpTestingController.expectOne('http://localhost:3000/get-videos-paginated?page=1&limit=5');
    request.flush({
      videos: [
        {
          thumbnail: 'thumb.jpg',
          authorImage: 'author.jpg',
          title: 'API Video',
          channel: 'Backend Channel',
          views: '100 views',
          publishedAt: '1 day ago'
        }
      ]
    });

    expect(service.getAllVideos().value?.[0]).toEqual({
      id: 1,
      thumbnailUrl: 'thumb.jpg',
      authorImageUrl: 'author.jpg',
      title: 'API Video',
      channelName: 'Backend Channel',
      meta: '100 views • 1 day ago'
    });
  });

  it('should post video payload to upload endpoint', () => {
    const payload: VideoUploadPayload = {
      thumbnailUrl: 'thumb.jpg',
      authorImageUrl: 'author.jpg',
      title: 'New Video',
      channelName: 'FutureCoders',
      meta: '1 view • now'
    };

    service.uploadVideo(payload).subscribe();

    const request = httpTestingController.expectOne('http://localhost:3000/add-video');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(payload);
    request.flush({ ok: true });
  });

  it('should call delete endpoint with video id', () => {
    service.deleteVideo(42);

    const request = httpTestingController.expectOne('http://localhost:3000/delete-video/42');
    expect(request.request.method).toBe('DELETE');
    request.flush({ ok: true });
  });

  it('should append next page videos on load more', () => {
    service.getAllAPI();

    const firstRequest = httpTestingController.expectOne('http://localhost:3000/get-videos-paginated?page=1&limit=5');
    firstRequest.flush({
      page: 1,
      limit: 5,
      total: 10,
      totalPages: 2,
      hasNextPage: true,
      data: [
        {
          id: 1,
          thumbnailUrl: 'thumb-1.jpg',
          authorImageUrl: 'author-1.jpg',
          title: 'Video 1',
          channelName: 'Channel 1',
          meta: '1 view'
        }
      ]
    });

    service.loadMoreVideos();

    const secondRequest = httpTestingController.expectOne('http://localhost:3000/get-videos-paginated?page=2&limit=5');
    secondRequest.flush({
      page: 2,
      limit: 5,
      total: 10,
      totalPages: 2,
      hasNextPage: false,
      data: [
        {
          id: 2,
          thumbnailUrl: 'thumb-2.jpg',
          authorImageUrl: 'author-2.jpg',
          title: 'Video 2',
          channelName: 'Channel 2',
          meta: '2 views'
        }
      ]
    });

    expect(service.getAllVideos().value?.length).toBe(2);
    expect(service.getAllVideos().value?.[1].id).toBe(2);
  });

  it('should fetch video details by id', () => {
    service.getVideoByIdAPI(3);

    const request = httpTestingController.expectOne('http://localhost:3000/get-video/3');
    expect(request.request.method).toBe('GET');
    request.flush({
      data: {
        id: 3,
        thumbnailUrl: 'thumb-3.jpg',
        authorImageUrl: 'author-3.jpg',
        title: 'Video 3',
        channelName: 'Channel 3',
        meta: '3 views'
      }
    });

    expect(service.getVideoByIdState().status).toBe('OK');
    expect(service.getVideoByIdState().value?.id).toBe(3);
  });
});

