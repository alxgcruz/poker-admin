import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMode } from '../api/models';

@Injectable()
export class ModeService {

    constructor(private http: HttpClient) { }

    getModes() {
        return this.http.get<any>('assets/demo/data/modes.json')
            .toPromise()
            .then(res => res.data as IMode[])
            .then(data => data);
    }

}
