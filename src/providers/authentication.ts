import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { PublicVar } from './constant';

@Injectable()
export class Authentication {
  private serverIP: string;

  constructor(public http: HttpClient,
    public storage: Storage) {
  }

  login(account: string, password: string) {
    let cred = btoa(account + ':' + password);
    return new Promise((resolve, reject) => {
      this.storage.get('serverIP').then((val) => {
        this.serverIP = val;
        PublicVar.setBaseURL(this.serverIP );
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.http.post(`http://${this.serverIP}/` + `login?requestId=${cred}`, null, { headers: headers })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  getToken() {
    return PublicVar.getUserToken();
  }

  getUserName(){
    return PublicVar.getUserName();
  }
}

