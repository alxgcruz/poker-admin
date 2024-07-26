import { Component, OnInit } from '@angular/core';
import { IMode } from 'src/app/api/models';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ModeService } from 'src/app/services/mode.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
    selector: 'app-modes',
    templateUrl: './modes.component.html',
    providers: [MessageService]
})
export class ModesComponent implements OnInit {

    modeDialog: boolean = false;
    deleteModeDialog: boolean = false;
    modes: IMode[] = [];
    mode: IMode = {};
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    isHovered: string = '';

    constructor(
        private modeService: ModeService,
        private messageService: MessageService,
        public config: ConfigService
    ) { }

    ngOnInit() {
        this.modeService.getModes().then(data => this.modes = data);

        this.cols = [
            { field: 'nombre', header: 'Mode' },
            { field: 'isActive', header: 'Status' }
        ];
    }

    openNew() {
        this.mode = {};
        this.submitted = false;
        this.modeDialog = true;
    }

    editMode(mode: IMode) {
        this.mode = { ...mode };
        this.modeDialog = true;
    }

    deleteMode(mode: IMode) {
        this.deleteModeDialog = true;
        this.mode = { ...mode };
    }

    confirmDelete() {
        this.deleteModeDialog = false;
        this.modes = this.modes.filter(val => val.id !== this.mode.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mode Deleted', life: 3000 });
        this.mode = {};
    }

    hideDialog() {
        this.modeDialog = false;
        this.submitted = false;
    }

    saveMode() {
        this.submitted = true;

        if (this.mode.nombre?.trim()) {
            if (this.mode.id) {
                // @ts-ignore
                this.modes[this.findIndexById(this.mode.id)] = this.mode;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mode Updated', life: 3000 });
            } else {
                this.mode.id = this.createId();
                // @ts-ignore
                this.modes.push(this.mode);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mode Created', life: 3000 });
            }

            this.modes = [...this.modes];
            this.modeDialog = false;
            this.mode = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.modes.length; i++) {
            if (this.modes[i].id === id) {
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
