import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBuyIn, ICasinoInResp, IMovimientosResp } from '../../api/models';
import { PlayerService } from '../../services/player.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/app.layout.service';
import { CasinoService } from '../../services/casino.service';
import { UserService } from '../../services/user.service';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    buyIns!: IBuyIn[];
    casinoInsResp!: ICasinoInResp;
    movimientosResp!: IMovimientosResp;
    colors: string[] = ['orange','cyan','pink','green','purple','teal'];
    tipos = {
        edicion: {icon: 'pi-pencil', color: 'green'},
        dinero: {icon: 'pi-dollar', color: 'orange'},
        cambio: {icon: 'pi-arrow-right-arrow-left', color: 'blue'}
    };
    isHovered: string = '';

    chartData: any;
    chartOptions: any;

    subscription!: Subscription;

    constructor(
        private playerService: PlayerService,
        private casinoService: CasinoService,
        private userService: UserService,
        public layoutService: LayoutService
    ) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.items = [
            { label: 'Recargar', icon: 'pi pi-fw pi-refresh' },
        ];

        this.initChart();
        this.playerService.getBuyInPlayers().then(data => this.buyIns = data);
        this.casinoService.getCasinoIns().then(data => this.casinoInsResp = data);
        this.userService.getMovs().then(data => this.movimientosResp = data);
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
            datasets: [
                {
                    label: 'Casino Querétaro',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Casino Puebla',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                },
                {
                    label: 'Casino Veracruz',
                    data: [18, 38, 30, 29, 66, 47, 60],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--orange-600'),
                    borderColor: documentStyle.getPropertyValue('--orange-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    toggleHover(id: string) {
        this.isHovered = id;
    }
}
