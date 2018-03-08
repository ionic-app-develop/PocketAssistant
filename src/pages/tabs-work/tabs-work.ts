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
  constructor(private navCtrl: NavController,
              private appTranslationService: AppTranslationService,
              private storage: Storage) {
    this.appTranslationService.initTranslate();
  }
}
