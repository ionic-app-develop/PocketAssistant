import { Component } from '@angular/core';
import {ServicesCollectionService} from '../../providers/providers';

@Component({
  selector: 'services-collection-panel',
  templateUrl: 'services-collection-panel.html'
})
export class ServicesCollectionPanelComponent {
  servicesCollections:any = [];
  constructor(private servicesCollectionService: ServicesCollectionService) {
      this.getServicesCollectionConfig();
  }

  private getServicesCollectionConfig() {
    this.servicesCollections = [];
     console.log('getServicesCollectionConfig');
      this.servicesCollectionService.query().subscribe((res) => {
        console.log("servicesCollections :"+ res);
        this.servicesCollections = res;
      }, (err) => {
        console.log('servicesCollectionService.query() error');
      });
  }
}
