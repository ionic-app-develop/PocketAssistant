import { Injectable } from '@angular/core';

import { Notification } from '../../models/notification';
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

  add(obj) {
    let seq = this.api.post('jpushAppUserMaps', obj).share();
    return seq;
  }

  delete(id) {
    return this.api.delete('jpushAppUserMaps/'+ id);
  }

}
