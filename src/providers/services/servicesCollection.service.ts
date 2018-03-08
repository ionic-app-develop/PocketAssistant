import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class ServicesCollectionService {

  constructor(public api: Api) { }

  query(params?: any) {
    let seq = this.api.get('servicesCollection', params).share();
    return seq;
  }
}
