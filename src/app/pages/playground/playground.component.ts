import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IMode, IPlayer, ITablePlaying, IUser } from 'src/app/api/models';
import { ConfigService } from 'src/app/services/config.service';
import { ModeService } from 'src/app/services/mode.service';
import { PlayerService } from 'src/app/services/player.service';
import { TableService } from 'src/app/services/table.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    templateUrl: './playground.component.html'
})
export class PlaygroundComponent implements OnInit {
    players: IPlayer[];
    player: IPlayer;
    tableItems!: MenuItem[];
    waitItems!: MenuItem[];
    tables!: ITablePlaying[];
    table!: ITablePlaying;
    
    playerHovered!: string;
    tableHovered!: string;

    activatePlayerDialog: boolean = false;
    activateTableDialog: boolean = false;
    addPlayerDialog: boolean = false;
    showTable: boolean = false;
    showInfo: boolean = false;

    config = inject(ConfigService);
    private playerService = inject(PlayerService);
    private tableService = inject(TableService);
    
    playersList: { id: string; nombre: string; entrada: number }[] = [
        { id: '1', nombre: 'jugador 1', entrada: 3000 },
        { id: '2', nombre: 'jugador 2', entrada: 3000 },
    ];
    playerLisColumns = [
        { field: 'nombre', header: 'Nombre' },
        { field: 'entrada', header: 'Entrada' },
    ];

    ngOnInit() {
        this.waitItems = [
            {
                label: 'Nuevo', icon: 'pi pi-fw pi-plus', command: () => {
                    this.player = {
                        codigo: '',
                        nombre: '',
                        image: 'profile.jpg'
                    };
                    this.activatePlayerDialog = true;
                }
            },
            { label: 'Recargar', icon: 'pi pi-fw pi-refresh' },
        ];
        this.tableItems = [
            { label: 'Recargar', icon: 'pi pi-fw pi-refresh' },
        ];

        this.playerService.getPlayers().then(data => this.players = data);
        this.tableService.getTablesPlaying().then(data => this.tables = data);
        
    }

    hoverPlayerChange(id: string) {
        this.playerHovered = id;
    }
    hoverTableChange(id: string) {
        this.tableHovered = id;
    }

    openAddPlayer(table?: ITablePlaying) {
        this.addPlayerDialog = true;
        if(table) {
            this.table = table;
            this.showTable = true;
        } else {
            this.showTable = false;
        }
        this.player = {
            codigo: '',
            nombre: '',
        };
    }

    openActTable(table: ITablePlaying) {
        this.activateTableDialog = true;
        this.table = table;
        this.player = {
            codigo: '',
            nombre: '',
            image: 'profile.jpg'
        };
    }

    seeTable(table: ITablePlaying) {
        this.table = table;
        this.showInfo = true;
    }

}
