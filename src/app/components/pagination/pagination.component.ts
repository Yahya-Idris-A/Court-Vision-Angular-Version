import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalItems!: number;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange = new EventEmitter<number>(); // Konvensi Angular (sebelumnya onPageChange)

  public pageNumbers: (number | string)[] = [];
  public totalPages: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    // Hitung ulang pagination jika input yang relevan berubah
    if (
      changes['currentPage'] ||
      changes['totalItems'] ||
      changes['itemsPerPage']
    ) {
      this.calculatePagination();
    }
  }

  private calculatePagination(): void {
    if (
      this.totalItems === undefined ||
      this.currentPage === undefined ||
      this.itemsPerPage <= 0
    ) {
      this.totalPages = 0;
      this.pageNumbers = [];
      return;
    }

    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    const newPageNumbers: (number | string)[] = [];

    const createPageRange = (start: number, end: number): number[] => {
      // Pastikan rentang valid dan tidak negatif
      const length = Math.max(0, end - start + 1);
      return Array.from({ length }, (_, i) => start + i);
    };

    if (this.totalPages <= 0) {
      this.pageNumbers = [];
      return;
    }

    if (this.totalPages <= 5) {
      newPageNumbers.push(...createPageRange(1, this.totalPages));
    } else {
      if (this.currentPage < 3) {
        // Tampilkan 1, 2, ..., HalamanTerakhir
        newPageNumbers.push(...createPageRange(1, 2), '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 1) {
        // Tampilkan 1, ..., HalamanTerakhir-1, HalamanTerakhir
        newPageNumbers.push(
          1,
          '...',
          ...createPageRange(this.totalPages - 1, this.totalPages)
        );
      } else {
        // Tampilkan 1, ..., Sebelumnya, SaatIni, Berikutnya, ..., HalamanTerakhir
        newPageNumbers.push(
          1,
          '...',
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          '...',
          this.totalPages
        );
      }
    }
    this.pageNumbers = newPageNumbers;
  }

  onPageClick(pageInput: string | number): void {
    if (typeof pageInput === 'number') {
      // Sekarang 'pageInput' sudah pasti bertipe number di dalam blok ini
      if (
        pageInput >= 1 &&
        pageInput <= this.totalPages &&
        pageInput !== this.currentPage
      ) {
        this.pageChange.emit(pageInput);
      }
    }
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
