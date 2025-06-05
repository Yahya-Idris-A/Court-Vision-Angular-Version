import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
  NgZone,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  LucideAngularModule,
  ImagePlus,
  User,
  Mail,
  Phone,
  Calendar,
  Save,
} from 'lucide-angular';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import DropTarget from '@uppy/drop-target';
import * as authServices from '../../../services/authServices';
import * as uploadServices from '../../../services/uploadServices';

// Custom file type to include 'id'
interface filInfo {
  id: string;
  name: string;
  size: number;
  type: string;
}

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    CommonModule,
    LucideAngularModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent {
  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  readonly icons = {
    imagePlus: ImagePlus,
    user: User,
    mail: Mail,
    phone: Phone,
    calendar: Calendar,
    save: Save,
  };

  selectedImage: string = '/user/Avatar.png';
  selectedImageName: string = '';

  selectedFile: filInfo | null = null;
  isUploading = false;
  uploadProgress = 0;
  uploadSuccess = false;
  isDragging = false;

  userData = signal<any>(null);
  userName = signal<string>('');
  userEmail = signal<string>('');
  photo_url = signal<string>('');

  private uppy!: Uppy;

  async ngOnInit() {
    await this.getUserData();
    uploadServices.setHeaders();
    this.uppy = new Uppy({
      id: 'basketballUploader',
      autoProceed: true,
      restrictions: {
        maxFileSize: 10000000, // 10MB
        allowedFileTypes: ['.jpg', '.jpeg', '.png', '.svg'],
        maxNumberOfFiles: 1,
      },
    });

    this.uppy.use(AwsS3, {
      shouldUseMultipart: false,
      async getUploadParameters(file, options) {
        const result = await uploadServices.getSignedUrl(
          file.name ?? '',
          file.type,
          options.signal
        );
        const { method, url } = result.data;
        return {
          method,
          url,
          fields: {},
          headers: {
            'Content-Type': file.type,
          },
        };
      },
    });

    this.uppy.on('file-added', (fileInput) => {
      if (
        fileInput &&
        fileInput.id &&
        fileInput.name &&
        fileInput.size &&
        fileInput.type
      ) {
        this.selectedFile = {
          id: fileInput.id,
          name: fileInput.name,
          size: fileInput.size,
          type: fileInput.type,
        };
        this.uploadProgress = 0;
      }
    });

    this.uppy.on('upload-progress', (file, progress) => {
      this.ngZone.run(() => {
        if (this.selectedFile && file && this.selectedFile.id === file.id) {
          this.isUploading = true;
          if (progress.bytesTotal !== null) {
            this.uploadProgress = Math.floor(
              (progress.bytesUploaded / progress.bytesTotal) * 100
            );
            console.log('Progress:', this.uploadProgress);
            this.cdr.detectChanges();
          }
        }
      });
    });

    this.uppy.on('upload-success', (file, response) => {
      this.ngZone.run(() => {
        this.isUploading = false;
        this.uploadSuccess = true;
        this.uploadProgress = 100;
        this.photo_url.set(response.uploadURL || '');
        console.log('Upload successful to:', response.uploadURL);
        this.cdr.detectChanges();
      });
    });

    this.uppy.on('upload-error', (file, error) => {
      this.isUploading = false;
      console.error('Upload failed:', error);
    });
  }

  private async getUserData(): Promise<void> {
    try {
      const data = await authServices.getUser();
      this.userData.set(data);
      this.userName.set(data?.name || '');
      this.userEmail.set(data?.email || '');
      this.selectedImage = data?.photo_url || '/user/user.svg';
    } catch (error) {
      console.error('❌ Failed to fetch user data:', error);
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedImageName = file.name;
      this.selectedImage = URL.createObjectURL(file);
    }
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(file);
      if (file) {
        this.selectedFile = {
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          type: file.type,
        };
        this.uppy.addFile({
          source: 'file input',
          name: file.name,
          type: file.type,
          data: file,
        });
      }
    }
  }

  async handleSave() {
    // Implementasi logika penyimpanan data
    try {
      console.log(this.userName(), this.userEmail(), this.photo_url());
      authServices.updateUserData(
        this.userName(),
        this.userEmail(),
        this.photo_url()
      );
      await this.getUserData();
    } catch (error) {
      console.log('Update Failed');
      console.error(error);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.selectedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
      };
      this.uppy.addFile({
        source: 'file input',
        name: file.name,
        type: file.type,
        data: file,
      });
      event.dataTransfer.clearData();
    }
  }

  ngOnDestroy(): void {
    this.uppy.cancelAll();
  }
}
