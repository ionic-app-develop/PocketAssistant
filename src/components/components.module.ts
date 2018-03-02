import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {AppTranslationModule} from '../app/app.translation.module';
import {AppTranslationService} from '../app/app.translation.service';
import { CommonModule } from '@angular/common';
import { AnnouncementEntranceComponent } from './announcement-entrance/announcement-entrance';
import {AnnouncementService} from '../providers/providers';

@NgModule({
  declarations: [AnnouncementEntranceComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    AppTranslationModule
  ],
  exports: [
    AnnouncementEntranceComponent
  ],
  entryComponents: [
  ],
  providers: [
    AppTranslationService,
    AnnouncementService
  ]
})
export class ComponentsModule {}
