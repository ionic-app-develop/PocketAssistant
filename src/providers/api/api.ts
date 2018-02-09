import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { PublicVar } from '../constant';
import { Authentication } from '../authentication';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  language:any;
  headers:HttpHeaders;
  baseURL:string;
  constructor(public http: HttpClient,
    public authentication: Authentication) {
    this.baseURL = PublicVar.GetBaseURL() + '/api';
  }
  init() {
    this.language='en-US,en;q=0.5';   // q是权重系数，范围 0 =< q <= 1，q 值越大，请求越倾向于获得其“;”之前的类型表示的内容，若没有指定 q 值，则默认为1，若被赋值为0，则用于提醒服务器哪些是浏览器不接受的内容类型。
    if (localStorage.langKey) {
      const lang = localStorage.langKey;
      if (lang === 'zh') {
        this.language='zh-cn,zh;q=0.5';
      }
    }
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8','Accept-Language': this.language, 'Authorization': 'Bearer ' + this.authentication.getToken() });
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        header: this.headers
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    console.log("this.baseURL: " + PublicVar.GetBaseURL());
    console.log("this.endpoint: " + endpoint);
    console.log("this.reqOpts: " + reqOpts);

    return this.http.get(PublicVar.GetBaseURL() + '/api/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.baseURL + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.baseURL + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.baseURL + '/' + endpoint);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.baseURL + '/' + endpoint, body, reqOpts);
  }
}
