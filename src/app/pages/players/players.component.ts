import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IPlayer } from 'src/app/api/models';
import { ConfigService } from 'src/app/services/config.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
    templateUrl: './players.component.html',
    providers: [MessageService]
})
export class PlayersComponent implements OnInit {

    playerDialog: boolean = false;
    deletePlayerDialog: boolean = false;
    players: IPlayer[] = [];
    player: IPlayer = {};
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    isHovered: string = '';

    constructor(
        private playerService: PlayerService,
        private messageService: MessageService,
        public config: ConfigService
    ) { }

    ngOnInit() {
        this.playerService.getPlayers().then(data => this.players = data);

        this.cols = [
            { field: 'nombre', header: 'Nombre' },
            { field: 'correo', header: 'Correo' },
            { field: 'telefono', header: 'Teléfono' },
            { field: 'isActive', header: 'Status' }
        ];
    }

    openNew() {
        this.player = {};
        this.submitted = false;
        this.playerDialog = true;
    }

    editPlayer(player: IPlayer) {
        this.player = { ...player };
        this.playerDialog = true;
    }

    deletePlayer(player: IPlayer) {
        this.deletePlayerDialog = true;
        this.player = { ...player };
    }

    confirmDelete() {
        this.deletePlayerDialog = false;
        this.players = this.players.filter(val => val.id !== this.player.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Player Deleted', life: 3000 });
        this.player = {};
    }

    hideDialog() {
        this.playerDialog = false;
        this.submitted = false;
    }

    savePlayer() {
        this.submitted = true;

        if (this.player.nombre?.trim()) {
            if (this.player.id) {
                // @ts-ignore
                this.players[this.findIndexById(this.player.id)] = this.player;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Player Updated', life: 3000 });
            } else {
                this.player.id = this.createId();
                this.player.codigo = this.createId();
                this.player.image = 'player-placeholder.svg';
                // @ts-ignore
                this.players.push(this.player);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Player Created', life: 3000 });
            }

            this.players = [...this.players];
            this.playerDialog = false;
            this.player = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    toggleHover(id: string) {
        this.isHovered = id;
    }
}
