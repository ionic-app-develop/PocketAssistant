import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/map';
import { PublicVar } from '../constant';
import { Authentication } from '../authentication';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  language:any;
  headers:Headers;
  baseURL:string;
  constructor(public http: Http,
    public authentication: Authentication) {
      this.baseURL = PublicVar.GetBaseURL();
  }
  init() {
    this.language='en-US,en;q=0.5';   // q是权重系数，范围 0 =< q <= 1，q 值越大，请求越倾向于获得其“;”之前的类型表示的内容，若没有指定 q 值，则默认为1，若被赋值为0，则用于提醒服务器哪些是浏览器不接受的内容类型。
    if (localStorage.langKey) {
      const lang = localStorage.langKey;
      if (lang === 'zh') {
        this.language='zh-cn,zh;q=0.5';
      }
    }
    this.headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8','Accept-Language': this.language, 'Authorization': 'Bearer ' + this.authentication.getToken() });
  }

  get(endpoint: string, paramMap?: any) {
    return this.http.get(this.baseURL + '/' + endpoint, new RequestOptions({
      search: this.buildURLSearchParams(paramMap),
      headers: this.headers
    }));
  }
  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.baseURL + '/' + endpoint, body, this.getOptions(options));
  }
  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.baseURL + '/' + endpoint, body, this.getOptions(options));
  }
  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.baseURL + '/' + endpoint, this.getOptions(options));
  }
  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.baseURL + '/' + endpoint, body, this.getOptions(options));
  }
  private getOptions(options): RequestOptionsArgs {
    if (!options) {
      options = new RequestOptions({
        headers: this.headers
      });
      return options;
    }
  }
  private  buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      params.set(key, val);
    }
    return params;
  }
}
