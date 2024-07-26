import { Component, OnInit } from '@angular/core';
import { IRoom } from 'src/app/api/models';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RoomService } from 'src/app/services/room.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    providers: [MessageService]
})
export class RoomsComponent implements OnInit {

    roomDialog: boolean = false;
    deleteRoomDialog: boolean = false;
    rooms: IRoom[] = [];
    room: IRoom = {};
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    isHovered: string = '';

    constructor(
        private roomService: RoomService,
        private messageService: MessageService,
        public config: ConfigService
    ) { }

    ngOnInit() {
        this.roomService.getRooms().then(data => this.rooms = data);

        this.cols = [
            { field: 'nombre', header: 'Sala' },
            { field: 'isActive', header: 'Status' }
        ];
    }

    openNew() {
        this.room = {};
        this.submitted = false;
        this.roomDialog = true;
    }

    editRoom(room: IRoom) {
        this.room = { ...room };
        this.roomDialog = true;
    }

    deleteRoom(room: IRoom) {
        this.deleteRoomDialog = true;
        this.room = { ...room };
    }

    confirmDelete() {
        this.deleteRoomDialog = false;
        this.rooms = this.rooms.filter(val => val.id !== this.room.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Room Deleted', life: 3000 });
        this.room = {};
    }

    hideDialog() {
        this.roomDialog = false;
        this.submitted = false;
    }

    saveRoom() {
        this.submitted = true;

        if (this.room.nombre?.trim()) {
            if (this.room.id) {
                // @ts-ignore
                this.rooms[this.findIndexById(this.room.id)] = this.room;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Room Updated', life: 3000 });
            } else {
                this.room.id = this.createId();
                // @ts-ignore
                this.rooms.push(this.room);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Room Created', life: 3000 });
            }

            this.rooms = [...this.rooms];
            this.roomDialog = false;
            this.room = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].id === id) {
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
