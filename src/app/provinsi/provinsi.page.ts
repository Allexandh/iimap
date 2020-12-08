import { Component, OnInit, ɵConsole } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { map } from 'rxjs/operators';
import { Provinsi } from '../provinsi';
import { ProvinsiService } from '../provinsi.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-provinsi',
  templateUrl: './provinsi.page.html',
  styleUrls: ['./provinsi.page.scss'],
})
export class ProvinsiPage implements OnInit {
  // prov: any = [];
  // @ViewChild('f',null) f:NgForm;
  // pp: Provinsi;
  // provinsi: any;
  // key: string;
  datas: any = [];
  id: string;
  destinasi: any = [];
  ibukota: any = [];
  lagu: any = [];
  logo: any = [];
  makanan: any = [];
  nama: any = [];
  pakaian: any = [];
  tari: any = [];
  titiktertinggi: any = [];

  booked: any = 0;
  userid: any;
  key: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private provinsiSrv: ProvinsiService,
    private db: AngularFireDatabase,
    private router: Router,
    private iab: InAppBrowser,
    private youtube: YoutubeVideoPlayer,
    private fireAuth: AngularFireAuth,
    
  ) { }

  openWeb(destinasi: string, flag: string) {
    if (flag == '1') {
      const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query=' + destinasi);
    } else {
      const browser = this.iab.create('http://www.google.com/search?q=' + destinasi);
    }
  }

  openMaps(tempat: string, kordinat: object, id: string){
    let navigationExtras: NavigationExtras = {
      state: {
        kordinat: kordinat,
        tempat: tempat
      }
    };
    this.router.navigate(['/provinsi/'+ id +'/'+tempat], navigationExtras);
  }

  openYoutube(id: string) {
    this.router.navigate(['/provinsi/' + id + '/youtube']);
  }

  bookmark(book: any, id: any) {
    // console.log(book)
    if (book == 0) {
      //delete di firebase
      this.provinsiSrv.deleteBookmark(this.key);
    } else {
      // simpen data di firebase
      let dataBook: any = {
        provinsiid: id,
        userid: this.userid,
        flag: "1",
      }
      this.provinsiSrv.bookmark(dataBook);
    }
    this.booked = book;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('provinsi')) {
        return;
      }
      this.id = paramMap.get('provinsi');

      this.fireAuth.user.subscribe((data => {
        this.userid = data.uid;
        // console.log(this.userid);

        this.provinsiSrv.getAllBookmark().snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        ).subscribe(data => {
          data.forEach(element => {
            // console.log("MASUK ELEMENT");
            // console.log(this.userid);
            if (element['userid'] == this.userid
              && element['provinsiid'] == this.id) {
              // console.log(element);
              this.booked = 1;
              this.key = element['key'];
            }
          });
        });
      }));

      this.provinsiSrv.getProvinsi(this.id).then(
        (res) => {
          this.datas = res
          // console.log(this.datas.kordinat.Lat[this.datas.destinasi[0]]);
          console.log(this.datas);
          console.log(this.datas.kordinat.Lat[this.datas.destinasi[0]]);
          // console.log(this.datas.destinasi);
        }
       
      );

    });
  }

}
