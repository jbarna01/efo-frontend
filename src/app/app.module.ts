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
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MunkaorakNavAdatokComponent} from './munkaorak/munkaorak-nav-adatok/munkaorak-nav-adatok.component';
import {MunkaorakRogzitesePanelComponent} from './munkaorak/munkaorak-rogzitese-panel/munkaorak-rogzitese-panel.component';
import {DataPickerComponent} from "./common/data-picker/data-picker.component";
import {MunkaorakSzervezetPanelComponent} from "./munkaorak/munkaorak-szervezet-panel/munkaorak-szervezet-panel.component";
import {MatSelectModule} from "@angular/material/select";
import {TimePickerComponent} from './common/time-picker/time-picker.component';
import {OrakRogziteseComponent} from './munkaorak/dialogs/orak-rogzitese/orak-rogzitese.component';
import {MatDialogModule} from "@angular/material/dialog";
import {RogzitettAdatokModositasaComponent} from "./munkaorak/dialogs/rogzitett-adatok-modositasa/rogzitett-adatok-modositasa.component";
import {PdfViewerComponent} from "./report/pdf-viewer/pdf-viewer.component";
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { MunkaorakNyomtatasaComponent } from './munkaorak-nyomtatasa/munkaorak-nyomtatasa.component';

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
    MunkaorakSzervezetPanelComponent,
    DataPickerComponent,
    TimePickerComponent,
    OrakRogziteseComponent,
    RogzitettAdatokModositasaComponent,
    PdfViewerComponent,
    ExamplePdfViewerComponent,
    MunkaorakNyomtatasaComponent
  ],
  entryComponents: [
    OrakRogziteseComponent
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
        MatNativeDateModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogModule,
        NgxExtendedPdfViewerModule,
        MatProgressSpinnerModule,
        MatProgressBarModule
    ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
