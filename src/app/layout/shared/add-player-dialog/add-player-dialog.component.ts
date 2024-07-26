import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

import { IPlayer, ITablePlaying } from 'src/app/api/models';
import { ScanPlayerComponent } from "../scan-player/scan-player.component";

const PrimeNgModules = [
  DialogModule, 
  ButtonModule,
  InputTextModule,
  InputGroupModule,
  InputGroupAddonModule ];

@Component({
  selector: 'app-add-player-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimeNgModules, ScanPlayerComponent],
  templateUrl: './add-player-dialog.component.html',
  styleUrl: './add-player-dialog.component.scss'
})
export class AddPlayerDialogComponent {

  @Input() table!: ITablePlaying;
  @Input() showTable: boolean = false;
  @Input() player: IPlayer;

}
