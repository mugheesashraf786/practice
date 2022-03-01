import { Message } from 'src/app/_models/message';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs',{static: true}) memberTabs: TabsetComponent
  activeTab: TabDirective;
  messages:Message[]=[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
member :Member;

  constructor(private memberService : MemberService, private route : ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.member=data.member;
        })
    this.route.queryParams.subscribe(params=>{
      params.tab? this.selectTab(params.tab) : this.selectTab(0);
    })
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent:100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:false
      }
      
    ]
    this.galleryImages=this.getImages();
    
     }

    getImages(): NgxGalleryImage[]{
      const imageUrl=[];
      for(const photo of this.member.photos)
      {
        imageUrl.push({
          small:photo?.url,
          medium: photo?.url,
          big:photo?.url
        })
      }
      return imageUrl;
    }



  loadMessages()
  {
    this.messageService.getMessageThread(this.member.username).subscribe(message=>{
      this.messages= message;
    })
  }

  selectTab(tabId: number)
  {
    this.memberTabs.tabs[tabId].active=true;
  }

  onTabActivated (data: TabDirective)
  {
    this.activeTab=data;
    if(this.activeTab.heading==='Messages' && this.messages.length===0)
    {
      this.loadMessages();
    }
  }
}
