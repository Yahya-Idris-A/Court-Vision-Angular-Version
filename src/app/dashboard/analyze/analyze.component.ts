import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListVideosComponent } from '../../components/list-videos/list-videos.component';

@Component({
  selector: 'app-analyze',
  imports: [CommonModule, ListVideosComponent],
  templateUrl: './analyze.component.html',
  styles: ``,
})
export class AnalyzeComponent {
  videoData = [
    {
      thumbnail: '/thumb/thumbnail.jpg',
      title: 'Basket Match Day 1',
      date: '2024-08-20',
      uploadProgress: null,
      detailAnalysisUrl: '/dashboard/analyze/detail/1',
    },
    {
      thumbnail: '/thumb/thumbnail.jpg',
      title: 'Basket Match Day 2',
      date: '2024-08-20',
      uploadProgress: 80,
      detailAnalysisUrl: '/dashboard/analyze/detail/2',
    },
    {
      thumbnail: '/thumb/thumbnail.jpg',
      title: 'Basket Match Day 3',
      date: '2024-08-21',
      uploadProgress: 100,
      detailAnalysisUrl: '/dashboard/analyze/detail/3',
    },
  ];
}
