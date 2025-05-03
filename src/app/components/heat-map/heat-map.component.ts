import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import coordinatesData from './../../../../public/data/trackingData.json';

interface Point {
  x: number;
  y: number;
}

interface HeatmapPoint extends Point {
  value: number;
}

const COURT_WIDTH = 28;
const COURT_HEIGHT = 15;

@Component({
  selector: 'app-heat-map',
  imports: [CommonModule],
  templateUrl: './heat-map.component.html',
  styles: ``,
})
export class HeatMapComponent {
  @ViewChild('courtContainer') courtContainerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('courtImage') courtImageRef!: ElementRef<HTMLImageElement>;

  private playersCoordinates: Record<string, Point[]> = coordinatesData;
  private finalDataCoordinates: { max: number; data: HeatmapPoint[] } = {
    max: 0,
    data: [],
  };

  private scaleX = 0;
  private scaleY = 0;
  private heatmapRadius = 100;
  private heatmapInstance: any;

  ngAfterViewInit(): void {
    const img = this.courtImageRef.nativeElement;
    if (img.complete) {
      this.initHeatmap();
    } else {
      img.onload = () => this.initHeatmap();
    }

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private async loadHeatmapJs(): Promise<any> {
    if ((window as any).h337) return (window as any).h337;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/heatmap.js/2.0.2/heatmap.min.js';
      script.async = true;
      script.onload = () => resolve((window as any).h337);
      script.onerror = () => reject('Failed to load heatmap.js');
      document.head.appendChild(script);
    });
  }

  private handleResize(): void {
    setTimeout(() => this.initHeatmap(), 200);
  }

  private getHeatmapData(playerIds?: string[]) {
    const heatmapMap = new Map<string, number>();
    let maxIntensity = Number.MIN_VALUE;

    const selectedIds = playerIds?.length
      ? playerIds
      : Object.keys(this.playersCoordinates);

    let virtualWidth = 0;
    let virtualHeight = 0;

    selectedIds.forEach((id) => {
      this.playersCoordinates[id]?.forEach((point) => {
        virtualWidth = Math.max(virtualWidth, point.x);
        virtualHeight = Math.max(virtualHeight, point.y);
      });
    });

    const scaleXForPlayer = COURT_WIDTH / virtualWidth;
    const scaleYForPlayer = COURT_HEIGHT / virtualHeight;

    selectedIds.forEach((id) => {
      this.playersCoordinates[id]?.forEach((point) => {
        const key = `${Math.round(point.x * scaleXForPlayer)},${Math.round(
          point.y * scaleYForPlayer
        )}`;
        heatmapMap.set(key, (heatmapMap.get(key) || 0) + 1);
      });
    });

    const heatmapData: HeatmapPoint[] = Array.from(
      heatmapMap,
      ([key, value]) => {
        const [x, y] = key.split(',').map(Number);
        maxIntensity = Math.max(maxIntensity, value);
        return { x, y, value };
      }
    );

    this.finalDataCoordinates = { max: maxIntensity, data: heatmapData };
  }

  private async initHeatmap(): Promise<void> {
    const container = this.courtContainerRef.nativeElement;
    const image = this.courtImageRef.nativeElement;

    const rect = image.getBoundingClientRect();
    this.scaleX = rect.width / COURT_WIDTH;
    this.scaleY = rect.height / COURT_HEIGHT;

    const h337 = await this.loadHeatmapJs();
    if (!this.heatmapInstance) {
      this.heatmapInstance = h337.create({
        container,
        radius: this.heatmapRadius,
        maxOpacity: 0.6,
        minOpacity: 0.2,
        blur: 0.85,
      });
    }

    this.getHeatmapData();

    const scaledDataPoints = {
      max: this.finalDataCoordinates.max,
      data: this.finalDataCoordinates.data.map((point) => ({
        x: Math.round(point.x * this.scaleX),
        y: Math.round(point.y * this.scaleY),
        value: point.value,
      })),
    };

    this.heatmapInstance.setData(scaledDataPoints);
  }
}
