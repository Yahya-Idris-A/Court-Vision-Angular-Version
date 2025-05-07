import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  NgZone,
} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  LucideAngularModule,
  Pencil,
  Map,
  Video,
  Calendar,
  CloudUpload,
} from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import DropTarget from '@uppy/drop-target';
import * as uploadServices from '../../../services/uploadServices';

// Custom file type to include 'id'
interface filInfo {
  id: string;
  name: string;
  size: number;
  type: string;
}

@Component({
  selector: 'app-upload',
  imports: [
    LucideAngularModule,
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``,
})
export class UploadComponent {
  // Icon
  readonly icons = {
    pencil: Pencil,
    map: Map,
    video: Video,
    calendar: Calendar,
    cloudUpload: CloudUpload,
  };

  // Inisiasi Datepicker
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;
  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngAfterViewInit() {
    // Pastikan elemen picker sudah siap
    setTimeout(() => {
      if (this.picker) {
        this.cdr.detectChanges(); // Memaksa deteksi perubahan secara manual
      } else {
        console.error('Picker tidak terinisialisasi');
      }
    });
  }

  openDatepicker() {
    if (this.picker) {
      this.picker.open();
    } else {
      console.error('Datepicker belum terinisialisasi');
    }
  }

  // variabel
  matchTitle: string = '';
  matchDate: Date | null = null;
  matchVenue: string = '';
  selectedFile: filInfo | null = null;
  isUploading = false;
  uploadProgress = 0;
  uploadSuccess = false;
  isDragging = false;

  // Buat file input
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
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

  simulateUpload(): void {
    this.isUploading = true;
    this.uploadProgress = 0;
    this.uploadSuccess = false;

    const interval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.isUploading = false;
        this.uploadSuccess = true;
      }
      this.cdr.detectChanges();
    }, 200);
  }

  startAnalysis(): void {
    if (this.uploadSuccess && this.selectedFile) {
      console.log('Starting analysis for:', this.selectedFile.name);
      console.log('Match Title:', this.matchTitle);
      console.log('Match Date:', this.matchDate?.toLocaleDateString());
      console.log('Match Venue:', this.matchVenue);
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

  private uppy!: Uppy;

  ngOnInit(): void {
    uploadServices.setHeaders();

    this.uppy = new Uppy({
      id: 'basketballUploader',
      autoProceed: true,
      restrictions: {
        maxFileSize: 1000000000, // 1GB
        allowedFileTypes: ['.mp4', '.mov', '.avi', '.mkv'],
        maxNumberOfFiles: 1,
      },
    });

    this.uppy.use(AwsS3, {
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

      async createMultipartUpload(file) {
        const metadata: Record<string, string> = {};
        Object.keys(file.meta || {}).forEach((key) => {
          if (file.meta[key] != null) {
            metadata[key] = file.meta[key].toString();
          }
        });
        try {
          return await uploadServices.createMultipartUpload(
            file.name ?? '',
            file.type,
            metadata
          );
        } catch (error) {
          console.error('Error creating multipart upload:', error);
          throw new Error('Failed to create multipart upload');
        }
      },

      async signPart(_file, options) {
        const { uploadId, key, partNumber, signal } = options;
        signal?.throwIfAborted();
        if (uploadId == null || key == null || partNumber == null) {
          throw new Error(
            'Cannot sign without a key, an uploadId, and a partNumber'
          );
        }
        try {
          return await uploadServices.signPart(
            uploadId!,
            key,
            partNumber,
            signal
          );
        } catch (error) {
          console.error('Error signing part:', error);
          throw new Error('Failed to sign part');
        }
      },

      async listParts(_file, options) {
        const { uploadId, key, signal } = options;
        signal?.throwIfAborted();
        try {
          return await uploadServices.listParts(uploadId!, key, signal);
        } catch (error) {
          console.error('Error listing parts:', error);
          throw new Error('Failed to list parts');
        }
      },

      async completeMultipartUpload(_file, options) {
        const { uploadId, key, signal, parts } = options;
        signal?.throwIfAborted();
        try {
          return await uploadServices.completeMultipartUpload(
            uploadId!,
            key,
            parts,
            signal
          );
        } catch (error) {
          console.error('Error completing multipart upload:', error);
          throw new Error('Failed to complete multipart upload');
        }
      },

      async abortMultipartUpload(_file, options) {
        const { uploadId, key, signal } = options;
        try {
          return await uploadServices.abortMultipartUpload(
            uploadId!,
            key,
            signal
          );
        } catch (error) {
          console.error('Error aborting multipart upload:', error);
          throw new Error('Failed to abort multipart upload');
        }
      },
    });

    this.uppy.use(DropTarget, {
      target: '#uppy-dashboard',
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
        console.log('Upload successful to:', response.uploadURL);
        this.cdr.detectChanges();
      });
    });

    this.uppy.on('upload-error', (file, error) => {
      this.isUploading = false;
      console.error('Upload failed:', error);
    });
  }

  ngOnDestroy(): void {
    this.uppy.cancelAll();
  }
}
