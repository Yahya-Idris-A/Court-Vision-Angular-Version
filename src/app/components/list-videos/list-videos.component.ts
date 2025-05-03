import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Loader2, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'app-list-videos',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './list-videos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``,
})
export class ListVideosComponent {
  // Icon
  readonly icons = {
    loader2: Loader2,
    checkCircle: CheckCircle,
  };
  @Input() thumbnail!: string;
  @Input() title!: string;
  @Input() date!: string;
  @Input() uploadProgress: number | null = null;
  @Input() detailAnalysisUrl!: string;
  constructor(private cdr: ChangeDetectorRef) {}

  loadingStep = 0;
  loadingText = 'Analyzing';

  ngOnInit() {
    setInterval(() => {
      this.loadingStep = (this.loadingStep + 1) % 4;
      this.loadingText = `Analyzing${'.'.repeat(this.loadingStep)}`;
      this.cdr.detectChanges();
    }, 500);
  }
}
