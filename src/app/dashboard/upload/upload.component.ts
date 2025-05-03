import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
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
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Pastikan elemen picker sudah siap
    setTimeout(() => {
      if (this.picker) {
        console.log('Datepicker sudah terinisialisasi');
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

  matchTitle: string = '';
  matchDate: Date | null = null;
  matchVenue: string = '';
  selectedFile: File | null = null;
  isUploading = false;
  uploadProgress = 0;
  uploadSuccess = false;
  isDragging = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  handleFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      this.selectedFile = fileInput.files[0];
      this.simulateUpload();
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
      this.selectedFile = file;
      this.simulateUpload();
      event.dataTransfer.clearData();
    }
  }
}
