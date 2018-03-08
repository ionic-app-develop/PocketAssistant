import { Component,Input } from '@angular/core';

@Component({
  selector: 'services-group-builder',
  templateUrl: 'services-group-builder.html'
})
export class ServicesGroupBuilderComponent {
  @Input() currentServicesGroup;

  constructor() {
        console.log("currentServicesGroup:"+this.currentServicesGroup);
  }
  onClickService(){
        console.log("ServicesGroupBuilderComponent onClickService");
  }

}
