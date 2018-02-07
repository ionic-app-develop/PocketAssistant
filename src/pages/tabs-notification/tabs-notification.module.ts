import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsNotification } from './tabs-notification';

import { PipesModule } from '../../pipes/pipes.module';
import {AppTranslationModule} from '../../app/app.translation.module';
import {AppTranslationService} from '../../app/app.translation.service';
import { Authentication } from '../../providers/authentication';

@NgModule({
  declarations: [
    TabsNotification
  ],
  imports: [
    IonicPageModule.forChild(TabsNotification),
    PipesModule,
    AppTranslationModule
  ],
  entryComponents: [
    TabsNotification
  ],
  providers: [
    AppTranslationService,
    Authentication
  ]
})
export class TabsNotificationModule {}
