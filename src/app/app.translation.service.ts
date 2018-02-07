import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class AppTranslationService {

  constructor(private translate: TranslateService) {
  }

  initTranslate() {
    let curLan = this.translate.getBrowserLang();
    console.log('curLan: ' + curLan);
    let defaultLang = localStorage.getItem('defaultLang');
    if(defaultLang) {
      this.translate.use(defaultLang);
    }else {
      defaultLang = this.translate.getBrowserLang();
      this.translate.use(defaultLang);
    }
  }

  useLan(lan): void{
    this.translate.use(lan);
  }
}
