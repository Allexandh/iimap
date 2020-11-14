import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { map } from 'rxjs/operators';
import { Provinsi } from '../provinsi';
import { ProvinsiService } from '../provinsi.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

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

  ddd: any = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private provinsiSrv: ProvinsiService,
    private db: AngularFireDatabase,
    private router: Router,
    private iab: InAppBrowser,
    private youtube: YoutubeVideoPlayer
  ) { }

  openWeb(destinasi: string, flag:string){
    if(flag == '1'){
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query='+destinasi);

    }else{
    const browser = this.iab.create('http://www.google.com/search?q='+destinasi);
    }
  }

  openYoutube(id: string){
    this.router.navigate(['/provinsi/'+id+'/youtube']);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('provinsi')) {
        return;
      }
      this.id = paramMap.get('provinsi');

      // this.db.object('/provinsi/'+this.id).valueChanges().subscribe(data => {
      //   console.log(data);
      //   this.prov = data;
      //   // this.destinasi = data.destinasi;
      //   console.log(this.prov);
      // });

      this.provinsiSrv.getProvinsi(this.id).then(
        (res) => {
          this.datas = res
          // const zz = [];
          // res.destinasi.forEach(element => {
          //   zz.push(element.split(','))
          // });
          // this.destinasi = zz;
          // this.logo = res.logo;
          // this.nama = res.nama;
          // this.lagu = res.lagu.split(',');
          // this.ibukota = res.ibukota.split(',');
          // this.makanan = res.makanan.split(',');
          // this.pakaian = res.pakaian.split(',');
          // this.tari = res.tari.split(',');
          // this.titiktertinggi = res.titiktertinggi.split(',');



          // console.log(this.makanan[0])
          // console.log(this.datas.makanan[0])
          // this.datas.makanan = res.makanan.split(',');
          // console.log

        }
      );

    });
  }

}
