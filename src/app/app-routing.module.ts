import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RendszerparameterekComponent} from "./rendszerparameterek/rendszerparameterek.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NavAdatokBetolteseComponent} from "./nav-adatok-betoltese/nav-adatok-betoltese.component";
import {MunkavallalokComponent} from "./munkavallalok/munkavallalok.component";

const appRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Főoldal'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        component: DashboardComponent,
      },
      {
        path: 'nav-adatok-betoltese',
        data: {
          breadcrumb: null
        },
        component: NavAdatokBetolteseComponent,
      },
      {
        path: 'munkavallalok',
        data: {
          breadcrumb: null
        },
        component: MunkavallalokComponent,
      },
      {
        path: 'rendszerparameterek',
        data: {
          breadcrumb: null
        },
        component: RendszerparameterekComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
