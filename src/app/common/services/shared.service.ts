import { Injectable } from '@angular/core';
import {BreadcrumbItem} from "../breadcrumb/breadcrumb-item";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public breadcrumbItems: BreadcrumbItem[] = [];

  constructor() { }

  public getCurrentBreadcrumb(): BreadcrumbItem {
    return this.breadcrumbItems[this.breadcrumbItems.length - 1];
  }
}
