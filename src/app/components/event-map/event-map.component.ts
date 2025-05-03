import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LocateFixed } from 'lucide-angular';
import { ShootMapComponent } from '../shoot-map/shoot-map.component';
import { HeatMapComponent } from '../heat-map/heat-map.component';

@Component({
  selector: 'app-event-map',
  imports: [
    FormsModule,
    LucideAngularModule,
    ShootMapComponent,
    HeatMapComponent,
  ],
  templateUrl: './event-map.component.html',
  styles: ``,
})
export class EventMapComponent {
  //icons
  locateFixed = LocateFixed;

  teamASelectedPlayers: boolean[] = [false, false];
  teamBSelectedPlayers: boolean[] = [false, false];

  togglePlayerSelection(team: 'A' | 'B', playerIndex: number): void {
    if (team === 'A') {
      this.teamASelectedPlayers[playerIndex] =
        !this.teamASelectedPlayers[playerIndex];
    } else {
      this.teamBSelectedPlayers[playerIndex] =
        !this.teamBSelectedPlayers[playerIndex];
    }
  }
}
