import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsMy } from './tabs-my';
import {AppTranslationModule} from '../../app/app.translation.module';
import {AppTranslationService} from '../../app/app.translation.service';

@NgModule({
  declarations: [
    TabsMy
  ],
  imports: [
    IonicPageModule.forChild(TabsMy),
    AppTranslationModule
  ],
  entryComponents: [
    TabsMy
  ],
  providers: [
    AppTranslationService,
  ]
})
export class TabsMyModule {}
