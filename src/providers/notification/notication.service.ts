import { Injectable } from '@angular/core';

import { Notification } from '../../models/notification';
import { Api } from '../api/api';

@Injectable()
export class NotificationService {

  constructor(public api: Api) { }

  queryOne(params?: any) {
    let seq = this.api.get('notifications' + params).share();
    return seq;
  }

  query(params?: any) {
    let seq = this.api.get('notifications', params).share();
    return seq;
  }

  add(notification: Notification) {
  }

  delete(notification: Notification) {
    console.log(notification);
    return this.api.delete('notifications/'+ notification.notificationId);
  }

}
