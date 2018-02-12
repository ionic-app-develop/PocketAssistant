import { Injectable } from '@angular/core';

import { JPushAppUserMaps } from '../../models/jpushAppUserMaps.model';
import { Api } from '../api/api';

@Injectable()
export class MyJPushService {

  constructor(public api: Api) { }

  queryOne(params?: any) {
    let seq = this.api.get('jpushAppUserMaps' + params).share();
    return seq;
  }

  query(params?: any) {
    let seq = this.api.get('jpushAppUserMaps', params).share();
    return seq;
  }

  add(jPushAppUserMaps: JPushAppUserMaps) {
    let seq = this.api.post('jpushAppUserMaps', jPushAppUserMaps).share();
    return seq;
  }

  delete(jPushAppUserMaps: JPushAppUserMaps) {
    return this.api.delete('jpushAppUserMaps/'+ jPushAppUserMaps.jpushAppId);
  }

}
