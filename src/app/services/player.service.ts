import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBuyIn, IPlayer } from '../api/models';

@Injectable()
export class PlayerService {

    constructor(private http: HttpClient) { }

    getPlayers() {
        return this.http.get<any>('assets/demo/data/players.json')
            .toPromise()
            .then(res => res.data as IPlayer[])
            .then(data => data);
    }

    getBuyInPlayers() {
        return this.http.get<any>('assets/demo/data/buyin.json')
            .toPromise()
            .then(res => res.data as IBuyIn[])
            .then(data => data);
    }

}
