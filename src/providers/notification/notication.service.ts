import { Injectable } from '@angular/core';

import { Notification } from '../../models/notification.model';
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

  queryUnReadNotificationNum(params?: any) {
    let seq = this.api.get('notifications', params).share();
    return seq;
  }

  update(notification: Notification) {
    let seq = this.api.put('notifications', notification).share();
    return seq;
  }

  delete(notification: Notification) {
    console.log(notification);
    return this.api.delete('notifications/'+ notification.notificationId);
  }

}
