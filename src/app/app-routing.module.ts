import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RendszerparameterekComponent} from "./rendszerparameterek/rendszerparameterek.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NavAdatokBetolteseComponent} from "./nav-adatok-betoltese/nav-adatok-betoltese.component";
import {MunkavallalokComponent} from "./munkavallalok/munkavallalok.component";
import {SzervezetekComponent} from "./szervezetek/szervezetek.component";
import {MunkaorakComponent} from "./munkaorak/munkaorak.component";
import {MunkaorakNyomtatasaComponent} from "./munkaorak-nyomtatasa/munkaorak-nyomtatasa.component";

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
        path: 'szervezetek',
        data: {
          breadcrumb: null
        },
        component: SzervezetekComponent,
      },
      {
        path: 'munkaorak',
        data: {
          breadcrumb: null
        },
        component: MunkaorakComponent,
      },
      {
        path: 'munkaorak-nyomtatasa',
        data: {
          breadcrumb: null
        },
        component: MunkaorakNyomtatasaComponent,
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
