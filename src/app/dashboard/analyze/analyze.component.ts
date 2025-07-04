import { CommonModule } from '@angular/common';
import { Component, signal, effect, WritableSignal } from '@angular/core';
import { ListVideosComponent } from '../../components/list-videos/list-videos.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import * as analyzeServices from '../../../services/analyzeServices';

interface VideoData {
  id: string;
  thumbnail: string;
  title: string;
  date: string;
  uploadProgress: number | null;
  uploadStatus: string;
  detailAnalysisUrl: string;
}

@Component({
  selector: 'app-analyze',
  imports: [CommonModule, ListVideosComponent, PaginationComponent],
  templateUrl: './analyze.component.html',
  styles: ``,
})
export class AnalyzeComponent {
  public videos: WritableSignal<VideoData[]> = signal<VideoData[]>([]);
  public videosRef: { current: VideoData[] } = { current: this.videos() };
  public currentPage: WritableSignal<number> = signal<number>(1);

  public itemsPerPage = 3;

  totalItems = this.videos().length;
  currentData = this.videos().slice(
    (this.currentPage() - 1) * this.itemsPerPage,
    this.currentPage() * this.itemsPerPage
  );

  private async getVideosData(): Promise<void> {
    try {
      const rawData = await analyzeServices.getAllVideos();
      console.log(rawData);
      const formattedData: VideoData[] = rawData.map((item: any) => ({
        id: item.id,
        thumbnail: '/thumb/thumbnail.jpg', // default
        title: item.title,
        date: new Date(item.date).toISOString().split('T')[0] ?? '',
        uploadProgress: null, // initial value
        uploadStatus: item.status, // default
        detailAnalysisUrl: `/detail-analyze/${item.id}`,
      }));
      this.videos.set(formattedData);
      console.log(this.videos().length > this.itemsPerPage);
    } catch (error) {
      console.error('❌ Failed to fetch user data:', error);
    }
  }

  async ngOnInit() {
    await this.getVideosData();
  }

  constructor() {
    // 4. useEffect(() => { videosRef.current = videos; }, [videos]);
    //    Diterjemahkan menggunakan `effect` dari Angular.
    //    `effect` akan berjalan setiap kali nilai dari signal `this.videos()` berubah.
    effect(() => {
      this.videosRef.current = this.videos(); // Setara dengan videosRef.current = videos
    });
  }
}
