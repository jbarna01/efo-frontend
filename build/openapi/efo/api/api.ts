export * from './munkaltatoReszlegController.service';
import { MunkaltatoReszlegControllerService } from './munkaltatoReszlegController.service';
export * from './munkavallaloController.service';
import { MunkavallaloControllerService } from './munkavallaloController.service';
export * from './navAdatokController.service';
import { NavAdatokControllerService } from './navAdatokController.service';
export * from './navIdeigelenesAdatokController.service';
import { NavIdeigelenesAdatokControllerService } from './navIdeigelenesAdatokController.service';
export const APIS = [MunkaltatoReszlegControllerService, MunkavallaloControllerService, NavAdatokControllerService, NavIdeigelenesAdatokControllerService];
