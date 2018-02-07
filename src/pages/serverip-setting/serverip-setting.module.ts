import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServeripSettingPage } from './serverip-setting';
import {AppTranslationModule} from '../../app/app.translation.module';
import {AppTranslationService} from '../../app/app.translation.service';

@NgModule({
  declarations: [
    ServeripSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ServeripSettingPage),
    AppTranslationModule
  ],
  providers: [
    AppTranslationService,
  ]
})
export class ServeripSettingPageModule {}
