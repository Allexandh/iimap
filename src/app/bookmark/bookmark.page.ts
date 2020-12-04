import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProvinsiService } from '../provinsi.service';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit {

  userid: any;
  datas: any = [];
  constructor(
    private authSrv: AuthService,
    private provinsiSrv: ProvinsiService,
    private fireAuth: AngularFireAuth,
  ) { }

  ngOnInit() {


    this.fireAuth.user.subscribe((data => {
      this.userid = data.uid;

      this.provinsiSrv.getAllBookmark().snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe(data => {
        data.forEach(element => {
          // console.log("bookmark")

          if (element['userid'] == this.userid) {
            // this.datas.push(element);
            this.provinsiSrv.getProvinsi(element['provinsiid']).then(
              (res) => {
                this.datas.push(res);
                // console.log(this.datas)
              }
            );
          }
        });
      });

    }));


  }

}
