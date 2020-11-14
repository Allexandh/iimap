import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Provinsi } from './provinsi';

@Injectable({
  providedIn: 'root'
})
export class ProvinsiService {
  private dbPath = '/provinsi';
  provinsiRef: AngularFireList<Provinsi> = null;
  prov: any;
  datas: any = [];
  constructor(private db: AngularFireDatabase,
    private activatedRoute: ActivatedRoute,
  ) {
    this.provinsiRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Provinsi> {
    return this.provinsiRef;
  }
  getProvinsi(key: string) {
    // dd: Provinsi;
    return this.db.database.ref('/provinsi/' + key).once('value').then(function (snapshot) {
      // console.log(snapshot.val().makanan.split(','))
      const dd: Provinsi = {
        "key": key,
        "destinasi": snapshot.val().destinasi,
        "ibukota" : snapshot.val().ibukota,
        "lagu" : snapshot.val().lagu,
        "linklagu" : snapshot.val().linklagu,
        "logo" : snapshot.val().logo,
        "makanan" : snapshot.val().makanan,
        "nama" : snapshot.val().nama,
        "pakaian" : snapshot.val().pakaian,
        "tari" : snapshot.val().tari,
        "titiktertinggi" : snapshot.val().titiktertinggi,
      }
      return dd;
    })
  }

  getLinkLagu(key: string){
    return this.db.database.ref('/provinsi/' + key).once('value').then(function (snapshot) {
      // console.log(snapshot.val().linklagu);
      return snapshot.val().linklagu;
    })
  }
}
