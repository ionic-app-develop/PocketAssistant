import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementListPage } from './announcement-list';

import {PipesModule} from '../../pipes/pipes.module';
import {AppTranslationModule} from '../../app/app.translation.module';
import {AppTranslationService} from '../../app/app.translation.service';
import {Authentication, AnnouncementService} from '../../providers/providers';

@NgModule({
  declarations: [
    AnnouncementListPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementListPage),
    PipesModule,
    AppTranslationModule,
  ],
  entryComponents: [
    AnnouncementListPage
  ],
  providers: [
    AppTranslationService,
    AnnouncementService,
    Authentication
  ]
})
export class AnnouncementListPageModule {}
