import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [ ],
    data: {
      breadcrumb: 'Főoldal'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null,
          showDefaultBreadcrumb: false
        },
        component: DashboardComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
