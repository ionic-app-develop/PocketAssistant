/**
 * Created by Alex on 9/8/2017.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
 *  http读取assets/json目录下的json文件
*/
@Injectable()
export class UserService {
  data: string;
  constructor(public http: Http) {
    console.log('Hello UserService Provider');
  }
  public getUsers(): Observable<string> {
    return this.http.get("assets/json/user_list.json")
      .map(res => res.json().content);
  }
}
