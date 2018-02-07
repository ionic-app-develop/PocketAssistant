import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {AppTranslationModule} from '../app/app.translation.module';
import {AppTranslationService} from '../app/app.translation.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicModule,
    CommonModule,
    AppTranslationModule
  ],
  exports: [
  ],
  entryComponents: [
  ],
  providers: [
    AppTranslationService,
  ]
})
export class ComponentsModule {}
