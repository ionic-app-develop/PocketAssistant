import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { IonicPage, NavController,NavParams } from 'ionic-angular';
import {AppTranslationService} from "../../app/app.translation.service";
import {Announcement} from '../../models/index';
import {AnnouncementService} from '../../providers/providers';
import {Utils} from "../../common/utils";

@IonicPage({name: 'announcement-list'})
@Component({
  selector: 'page-announcement-list',
  templateUrl: 'announcement-list.html',
})
export class AnnouncementListPage {

  announcements:any=[];
  langKeys = [];
  langMap: Map<string, any> = new Map<string, any>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private translateService: TranslateService,
              private appTranslationService: AppTranslationService,
              private announcementService: AnnouncementService,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementListPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AnnouncementListPage');
      this.appTranslationService.initTranslate();
      this.initTranslateMessage();
      this.getAnnouncements();
    }

  initTranslateMessage() {
    let curLan = this.translateService.getBrowserLang();
    console.log('AnnouncementListPage curLan: ' + curLan);
  }

  openItem(item: Announcement) {
    this.navCtrl.push('announcement-detail', {
      item: item
    });
  }

  getImgPath(emergencyLevel) {
    let imgName : string = "announcementGeneral";
    if(emergencyLevel === "紧急"){
      imgName = "Urgent";}
    else{
      imgName = "General";
    }
    return `assets/img/announcement${imgName}.png`;
  }

  private getAnnouncements() {
  this.announcements = [];
   console.log('getAnnouncements AnnouncementListPage');
    this.announcementService.query().subscribe((res) => {
      console.log("announcements :"+ res);
      let announcements: any = [];
      announcements = res;
      if(announcements.length>0){
        this.announcements = Utils.order(announcements,'createTime','desc');
      }

    }, (err) => {
      console.log('announcement query error');
    });
  }

}
