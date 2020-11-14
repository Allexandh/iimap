import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvinsiService } from 'src/app/provinsi.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  id: string;
  link: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private provinsiSrv: ProvinsiService,
    private db: AngularFireDatabase,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('provinsi')) {
        return;
      }
      this.id = paramMap.get('provinsi');

      this.provinsiSrv.getLinkLagu(this.id).then(
        (res) => {
          this.link ="https://www.youtube.com/embed/"+res;
        }
      );
    });
  }

  linkin(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
  }

}
