import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { PlayerService } from './services/player.service';
import { CountryService } from './services/country.service';
import { CasinoService } from './services/casino.service';
import { UserService } from './services/user.service';
import { RoomService } from './services/room.service';
import { TableService } from './services/table.service';
import { ModeService } from './services/mode.service';
import { ConfigService } from './services/config.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, ConfirmDialogModule, ToastModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, PlayerService, CasinoService, UserService, 
        RoomService, TableService, ModeService, ConfigService,
        ConfirmationService, MessageService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
