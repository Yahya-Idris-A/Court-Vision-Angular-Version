import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-team-stats',
  imports: [CommonModule],
  templateUrl: './team-stats.component.html',
  styles: ``,
})
export class TeamStatsComponent {
  @Input() homeLogo: string = '';
  @Input() awayLogo: string = '';
  @Input() totalShots = { home: 0, away: 0 };
  @Input() threePointers = { home: 0, away: 0 };
  @Input() twoPointers = { home: 0, away: 0 };

  getPercentage(home: number, away: number): number {
    const total = home + away;
    return total === 0 ? 50 : (home / total) * 100;
  }
  isLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
