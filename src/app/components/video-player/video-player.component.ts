import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video-player',
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styles: ``,
})
export class VideoPlayerComponent {
  @Input() thumbnail: string = '';
  @Input() videoSrc: string = '';
  @ViewChild('videoRef') videoRef!: ElementRef<HTMLVideoElement>;

  isPlaying = false;

  handlePlay() {
    this.isPlaying = true;
    setTimeout(() => {
      this.videoRef?.nativeElement.play();
    }, 100);
  }
}
