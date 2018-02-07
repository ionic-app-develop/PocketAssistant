import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AppTranslationService} from "../../app/app.translation.service";

@IonicPage({name: 'work'})
@Component({
  selector: 'page-tabs-work',
  templateUrl: 'tabs-work.html'
})
export class TabsWork {


  query_startTime: any;
  query_endTime: any;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              private appTranslationService: AppTranslationService) {
  }

  ionViewDidEnter() {
    this.appTranslationService.initTranslate();
    this.storage.get('history_startTime').then(val => {
      this.query_startTime = val;
      this.storage.get('history_endTime').then(val => {
        this.query_endTime = val;
        this.getWorkData();
      });
    });
  }


  getWorkData() {
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    //refresh data
    this.getWorkData();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
