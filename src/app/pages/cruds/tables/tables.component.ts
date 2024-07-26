import { Component, OnInit } from '@angular/core';
import { ITable } from 'src/app/api/models';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TableService } from 'src/app/services/table.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    providers: [MessageService]
})
export class TablesComponent implements OnInit {

    tableDialog: boolean = false;
    deleteTableDialog: boolean = false;
    tables: ITable[] = [];
    table: ITable = {};
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    isHovered: string = '';

    constructor(
        private tableService: TableService,
        private messageService: MessageService,
        public config: ConfigService
    ) { }

    ngOnInit() {
        this.tableService.getTables().then(data => this.tables = data);

        this.cols = [
            { field: 'nombre', header: 'Table' },
            { field: 'isActive', header: 'Status' }
        ];
    }

    openNew() {
        this.table = {};
        this.submitted = false;
        this.tableDialog = true;
    }

    editTable(table: ITable) {
        this.table = { ...table };
        this.tableDialog = true;
    }

    deleteTable(table: ITable) {
        this.deleteTableDialog = true;
        this.table = { ...table };
    }

    confirmDelete() {
        this.deleteTableDialog = false;
        this.tables = this.tables.filter(val => val.id !== this.table.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Table Deleted', life: 3000 });
        this.table = {};
    }

    hideDialog() {
        this.tableDialog = false;
        this.submitted = false;
    }

    saveTable() {
        this.submitted = true;

        if (this.table.nombre?.trim()) {
            if (this.table.id) {
                // @ts-ignore
                this.tables[this.findIndexById(this.table.id)] = this.table;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Table Updated', life: 3000 });
            } else {
                this.table.id = this.createId();
                // @ts-ignore
                this.tables.push(this.table);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Table Created', life: 3000 });
            }

            this.tables = [...this.tables];
            this.tableDialog = false;
            this.table = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.tables.length; i++) {
            if (this.tables[i].id === id) {
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
