import {ToastService} from './util/toast.service';
import {Api} from './api/api';
import {Authentication} from './authentication.service';
import {Items} from '../mocks/providers/items';
import {ItemService} from './mockService/item_service';
import {NotificationService} from './notification/notication.service';
import {MyJPushService} from './jpush/jpush.service';
import {AnnouncementService} from './announcement/announcement.service';
import {ServicesCollectionService} from './services/servicesCollection.service';
import {SettingProvider} from './theme/setting.service';

export {
  SettingProvider,
  ToastService,
  Api,
  Authentication,
  Items,
  ItemService,
  MyJPushService,
  NotificationService,
  AnnouncementService,
  ServicesCollectionService
};
