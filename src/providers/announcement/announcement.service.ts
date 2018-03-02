import { Injectable } from '@angular/core';

import { Announcement } from '../../models/announcement.model';
import { Api } from '../api/api';

@Injectable()
export class AnnouncementService {

  constructor(public api: Api) { }

  queryOne(params?: any) {
    let seq = this.api.get('announcements' + params).share();
    return seq;
  }

  query(params?: any) {
    let seq = this.api.get('announcements', params).share();
    return seq;
  }

  queryTop10NewestAnnouncement(params?: any) {
    let seq = this.api.get('announcements', params).share();
    return seq;
  }

  update(announcement: Announcement) {
    let seq = this.api.put('announcements', announcement).share();
    return seq;
  }

  delete(announcement: Announcement) {
    console.log(announcement);
    return this.api.delete('announcements/'+ announcement.announcementId);
  }

}
