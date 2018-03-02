import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {NotificationDetailPage} from './notification-detail';
import {NotificationService} from "../../providers/providers";
import {AppTranslationService} from "../../app/app.translation.service";

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
  ],
  providers: [
    AppTranslationService,
    NotificationService
  ]
})
export class NotificationDetailPageModule {
}
