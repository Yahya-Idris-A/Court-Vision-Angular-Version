import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { TeamStatsComponent } from '../../components/team-stats/team-stats.component';
import { EventMapComponent } from '../../components/event-map/event-map.component';

@Component({
  selector: 'app-detail-analyze',
  imports: [
    CommonModule,
    VideoPlayerComponent,
    TeamStatsComponent,
    EventMapComponent,
  ],
  templateUrl: './detail-analyze.component.html',
  styles: ``,
})
export class DetailAnalyzeComponent {
  videoId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.videoId = params.get('id');
    });
  }
}
