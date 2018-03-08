import {PipesModule} from './../pipes/pipes.module';
import {File} from '@ionic-native/file';
import {IonicImageViewerModule} from 'ionic-img-viewer';
import {ToastService} from './../providers/util/toast.service';
import {CameraProvider} from '../providers/util/camera.service';
import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import {MyApp} from './app.component';
import {Authentication} from '../providers/authentication.service';
import {Api} from '../providers/providers';
import {Items} from '../mocks/providers/items';
import {Camera} from '@ionic-native/camera';
import {GoogleMaps} from '@ionic-native/google-maps';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {QRCodeModule} from 'angular2-qrcode';
import {AppTranslationModule} from './app.translation.module';
import {AppTranslationService} from './app.translation.service';
import {TabsPage} from './../pages/tabs/tabs';
import {SettingPage} from './../pages/setting/setting';
import {IonJPushModule} from 'ionic2-jpush'
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import {SettingProvider} from './../providers/providers';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    PipesModule,
    IonicImageViewerModule,
    QRCodeModule,
    AppTranslationModule,
    IonJPushModule,
    IonicModule.forRoot(MyApp, {
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    SettingPage
  ],
  providers: [
    Authentication,
    Api,
    Items,
    Camera,
    File,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    CameraProvider,
    ToastService,
    AppTranslationService,
    ThemeableBrowser,
    SettingProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
