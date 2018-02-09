import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { NotificationDetailPage } from './notification-detail';

@NgModule({
  declarations: [
    NotificationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    NotificationDetailPage
  ]
})
export class NotificationDetailPageModule { }
