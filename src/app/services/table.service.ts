import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITable, ITablePlaying } from '../api/models';

@Injectable()
export class TableService {

    constructor(private http: HttpClient) { }

    getTables() {
        return this.http.get<any>('assets/demo/data/tables.json')
            .toPromise()
            .then(res => res.data as ITable[])
            .then(data => data);
    }

    getTablesPlaying() {
        return this.http.get<any>('assets/demo/data/tablesplaying.json')
            .toPromise()
            .then(res => res.data as ITablePlaying[])
            .then(data => data);
    }

}
