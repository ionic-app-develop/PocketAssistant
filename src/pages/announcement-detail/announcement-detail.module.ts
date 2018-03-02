import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AnnouncementDetailPage } from './announcement-detail';

@NgModule({
  declarations: [
    AnnouncementDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    AnnouncementDetailPage
  ]
})
export class AnnouncementDetailPageModule {}
