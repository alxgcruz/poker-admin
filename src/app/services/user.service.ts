import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovimientosResp, IUser } from '../api/models';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<any>('assets/demo/data/users.json')
            .toPromise()
            .then(res => res.data as IUser[])
            .then(data => data);
    }

    getMovs() {
        return this.http.get<any>('assets/demo/data/moves.json')
            .toPromise()
            .then(res => res.data as IMovimientosResp)
            .then(data => data);
    }

}
