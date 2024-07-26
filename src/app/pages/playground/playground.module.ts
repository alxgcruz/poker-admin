import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { TableDetailComponent } from 'src/app/layout/shared/table-detail/table-detail.component';
import { AddPlayerDialogComponent } from "../../layout/shared/add-player-dialog/add-player-dialog.component";
import { ScanPlayerComponent } from 'src/app/layout/shared/scan-player/scan-player.component';
import { ActivateTableComponent } from "../../layout/shared/activate-table/activate-table.component";

const PrimeNgModules = [
    TableModule,
    ButtonModule,
    MenuModule,
    DialogModule,
    RippleModule,
    InputTextModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    DropdownModule];

@NgModule({
    imports: [
    CommonModule,
    PlaygroundRoutingModule,
    PrimeNgModules,
    TableDetailComponent,
    AddPlayerDialogComponent,
    ScanPlayerComponent,
    ActivateTableComponent
],
    declarations: [PlaygroundComponent]
})
export class PlaygroundModule { }
