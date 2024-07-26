import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRoom } from '../api/models';

@Injectable()
export class RoomService {

    constructor(private http: HttpClient) { }

    getRooms() {
        return this.http.get<any>('assets/demo/data/rooms.json')
            .toPromise()
            .then(res => res.data as IRoom[])
            .then(data => data);
    }

}
