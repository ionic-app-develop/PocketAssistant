import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TabsNotification} from './tabs-notification';

import {PipesModule} from '../../pipes/pipes.module';
import {AppTranslationModule} from '../../app/app.translation.module';
import {AppTranslationService} from '../../app/app.translation.service';
import {Authentication, ItemService, NotificationService} from '../../providers/providers';

@NgModule({
  declarations: [
    TabsNotification
  ],
  imports: [
    IonicPageModule.forChild(TabsNotification),
    PipesModule,
    AppTranslationModule,
  ],
  entryComponents: [
    TabsNotification
  ],
  providers: [
    AppTranslationService,
    ItemService,
    NotificationService,
    Authentication
  ]
})
export class TabsNotificationModule {
}
