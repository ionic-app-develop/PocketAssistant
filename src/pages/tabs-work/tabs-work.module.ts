import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsWork } from './tabs-work';
import {AppTranslationModule} from '../../app/app.translation.module';
import {AppTranslationService} from '../../app/app.translation.service';
import {ComponentsModule} from "../../components/components.module"

@NgModule({
  declarations: [
    TabsWork,
  ],
  imports: [
    IonicPageModule.forChild(TabsWork),
    AppTranslationModule,
    ComponentsModule
  ],
  entryComponents: [
    TabsWork
  ],
  providers: [
    AppTranslationService,
  ]
})
export class TabsWorkModule {}
