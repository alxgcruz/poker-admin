import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudsComponent } from './cruds.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ 
			path: '',
			component: CrudsComponent,
		}
	])],
	exports: [RouterModule]
})
export class CrudsRoutingModule { }
