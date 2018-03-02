import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({name: 'announcement-detail'})
@Component({
  selector: 'page-announcement-detail',
  templateUrl: 'announcement-detail.html',
})
export class AnnouncementDetailPage {
  announcement:any;
  constructor(public navCtrl: NavController,public navParams: NavParams) {
//         this.announcement = {announcementId:'1',title: 'EDP应用升级迁移通知', content: 'EDP应用升级迁移结束(Windows server2003 升级至 2008)EDP应用升级迁移结束(Windows server2003 升级至 2008)西丽、福永卡系统升级',sender: '张三', createTime: '2018-01-25 09:00:00'};
         this.announcement = navParams.get('item');

  }
}
