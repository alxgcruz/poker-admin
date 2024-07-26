import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/api/models';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/services/user.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    providers: [MessageService]
})
export class UsersComponent implements OnInit {

    userDialog: boolean = false;
    deleteUserDialog: boolean = false;
    users: IUser[] = [];
    user: IUser = {};
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    isHovered: string = '';

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        public config: ConfigService
    ) { }

    ngOnInit() {
        this.userService.getUsers().then(data => this.users = data);

        this.cols = [
            { field: 'nombre', header: 'Nombre' },
            { field: 'correo', header: 'Correo' },
            { field: 'telefono', header: 'Teléfono' },
            { field: 'isActive', header: 'Status' }
        ];
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    editUser(user: IUser) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: IUser) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.users = this.users.filter(val => val.id !== this.user.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
        this.user = {};
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

        if (this.user.nombre?.trim()) {
            if (this.user.id) {
                // @ts-ignore
                this.users[this.findIndexById(this.user.id)] = this.user;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            } else {
                this.user.id = this.createId();
                this.user.codigo = this.createId();
                this.user.image = 'user-placeholder.svg';
                // @ts-ignore
                this.users.push(this.user);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            }

            this.users = [...this.users];
            this.userDialog = false;
            this.user = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
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
