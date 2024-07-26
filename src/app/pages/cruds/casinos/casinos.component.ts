import { Component, OnInit } from '@angular/core';
import { ICasino } from 'src/app/api/models';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CasinoService } from 'src/app/services/casino.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
    selector: 'app-casinos',
    templateUrl: './casinos.component.html',
    providers: [MessageService]
})
export class CasinosComponent implements OnInit {

    casinoDialog: boolean = false;
    deleteCasinoDialog: boolean = false;
    casinos: ICasino[] = [];
    casino: ICasino = {};
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    isHovered: string = '';

    constructor(
        private casinoService: CasinoService,
        private messageService: MessageService,
        public config: ConfigService
    ) { }

    ngOnInit() {
        this.casinoService.getCasinos().then(data => this.casinos = data);

        this.cols = [
            { field: 'nombre', header: 'Casino' },
            { field: 'isActive', header: 'Status' }
        ];
    }

    openNew() {
        this.casino = {};
        this.submitted = false;
        this.casinoDialog = true;
    }

    editCasino(casino: ICasino) {
        this.casino = { ...casino };
        this.casinoDialog = true;
    }

    deleteCasino(casino: ICasino) {
        this.deleteCasinoDialog = true;
        this.casino = { ...casino };
    }

    confirmDelete() {
        this.deleteCasinoDialog = false;
        this.casinos = this.casinos.filter(val => val.id !== this.casino.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Casino Deleted', life: 3000 });
        this.casino = {};
    }

    hideDialog() {
        this.casinoDialog = false;
        this.submitted = false;
    }

    saveCasino() {
        this.submitted = true;

        if (this.casino.nombre?.trim()) {
            if (this.casino.id) {
                // @ts-ignore
                this.casinos[this.findIndexById(this.casino.id)] = this.casino;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Casino Updated', life: 3000 });
            } else {
                this.casino.id = this.createId();
                // @ts-ignore
                this.casinos.push(this.casino);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Casino Created', life: 3000 });
            }

            this.casinos = [...this.casinos];
            this.casinoDialog = false;
            this.casino = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.casinos.length; i++) {
            if (this.casinos[i].id === id) {
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
