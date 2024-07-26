import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { IMode, IPlayer, ITablePlaying, IUser } from 'src/app/api/models';
import { ConfigService } from 'src/app/services/config.service';
import { ModeService } from 'src/app/services/mode.service';
import { UserService } from 'src/app/services/user.service';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';

const PrimeNgModules = [
  TableModule,
  InputTextModule,
  InputNumberModule,
  ButtonModule,
  DialogModule,
  DropdownModule
];

@Component({
  selector: 'app-activate-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModules,
    AddPlayerDialogComponent],
  templateUrl: './activate-table.component.html',
  styleUrl: './activate-table.component.scss'
})
export class ActivateTableComponent implements OnInit {

  @Input() table!: ITablePlaying;
  player: IPlayer;
  gameTypes!: IMode[];
  dealers!: IUser[];
  selectedDealer!: IUser;
  selectedType!: IMode;
  addPlayerDialog: boolean = false;
  showTable: boolean = false;

  playersList: { id: string; nombre: string; entrada: number }[] = [
    { id: '1', nombre: 'jugador 1', entrada: 3000 },
    { id: '2', nombre: 'jugador 2', entrada: 3000 },
  ];

  config = inject(ConfigService);
  private modeService = inject(ModeService);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers().then(data => this.dealers = data);
    this.modeService.getModes().then(data => this.gameTypes = data);
  }

  openAddPlayer() {
    this.addPlayerDialog = true;
    this.player = {
      codigo: '',
      nombre: '',
    };
  }

  addPlayer() {
    
  }

}
