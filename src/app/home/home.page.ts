import { Component, OnInit } from '@angular/core';
import { ProvinsiService } from '../provinsi.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  provinsi: any;
  constructor(private provinsiSrv: ProvinsiService,
    ) { }

  ngOnInit() {
    this.provinsiSrv.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.provinsi = data;
      console.log(this.provinsi);
    });
    console.log("asd");
  }



}
