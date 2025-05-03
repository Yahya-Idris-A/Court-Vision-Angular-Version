import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

  userName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  dateOfBirth: Date | null = null;

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedImageName = file.name;
      this.selectedImage = URL.createObjectURL(file);
    }
  }

  handleSave() {
    console.log('Data disimpan:', {
      userName: this.userName,
      userEmail: this.userEmail,
      userPhone: this.userPhone,
      dateOfBirth: this.dateOfBirth,
      selectedImageName: this.selectedImageName,
    });
  }
}
