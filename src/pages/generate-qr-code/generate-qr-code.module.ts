import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerateQrCodePage } from './generate-qr-code';
import { QRCodeModule } from 'angular2-qrcode';
import {AppTranslationModule} from '../../app/app.translation.module';
import {AppTranslationService} from '../../app/app.translation.service';

@NgModule({
  declarations: [
    GenerateQrCodePage
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(GenerateQrCodePage),
    AppTranslationModule
  ],
  providers: [
    AppTranslationService,
  ]
})
export class GenerateQrCodePageModule {}
