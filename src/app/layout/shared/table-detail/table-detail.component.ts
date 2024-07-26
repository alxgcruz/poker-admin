import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IPlayer, ITablePlaying } from 'src/app/api/models';

const PrimeNgModules = [
  TableModule, 
  ButtonModule, 
  MenuModule, 
  ConfirmDialogModule,
  ToastModule ];

@Component({
  selector: 'app-table-detail',
  standalone: true,
  imports: [CommonModule,PrimeNgModules],
  templateUrl: './table-detail.component.html',
  styleUrl: './table-detail.component.scss'
})
export class TableDetailComponent {

  @Input() table!: ITablePlaying;
  player: IPlayer;
  tableItems: MenuItem[] = [
    { label: 'Recargar', icon: 'pi pi-fw pi-refresh' },
  ];
  
  addPlayerDialog: boolean = false;

  playersList: { id: string; nombre: string; entrada: number }[] = [
    { id: '1', nombre: 'jugador 1', entrada: 3000 },
    { id: '2', nombre: 'jugador 2', entrada: 3000 },
  ];

  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  openAddPlayer() {
    this.addPlayerDialog = true;
    this.player = {
        codigo: '',
        nombre: '',
        image: 'profile.jpg'
    };
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Deseas sacar al jugador de la mesa?',
        header: 'Sacar jugador',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        acceptLabel: 'Sí, sacar',
        rejectLabel: 'Cancelar',

        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Acción Realizada', detail: 'Se sacó al jugador de la mesa' });
        }
    });
}
}
