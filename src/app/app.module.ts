import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BreadcrumbComponent} from './common/breadcrumb/breadcrumb.component';
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MunkavallalokComponent} from './munkavallalok/munkavallalok.component';
import {MunkaorakComponent} from "./munkaorak/munkaorak.component";
import {SzervezetekComponent} from './szervezetek/szervezetek.component';
import {RendszerparameterekComponent} from './rendszerparameterek/rendszerparameterek.component';
import {HeaderComponent} from './header/header/header.component';
import {NavAdatokComponent} from './nav-adatok/nav-adatok.component';
import {NavAdatokBetolteseComponent} from './nav-adatok-betoltese/nav-adatok-betoltese.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {IConfig, NgxMaskModule} from "ngx-mask";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import { MunkaorakNavAdatokComponent } from './munkaorak/munkaorak-nav-adatok/munkaorak-nav-adatok.component';
import { MunkaorakRogzitesePanelComponent } from './munkaorak/munkaorak-rogzitese-panel/munkaorak-rogzitese-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BreadcrumbComponent,
    MunkavallalokComponent,
    MunkaorakComponent,
    SzervezetekComponent,
    RendszerparameterekComponent,
    HeaderComponent,
    NavAdatokComponent,
    NavAdatokBetolteseComponent,
    MunkaorakNavAdatokComponent,
    MunkaorakRogzitesePanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatOptionModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
