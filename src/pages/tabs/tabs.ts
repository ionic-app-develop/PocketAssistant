import {Component, ViewChild} from '@angular/core';
import {NavController, Tabs} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {AppTranslationService} from "../../app/app.translation.service";
import { Storage } from '@ionic/storage';
import { PublicVar} from "../../common/constant";

// @IonicPage({name: 'tabs'})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public notificationRoot: any = 'notification';
  public workRoot: any = 'work';
  public myRoot: any = 'my';
  @ViewChild('myTabs') tabRef: Tabs;

  private timer;

  constructor(public navCtrl: NavController,
              public translate: TranslateService,
              public appTranslationService: AppTranslationService,
              public storage: Storage) {
  }

  countNotificationItem(){
    return PublicVar.getNotificationNum();
  }

  ionViewDidLoad() {
    console.log('tabs ionViewDidLoad');
  }

  ionViewWillEnter() {
    this.appTranslationService.initTranslate();
    console.log('tabs ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('tabs ionViewDidEnter');
    this.tabRef.select(0);
  }

  ionViewWillLeave() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    console.log('tabs ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('tabs ionViewDidLeave');
  }

  ionViewWillUnload() {
    console.log('tabs ionViewWillUnload');
  }

  ionViewCanEnter(){
    console.log("tabs ionViewCanEnter");
  }

  ionViewCanLeave(){
    console.log("tabs ionViewCanLeave");
  }
}
