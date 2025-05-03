import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-shoot-map',
  imports: [CommonModule],
  templateUrl: './shoot-map.component.html',
  styles: ``,
})
export class ShootMapComponent {
  @ViewChild('courtRef', { static: false })
  courtRef!: ElementRef<HTMLDivElement>;
  constructor(private cdRef: ChangeDetectorRef) {}

  readonly COURT_WIDTH = 14;
  readonly COURT_HEIGHT = 15;

  shots = [
    { x: 1, y: 1.5, value: '4' },
    { x: 1 / 65, y: 1 / 75, value: '5' },
    { x: 15, y: 14, value: '3' },
    { x: 4, y: 10, value: '2' },
    { x: 1, y: 1, value: '1' },
  ];

  scaledShots: { x: number; y: number; value: string }[] = [];

  ngAfterViewInit(): void {
    this.initShotmap();
  }
  @HostListener('window:resize')
  onResize() {
    setTimeout(() => this.initShotmap(), 200);
  }

  onImageLoad() {
    this.initShotmap();
  }

  initShotmap() {
    const container = this.courtRef.nativeElement;
    const image = container.querySelector('img');
    if (!image) return;

    const rect = image.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    this.scaledShots = this.shots.map((shot) => ({
      x: (shot.y / this.COURT_WIDTH) * width,
      y: (shot.x / this.COURT_HEIGHT) * height,
      value: shot.value,
    }));
    this.cdRef.detectChanges();
  }
}
