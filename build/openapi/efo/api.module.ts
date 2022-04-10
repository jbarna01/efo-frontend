import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { FoglalkoztatasAdatokControllerService } from './api/foglalkoztatasAdatokController.service';
import { MunkaltatoReszlegControllerService } from './api/munkaltatoReszlegController.service';
import { MunkavallaloControllerService } from './api/munkavallaloController.service';
import { MunkavallaloiRogzitettAdatokControllerService } from './api/munkavallaloiRogzitettAdatokController.service';
import { NavAdatokControllerService } from './api/navAdatokController.service';
import { NavIdeigelenesAdatokControllerService } from './api/navIdeigelenesAdatokController.service';
import { ReportControllerService } from './api/reportController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
