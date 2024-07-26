import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrudsRoutingModule } from './cruds-routing.module';
import { CrudsComponent } from './cruds.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CasinosComponent } from './casinos/casinos.component';
import { RoomsComponent } from './rooms/rooms.component';
import { TablesComponent } from './tables/tables.component';
import { UsersComponent } from './users/users.component';
import { TabViewModule } from 'primeng/tabview';
import { ModesComponent } from './modes/modes.component';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    imports: [
        CommonModule,
        CrudsRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TabViewModule,
        InputSwitchModule
    ],
    declarations: [
        CrudsComponent,
        CasinosComponent,
        RoomsComponent,
        TablesComponent,
        ModesComponent,
        UsersComponent
    ]
})
export class CrudsModule { }
