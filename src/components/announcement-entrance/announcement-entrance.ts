import { Component,ElementRef,Renderer2,ViewChild ,HostListener,OnInit, AfterViewInit} from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {AnnouncementService} from '../../providers/providers';
import {Announcement} from '../../models/index';
import {Utils} from "../../common/utils";

@Component({
  selector: 'announcement-entrance',
  templateUrl: 'announcement-entrance.html'
})
export class AnnouncementEntranceComponent  implements AfterViewInit {
  announcements:any=[];
  element:any;
  @ViewChild('announcementMarquee')  announcementMarquee: ElementRef;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private elementRef:ElementRef,
              private renderer: Renderer2,
              private announcementService: AnnouncementService) {
  }

  ngAfterViewInit() {
     this.generateHtmlFromAnnouncements();
  }

  navigateToAnnounceListPage(){
    this.navCtrl.push('announcement-list');
  }

  private generateHtmlFromAnnouncements() {
  this.announcements = [];
   console.log('getAnnouncements AnnouncementListPage');
    this.announcementService.queryTop5Announcement().subscribe((res) => {
      console.log("announcements :"+ res);
      let announcements: any = [];
      announcements = res;
      if(announcements.length>0){
        this.announcements = Utils.order(announcements,'createTime','desc');
      }
      this.generateHtml(announcements);
    }, (err) => {
      console.log('announcement query error');
    });
  }

 private generateHtml(announcements){
    let span = "";
    if (announcements.length > 0){
        span = "<span style='line-height:25px;'>";
        for (let i = 0; i < announcements.length; i++){
            span +=  announcements[i].emergencyLevel === "紧急" ? "<span style='color:red; '>" : "<span>";
            span += Utils.cutstr(announcements[i].content,32) + "<br>";
            span += "</span>";
        }
        span += "</span>";
    }
    console.log("span:"+span);
    this.elementRef.nativeElement.querySelector('#announcementMarquee').innerHTML = span;
  }
}
