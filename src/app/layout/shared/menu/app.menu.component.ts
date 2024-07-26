import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: '',
                items: [
                    {
                        label: 'Jugadores',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/pages/players']
                    },
                    {
                        label: 'Playground',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['/pages/playground']
                    },
                ]
            },
            {
                label: 'Administración',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Catálogos', icon: 'pi pi-fw pi-table', routerLink: ['/pages/cruds'] }
                ]
            },
        ];
    }
}
