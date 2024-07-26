import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'players', loadChildren: () => import('./players/players.module').then(m => m.PlayersModule) },
        { path: 'playground', loadChildren: () => import('./playground/playground.module').then(m => m.PlaygroundModule) },
        { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
        { path: 'cruds', loadChildren: () => import('./cruds/cruds.module').then(m => m.CrudsModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
