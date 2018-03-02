import { Injectable } from '@angular/core';

import { Notification } from '../../models/notification.model';
import { Api } from '../api/api';

@Injectable()
export class NotificationService {

  constructor(public api: Api) { }

  queryOne(params?: any) {
    let seq = this.api.get('notifications', params).share();
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
    return this.api.put('notifications', notification);
  }

  delete(notification: Notification) {
    return this.api.delete('notifications/'+ notification.notificationId);
  }

}
