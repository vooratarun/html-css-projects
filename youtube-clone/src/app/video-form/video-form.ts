import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type VideoUploadPayload = {
  thumbnailUrl: string;
  authorImageUrl: string;
  title: string;
  channelName: string;
  meta: string;
};

@Component({
  selector: 'app-video-form',
  imports: [ReactiveFormsModule],
  templateUrl: './video-form.html',
  styleUrl: './video-form.css'
})
export class VideoFormComponent implements OnChanges {
  private readonly formBuilder = inject(FormBuilder);

  @Input() isSubmitting = false;
  @Input() resetKey = 0;
  @Input() isEditMode = false;
  @Input() initialData: VideoUploadPayload | null = null;
  @Output() submitVideo = new EventEmitter<VideoUploadPayload>();

  protected readonly videoForm = this.formBuilder.nonNullable.group({
    thumbnailUrl: ['', Validators.required],
    authorImageUrl: ['', Validators.required],
    title: ['', Validators.required],
    channelName: ['', Validators.required],
    meta: ['', Validators.required]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetKey'] && !changes['resetKey'].firstChange) {
      this.videoForm.reset({
        thumbnailUrl: '',
        authorImageUrl: '',
        title: '',
        channelName: '',
        meta: ''
      });
    }

    if (changes['initialData'] && this.initialData) {
      this.videoForm.reset({
        thumbnailUrl: this.initialData.thumbnailUrl ?? '',
        authorImageUrl: this.initialData.authorImageUrl ?? '',
        title: this.initialData.title ?? '',
        channelName: this.initialData.channelName ?? '',
        meta: this.initialData.meta ?? ''
      });
    }
  }

  protected onSubmit(): void {
    if (this.videoForm.invalid) {
      this.videoForm.markAllAsTouched();
      return;
    }

    this.submitVideo.emit(this.videoForm.getRawValue());
  }

  protected get formTitle(): string {
    return this.isEditMode ? 'Edit Video' : 'Add Video';
  }

  protected get submitButtonText(): string {
    return this.isSubmitting
      ? this.isEditMode ? 'Updating...' : 'Uploading...'
      : this.isEditMode ? 'Update Video' : 'Upload Video';
  }
}

