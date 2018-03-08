import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {AppTranslationModule} from '../app/app.translation.module';
import {AppTranslationService} from '../app/app.translation.service';
import { CommonModule } from '@angular/common';
import { AnnouncementEntranceComponent } from './announcement-entrance/announcement-entrance';
import {AnnouncementService,ServicesCollectionService} from '../providers/providers';
import { ServicesGroupBuilderComponent } from './services-group-builder/services-group-builder';
import { ServicesCollectionPanelComponent } from './services-collection-panel/services-collection-panel';

@NgModule({
  declarations: [AnnouncementEntranceComponent,
    ServicesGroupBuilderComponent,
    ServicesCollectionPanelComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    AppTranslationModule
  ],
  exports: [
    AnnouncementEntranceComponent,
    ServicesGroupBuilderComponent,
    ServicesCollectionPanelComponent
  ],
  entryComponents: [
  ],
  providers: [
    AppTranslationService,
    AnnouncementService,
    ServicesCollectionService
  ]
})
export class ComponentsModule {}
