import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICasino, ICasinoInResp } from '../api/models';

@Injectable()
export class CasinoService {

    constructor(private http: HttpClient) { }

    getCasinos() {
        return this.http.get<any>('assets/demo/data/casinos.json')
            .toPromise()
            .then(res => res.data as ICasino[])
            .then(data => data);
    }

    getCasinoIns() {
        return this.http.get<any>('assets/demo/data/casinoins.json')
            .toPromise()
            .then(res => res.data as ICasinoInResp)
            .then(data => data);
    }

}
